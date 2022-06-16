import ClientsDTO from './ClientsDTO';
import { createSchema, updateSchema } from './schema';
import { IAddress, IClientsCreation, IClientsRequest } from './TClients';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { RequestError } from '../../utils/RequestError';
import {
  createUsers,
  removeUsers,
  updateUsers,
} from '../../modules/Users/UsersService';
import ClientsAddressDTO from './ClientsAddressDTO';

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

export const validateCPFInUse = async (cpf: string): Promise<boolean> => {
  const clients = await ClientsDTO.findOne({
    where: {
      cpf: cpf,
    },
  });

  if (clients) {
    throw new RequestError('CPF already in use', 400);
  }

  return false;
};

export const findOneByUser = async (id: string): Promise<ClientsDTO> => {
  const clients = await ClientsDTO.findOne({
    where: {
      userId: parseInt(id),
    },
  });

  if (!clients) {
    throw new NotFoundError('Clients not found');
  }

  return clients;
};

export const findAddressByClient = async (
  id: string
): Promise<ClientsAddressDTO[]> => {
  const clients = await ClientsAddressDTO.findAll({
    where: {
      clientId: parseInt(id),
    },
  });

  if (!clients) {
    throw new NotFoundError('Clients not found');
  }

  return clients;
};

export const findOne = async (id: string): Promise<ClientsDTO> => {
  const clients = await ClientsDTO.findByPk(parseInt(id));

  if (!clients) {
    throw new NotFoundError('Clients not found');
  }

  return clients;
};

export const saveAddress = async (address: IAddress[], clientId: number) => {
  if (!address.length) {
    return;
  }

  const data = address.map((addr) => {
    const { createdAt, updatedAt, ...item } = addr;

    return {
      ...item,
      clientId,
    };
  });

  return await ClientsAddressDTO.bulkCreate(data);
};

export const updateAddress = async (
  allAddress: IAddress[],
  clientId: number
) => {
  if (!allAddress?.length) {
    return [];
  }

  const addresses = await ClientsAddressDTO.findAll({
    where: {
      clientId,
    },
  });

  const addressToInsert = [] as IAddress[];

  for (let index = 0; index < allAddress.length; index++) {
    const element = allAddress[index];

    const address = addresses.find((item) => item.id === element.id);

    if (address) {
      address.name = element.name;
      address.streetname = element.streetname;
      address.streetname2 = element.streetname2;
      address.number = element.number;
      address.city = element.city;
      address.zipcode = element.zipcode;
      address.state = element.state;

      address.save();
    } else {
      addressToInsert.push(element);
    }
  }

  let otherAddress = [] as any;
  if (addressToInsert.length) {
    otherAddress = await saveAddress(addressToInsert, clientId);
  }

  return [...addresses, ...otherAddress];
};

export const createClients = async (body: IClientsRequest) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  await Promise.all([validateMailInUse(body.mail), validateCPFInUse(body.cpf)]);

  const user = await createUsers({
    name: body.name,
    mail: body.mail,
    password: body.password,
    roleId: 2,
  });

  const clientRaw = await ClientsDTO.create({
    name: body.name,
    cpf: body.cpf,
    birthdate: body.birthdate,
    mail: body.mail,
    phone: body.phone,
    userId: user.id,
  });

  const client = {
    ...clientRaw.toJSON(),
    address: await saveAddress(body.address, clientRaw.id),
  };

  return { client, user: user.toJSON() };
};

export const updateClients = async (id: string, body: IClientsCreation) => {
  try {
    const validation = updateSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }
    if (body.name && body.mail && body.password) {
      await updateUsers(id, {
        name: body.name,
        mail: body.mail,
        password: body.password,
      });
    }
    let clients = await findOneByUser(id);

    if (body.name) {
      clients.name = body.name;
    }
    if (body.mail) {
      clients.mail = body.mail;
    }
    if (body.phone) {
      clients.phone = body.phone;
    }

    const address = await updateAddress(body.address, clients.id);

    clients.save();

    return {
      ...clients.toJSON(),
      address,
    };
  } catch (error) {
    console.log('error:::', error);

    throw error;
  }
};

export const removeClients = async (id: string) => {
  try {
    const client = await findOneByUser(id);
    await Promise.all([removeUsers(id), client.destroy()]);
  } catch (error) {
    throw error;
  }
};
