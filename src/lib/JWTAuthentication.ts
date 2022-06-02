import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findByAuth } from '../modules/Auth/AuthService';
import { IAuthRequest } from '../modules/Auth/TAuth';
import { IRequest } from '../types';
import { RequestError } from '../utils/RequestError';
import { IUsers } from '../modules/Users/TUsers';
import UsersDTO from '../modules/Users/UsersDTO';

export default class JWTAuthentication {
  verifyJWT = async (req: IRequest) => {
    let token = req.headers['authorization'] as string;

    if (!token) {
      throw new RequestError('No token provided', 401);
    }

    token = token.replace('Bearer ', '');
    const secret = process.env.SECRET || '';

    const decoded = jwt.verify(token, secret) as IAuthRequest;
    req.currentUser = decoded;

    return true;
  };

  assignToken = (user: UsersDTO) => {
    const secret = process.env.SECRET || '';
    const expiresIn = parseInt(process.env.EXPIRES_IN || '3600');

    const token = jwt.sign(
      {
        id: user.id,
        level: user.roleId,
      },
      secret,
      {
        expiresIn,
      }
    );

    return token;
  };

  authenticate = async ({
    mail,
    password,
  }: {
    mail: string;
    password: string;
  }): Promise<string | boolean> => {
    const user = await findByAuth({ mail, password });

    const JWT = new JWTAuthentication();

    const token = JWT.assignToken(user);

    return token;
  };
}
