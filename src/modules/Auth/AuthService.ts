import bcrypt from 'bcrypt';
import JWTAuthentication from '../../lib/JWTAuthentication';
import { RequestError } from '../../utils/RequestError';
import { NotFoundError } from '../../utils/NotFoundError';

import UsersDTO from '../Users/UsersDTO';

export const findByAuth = async ({
  mail,
  password,
}: {
  mail: string;
  password: string;
}) => {
  const user = await UsersDTO.findOne({
    where: {
      mail,
    },
  });

  if (!user) {
    throw new RequestError('Mail or password not match', 401);
  }

  const validate = await comparePassword(password, user.password);

  if (!validate) {
    throw new RequestError('Mail or password not match', 401);
  }

  return user;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const comparePassword = async (
  plaintextPassword: string,
  hash: string
) => {
  return await bcrypt.compare(plaintextPassword, hash);
};
