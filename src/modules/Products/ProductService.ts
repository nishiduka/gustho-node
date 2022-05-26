import ProductDTO from './ProductDTO';
import { createSchema } from './schema';
import { IProductsCreation } from './TProduct';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';

export const findOne = async (id: string): Promise<ProductDTO> => {
  const product = await ProductDTO.findByPk(parseInt(id));

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return product;
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

  return product;
};

export const updateProduct = async (id: string, body: IProductsCreation) => {
  try {
    const validation = createSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }

    const product = await findOne(id);

    (product.name = body.name),
      (product.shortDescription = body.shortDescription || ''),
      (product.description = body.description || ''),
      (product.quantity = body.quantity),
      (product.price = body.price),
      (product.metric = body.metric);

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
