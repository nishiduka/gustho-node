import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  roleId: Joi.number().required(),
});

export const updateSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  mail: Joi.string().required(),
  password: Joi.string(),
});
