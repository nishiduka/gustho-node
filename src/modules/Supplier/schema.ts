import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  cpnj: Joi.string().required(),
  ie: Joi.string().required(),
  razao_social: Joi.string().required(),
  nome_fantasia: Joi.string().required(),
  contacts: Joi.array().items({
    type: Joi.string().required(),
    contact: Joi.string().required(),
    person_name: Joi.string().required(),
  }),
});

export const createContactSchema = Joi.object({
  type: Joi.string().required(),
  contact: Joi.string().required(),
  person_name: Joi.string().required(),
});
