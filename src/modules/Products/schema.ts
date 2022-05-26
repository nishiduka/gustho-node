import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  shortDescription: Joi.string(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  metric: Joi.string().required(),
});
