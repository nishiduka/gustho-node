import CheckoutDTO from './CheckoutDTO';
import { createSchema } from './schema';
import {
  ICheckoutCreation,
  ICheckoutItems,
  TPaginateCheckoutAll,
  TTotalQuery,
} from './TCheckout';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { findOneByUser } from '../Clients/ClientsService';
import CheckoutItemsDTO from './CheckoutItemsDTO';

import { findOne as findProduct } from '../Products/ProductService';
import { sequelize } from 'lib/sequelize';
import { QueryTypes } from 'sequelize';
import { RequestError } from 'utils/RequestError';
import ProductDTO from 'modules/Products/ProductDTO';
import ClientsDTO from 'modules/Clients/ClientsDTO';

export const findOne = async (id: string): Promise<CheckoutDTO> => {
  const checkout = await CheckoutDTO.findByPk(parseInt(id));

  if (!checkout) {
    throw new NotFoundError('Checkout not found');
  }

  return checkout;
};

export const checkDisponibility = async (id: string): Promise<number> => {
  const [total, meta] = await sequelize.query(
    `
      SELECT IFNULL(product.quantity - SUM(item.quantity), product.quantity) AS avaliable

      FROM product
      LEFT JOIN checkout_items AS item ON product.id=item.productId

      WHERE product.id = ${id}
    `,
    { type: QueryTypes.SELECT }
  );

  if (!total) {
    throw new NotFoundError('Total not found');
  }

  return total?.avaliable;
};

export const appendProducts = async (
  products: ICheckoutItems[],
  checkoutId: number,
  transaction: any
) => {
  const data = [] as ICheckoutItems[];
  let total = 0;

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const product = await findProduct(element.productId.toString());

    const avaliable = await checkDisponibility(product.id);

    if (avaliable < element.quantity) {
      throw new RequestError(`Product id ${product.id} not avaliable`, 400);
    }

    total += product.price * element.quantity;

    data.push({
      checkoutId,
      productId: product.id,
      quantity: element.quantity,
      valueUnit: product.price,
    });
  }

  const items = await CheckoutItemsDTO.bulkCreate(data, { transaction });
  return {
    items,
    total,
  };
};

export const createCheckout = async (id: string, body: ICheckoutCreation) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  const currentUser = await findOneByUser(id);

  const transaction = await sequelize.transaction();

  try {
    const checkout = await CheckoutDTO.create(
      {
        status: 'paid',
        total: 0,
        clientsId: currentUser.id,
        clientAddressId: body.clientAddressId,
      },
      { transaction }
    );

    const all = await appendProducts(body.products, checkout.id, transaction);

    checkout.total = all.total;
    checkout.save();

    await transaction.commit();

    return checkout;
  } catch (error) {
    transaction.rollback();

    throw error;
  }
};

export const updateCheckout = async (id: string, body: ICheckoutCreation) => {
  try {
    const validation = createSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }

    const checkout = await findOne(id);

    return checkout.save();
  } catch (error) {
    throw error;
  }
};

export const removeCheckout = async (id: string) => {
  try {
    const checkout = await findOne(id);

    return checkout.destroy();
  } catch (error) {
    throw error;
  }
};

export const getAllPaginate = async ({
  page = '1',
  limit = '10',
  search = '',
  currentUser,
}: {
  page: string;
  limit: string;
  search: string;
  currentUser: any;
}): Promise<TPaginateCheckoutAll> => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  let where = {};
  let models = [
    {
      model: ProductDTO,
      as: 'products',
    },
  ] as any;
  let whereRaw = '';
  if (currentUser.level === 2) {
    const client = await findOneByUser(currentUser.id);

    where = {
      clientsId: client.id,
    };

    whereRaw = `WHERE clientsId = ${client.id}`;
  } else {
    models.push({
      model: ClientsDTO,
      as: 'client',
    });
  }

  const [products, [{ total }]] = await Promise.all([
    CheckoutDTO.findAll({
      where,
      limit: limitNum,
      offset: limitNum * (pageNum - 1),
      include: models,
    }),
    sequelize.query(
      `
      SELECT COUNT(*) as total from (
        SELECT checkout.id
        FROM checkout
        ${whereRaw}
        group by checkout.id
      ) as total
    `,
      { type: QueryTypes.SELECT }
    ) as Promise<TTotalQuery[]>,
  ]);

  return {
    data: products as any,
    total,
    pages: Math.ceil(total / limitNum),
    page: pageNum,
    limit: limitNum,
  };
};
