import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  cpnj: Joi.string().required(),
  ie: Joi.string().required(),
  razao_social: Joi.string().required(),
  nome_fantasia: Joi.string().required(),
});
