import Joi from 'joi';
import { ValidateCPF } from '../../utils/ValidateCPF';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!ValidateCPF(value)) {
        return helper.error('cpf.invalid');
      }

      return value;
    })
    .messages({
      'cpf.invalid': 'CPF is not valid',
    }),
  birthdate: Joi.date().required(),
  mail: Joi.string().required(),
  phone: Joi.string()
    .required()
    .custom((value, helper) => {
      const regex = new RegExp(/(\([0-9]{2}\)) ([0-9]{8,9})/g);

      if (!regex.test(value)) {
        return helper.error('phone.invalid');
      }

      return value;
    })
    .messages({
      'phone.invalid': 'Phone is not valid',
    }),
});

export const updateSchema = Joi.object({
  name: Joi.string().required(),
  mail: Joi.string().required(),
  phone: Joi.string()
    .required()
    .custom((value, helper) => {
      const regex = new RegExp(/(\([0-9]{2}\)) ([0-9]{8,9})/g);

      if (!regex.test(value)) {
        return helper.error('phone.invalid');
      }

      return value;
    })
    .messages({
      'phone.invalid': 'Phone is not valid',
    }),
});
