import ClientsDTO from './ClientsDTO';
import { createSchema, updateSchema } from './schema';
import { IClientsCreation, IClientsRequest } from './TClients';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { RequestError } from '../../utils/RequestError';
import { createUsers } from '../../modules/Users/UsersService';

export const validateMailInUse = async (mail: string): Promise<boolean> => {
  const clients = await ClientsDTO.findOne({
    where: {
      mail: mail,
    },
  });

  if (clients) {
    throw new RequestError('Email already in use', 400);
  }

  return false;
};

export const findOne = async (id: string): Promise<ClientsDTO> => {
  const clients = await ClientsDTO.findByPk(parseInt(id));

  if (!clients) {
    throw new NotFoundError('Clients not found');
  }

  return clients;
};

export const createClients = async (body: IClientsRequest) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  const clients = await ClientsDTO.create({
    name: body.name,
    cpf: body.cpf,
    birthdate: body.birthdate,
    mail: body.mail,
    phone: body.phone,
  });

  const user = await createUsers({
    name: body.name,
    mail: body.mail,
    password: body.password,
    roleId: 2,
  });

  return clients;
};

export const updateClients = async (id: string, body: IClientsCreation) => {
  try {
    const validation = updateSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }

    const clients = await findOne(id);

    clients.name = body.name;
    clients.mail = body.mail;
    clients.phone = body.phone;

    return clients.save();
  } catch (error) {
    throw error;
  }
};

export const removeClients = async (id: string) => {
  try {
    const clients = await findOne(id);

    return clients.destroy();
  } catch (error) {
    throw error;
  }
};
