import Joi from 'joi';

export const createSchema = Joi.object({
  fretePrice: Joi.number().required(),
  total: Joi.number(),
  clientAddressId: Joi.number().required(),

  products: Joi.array().items({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
});
