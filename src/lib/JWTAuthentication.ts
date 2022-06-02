import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findByAuth } from '../modules/Auth/AuthService';
import { IAuthRequest } from 'modules/Auth/TAuth';
import { IRequest } from 'types';
import { RequestError } from '../utils/RequestError';

export default class JWTAuthentication {
  verifyJWT = async (req: IRequest, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'] as string;
    token = token.replace('Bearer ', '');

    try {
      if (!token) {
        throw new RequestError('No token provided', 401);
      }
      const secret = process.env.SECRET || '';

      const decoded = jwt.verify(token, secret) as IAuthRequest;
      req.currentUser = decoded;

      next();
    } catch (error) {
      let statusCode = 401;
      let message = 'Token is not valid';

      if (error instanceof RequestError) {
        statusCode = error.statusCode;
        message = error.message;
      }

      return res.status(statusCode).json({
        auth: false,
        message: message,
      });
    }
  };

  assignToken = (id: string) => {
    const secret = process.env.SECRET || '';
    const expiresIn = parseInt(process.env.EXPIRES_IN || '3600');

    const token = jwt.sign({ id }, secret, {
      expiresIn,
    });

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

    const token = JWT.assignToken(user.id);

    return token;
  };
}
