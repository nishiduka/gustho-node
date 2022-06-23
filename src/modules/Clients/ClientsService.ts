import ClientsDTO from './ClientsDTO';
import { createSchema, updateSchema } from './schema';
import {
  IAddress,
  IClientsCreation,
  IClientsRequest,
  TPaginateClient,
  TTotalQuery,
} from './TClients';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { RequestError } from '../../utils/RequestError';
import {
  createUsers,
  removeUsers,
  updateUsers,
} from '../../modules/Users/UsersService';
import ClientsAddressDTO from './ClientsAddressDTO';
import { sequelize } from 'lib/sequelize';
import { Op, QueryTypes } from 'sequelize';

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

export const getAllPaginate = async ({
  page = '1',
  limit = '10',
  search = '',
}: {
  page: string;
  limit: string;
  search: string;
}): Promise<TPaginateClient> => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  let searchAnyValue = '%';
  let where = '';
  if (search) {
    searchAnyValue = search
      .split(' ')
      .map((item) => `%${item}%`)
      .join(' ');

    where = `WHERE name LIKE "${searchAnyValue}"`;
  }

  const [clients, [{ total }]] = await Promise.all([
    ClientsDTO.findAll({
      attributes: [
        'id',
        'name',
        'birthdate',
        'mail',
        'phone',
        'createdAt',
        'updatedAt',
      ],
      where: {
        name: {
          [Op.like]: searchAnyValue,
        },
      },
      limit: limitNum,
      offset: limitNum * (pageNum - 1),
    }),
    sequelize.query(
      `
      SELECT COUNT(*) as total from (
        SELECT clients.id
        FROM clients
        ${where} 
        group by clients.id
      ) as total
    `,
      { type: QueryTypes.SELECT }
    ) as Promise<TTotalQuery[]>,
  ]);

  return {
    data: clients as any,
    total,
    pages: Math.ceil(total / limitNum),
    page: pageNum,
    limit: limitNum,
  };
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

export const saveAddress = async (
  address: IAddress[],
  clientId: number,
  transaction?: any
) => {
  if (!address?.length) {
    return;
  }

  const data = address.map((addr) => {
    const { createdAt, updatedAt, ...item } = addr;

    return {
      ...item,
      clientId,
    };
  });

  return await ClientsAddressDTO.bulkCreate(data, {
    transaction: transaction || undefined,
  });
};

export const updateAddress = async (
  allAddress: IAddress[],
  clientId: number,
  transaction?: any
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
    otherAddress = await saveAddress(addressToInsert, clientId, transaction);
  }

  return [...addresses, ...otherAddress];
};

export const createClients = async (body: IClientsRequest) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  await Promise.all([
    validateMailInUse(body.mail),
    validateCPFInUse(body.cpf || ''),
  ]);
  const transaction = await sequelize.transaction();

  const user = await createUsers(
    {
      name: body.name,
      mail: body.mail,
      password: body.password,
      roleId: 2,
    },
    transaction
  );

  const clientRaw = await ClientsDTO.create(
    {
      name: body.name,
      cpf: body.cpf,
      birthdate: body.birthdate,
      mail: body.mail,
      phone: body.phone,
      userId: user.id,
    },
    { transaction }
  );

  const client = {
    ...clientRaw.toJSON(),
    address: await saveAddress(body.address, clientRaw.id),
  };

  transaction.commit();
  return { client, user: user.toJSON() };
};

export const updateClients = async (id: string, body: IClientsCreation) => {
  const validation = updateSchema.validate(body);

  if (validation.error) {
    throw validation.error;
  }
  const transaction = await sequelize.transaction();

  if (body.name && body.mail && body.password) {
    await updateUsers(
      id,
      {
        name: body.name,
        mail: body.mail,
        password: body.password,
      },
      transaction
    );
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

  const address = await updateAddress(body.address, clients.id, transaction);

  console.log('clients.changed():::', clients.changed());
  if (clients.changed()) {
    clients.save();
  }

  transaction.commit();

  return {
    ...clients.toJSON(),
    address,
  };
};

export const removeClients = async (id: string) => {
  try {
    const client = await findOneByUser(id);
    await Promise.all([removeUsers(id), client.destroy()]);
  } catch (error) {
    throw error;
  }
};
