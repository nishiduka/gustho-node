import ProductDTO from './ProductDTO';
import { createSchema } from './schema';
import {
  IProductsCreation,
  TPaginateProduct,
  TPaginateProductAll,
  TProductsQuery,
  TTotalQuery,
} from './TProduct';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { saveFileBaseLocally } from 'utils/Upload';
import { slugify } from 'utils/Slughfy';
import { saveMedia } from 'modules/Media/MediaService';
import { sequelize } from 'lib/sequelize';
import { Op, QueryTypes } from 'sequelize';
import MediaDTO from 'modules/Media/MediaDTO';

export const findOne = async (id: string): Promise<ProductDTO> => {
  const [product, [{ avaliable }]] = await Promise.all([
    ProductDTO.findByPk(parseInt(id), {
      include: [
        {
          model: MediaDTO,
          as: 'media',
        },
      ],
    }) as any,
    sequelize.query(
      `
        SELECT 
          IFNULL(product.quantity - SUM(citem.quantity), product.quantity) AS avaliable
        FROM product 
        LEFT JOIN checkout_items as citem ON product.id = citem.productId
        WHERE id = ${id}
      `,
      { type: QueryTypes.SELECT }
    ) as any,
  ]);

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return { ...product.toJSON(), avaliable };
};

export const findPaginate = async ({
  page = '1',
  limit = '10',
  search = '',
}: {
  page: string;
  limit: string;
  search: string;
}): Promise<TPaginateProduct> => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  let where = 'WHERE IFNULL(media.order = 1, true)';
  if (search) {
    const searchAnyValue = search
      .split(' ')
      .map((item) => `%${item}%`)
      .join(' ');

    where += `AND product.name LIKE "${searchAnyValue}"`;
  }

  const conditions = `
    FROM product 
    LEFT JOIN checkout_items as citem ON product.id = citem.productId
    LEFT JOIN media ON media.productId = product.id
    ${where}
  `;

  const [products, [{ total }]] = await Promise.all([
    sequelize.query(
      `
      SELECT 
        product.id, 
        product.name, 
        product.shortDescription,
        product.price,
        IFNULL(product.quantity - SUM(citem.quantity), product.quantity) AS avaliable, 
        media.path as imgUrl

      ${conditions}
      GROUP BY product.id, media.id
      HAVING avaliable > 0
      LIMIT ${limitNum}
      OFFSET ${limitNum * (pageNum - 1)};
    `,
      { type: QueryTypes.SELECT, nest: true }
    ) as Promise<TProductsQuery[]>,
    sequelize.query(
      `
      SELECT COUNT(*) as total from (
        SELECT product.id
        ${conditions}
        group by product.id
      ) as total
    `,
      { type: QueryTypes.SELECT }
    ) as Promise<TTotalQuery[]>,
  ]);

  return {
    data: products,
    total,
    pages: Math.ceil(total / limitNum),
    page: pageNum,
    limit: limitNum,
  };
};

export const getAllPaginate = async ({
  page = '1',
  limit = '10',
  search = '',
}: {
  page: string;
  limit: string;
  search: string;
}): Promise<TPaginateProductAll> => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  let searchAnyValue = '%';
  let where = '';
  if (search) {
    searchAnyValue = search
      .split(' ')
      .map((item) => `%${item}%`)
      .join(' ');

    where = `WHERE name LIKE "${searchAnyValue}"`;
  }

  const [products, [{ total }]] = await Promise.all([
    ProductDTO.findAll({
      where: {
        name: {
          [Op.like]: searchAnyValue,
        },
      },
      limit: limitNum,
      offset: limitNum * (pageNum - 1),
    }),
    sequelize.query(
      `
      SELECT COUNT(*) as total from (
        SELECT product.id
        FROM product
        ${where} 
        group by product.id
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

export const createProduct = async (body: IProductsCreation) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  const product = await ProductDTO.create({
    name: body.name,
    shortDescription: body.shortDescription || '',
    description: body.description || '',
    quantity: body.quantity,
    price: body.price,
    metric: body.metric,
  });

  if (body.images) {
    await saveMedia(
      body.images,
      slugify(product.name),
      `products/${product.id}`,
      product.id
    );
  }

  return product;
};

export const updateProduct = async (id: string, body: IProductsCreation) => {
  try {
    const validation = createSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }

    const product = await findOne(id);

    product.name = body.name;
    product.shortDescription = body.shortDescription || '';
    product.description = body.description || '';
    product.quantity = body.quantity;
    product.price = body.price;
    product.metric = body.metric;

    return product.save();
  } catch (error) {
    throw error;
  }
};

export const removeProduct = async (id: string) => {
  try {
    const product = await findOne(id);

    return product.destroy();
  } catch (error) {
    throw error;
  }
};
