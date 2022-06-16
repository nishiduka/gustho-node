import CheckoutDTO from './CheckoutDTO';
import { createSchema } from './schema';
import { ICheckoutCreation, ICheckoutItems } from './TCheckout';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { findOneByUser } from '../Clients/ClientsService';
import CheckoutItemsDTO from './CheckoutItemsDTO';

import { findOne as findProduct } from '../Products/ProductService';
import { sequelize } from 'lib/sequelize';
import { QueryTypes } from 'sequelize';
import { RequestError } from 'utils/RequestError';

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
      SELECT product.quantity - SUM(item.quantity) AS avaliable

      FROM checkout_items AS item
      INNER JOIN product ON product.id=item.productId

      WHERE item.productId = ${id}
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

  const checkout = await CheckoutDTO.create(
    {
      status: 'paid',
      fretePrice: body.fretePrice,
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
