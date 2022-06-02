import UsersDTO from './UsersDTO';
import { createSchema } from './schema';
import { IUsersCreation } from './TUsers';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import { hashPassword } from '../../modules/Auth/AuthService';

export const findOne = async (id: string): Promise<UsersDTO> => {
  const users = await UsersDTO.findByPk(parseInt(id));

  if (!users) {
    throw new NotFoundError('Users not found');
  }

  return users;
};

export const createUsers = async (body: IUsersCreation) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  const password = await hashPassword(body.password);

  const user = await UsersDTO.create({
    ...body,
    password,
  });

  return user;
};

export const updateUsers = async (id: string, body: IUsersCreation) => {
  try {
    const validation = createSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }

    const users = await findOne(id);

    return users.save();
  } catch (error) {
    throw error;
  }
};

export const removeUsers = async (id: string) => {
  try {
    const users = await findOne(id);

    return users.destroy();
  } catch (error) {
    throw error;
  }
};
