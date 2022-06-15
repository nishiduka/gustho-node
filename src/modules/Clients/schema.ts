import Joi from 'joi';
import { ValidateCPF } from '../../utils/ValidateCPF';

export const clientAddressSchema = Joi.object({
  name: Joi.string().required(),
  streetname: Joi.string().required(),
  streetname2: Joi.string().required(),
  number: Joi.string().required(),
  city: Joi.string().required(),
  zipcode: Joi.string().required(),
  state: Joi.string().required(),
});

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
  password: Joi.string().required(),
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
  address: Joi.array().items(clientAddressSchema),
});

export const updateSchema = Joi.object({
  id: Joi.number(),
  userId: Joi.number(),
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
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  address: Joi.array().items(
    clientAddressSchema.keys({
      id: Joi.number(),
      clientId: Joi.number(),
      createdAt: Joi.date(),
      updatedAt: Joi.date(),
    })
  ),
});
