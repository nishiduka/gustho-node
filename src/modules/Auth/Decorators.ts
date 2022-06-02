import IController from 'modules/IController';
import 'reflect-metadata';
import { RequestError } from '../../utils/RequestError';

import JWTAuthentication from '../../lib/JWTAuthentication';

const jwtAuthentication = new JWTAuthentication();

const USERLEVEL = {
  admin: 1,
  user: 2,
  all: 3,
};
type TAuth = 'admin' | 'user' | 'all';
export function Auth(level: TAuth) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const defaultValue = descriptor.value;

    descriptor.value = async function (this: any, ...args: any[]) {
      try {
        await jwtAuthentication.verifyJWT(this._request);

        if (this._request.currentUser.level > USERLEVEL[level]) {
          throw new RequestError('User not authorized', 401);
        }

        defaultValue.call(this, args);
      } catch (error) {
        let statusCode = 401;
        let message = 'Token is not valid';

        if (error instanceof RequestError) {
          statusCode = error.statusCode;
          message = error.message;
        }

        return this._response.status(statusCode).json({
          auth: false,
          message: message,
        });
      }
    };
  };

  // target: any,
  // propertyKey: string,
  // descriptor: IController
  // const originalValue = descriptor.value;

  // descriptor.value = function (...args: any[]) {
  //   console.log(this._request);

  //   return originalValue.apply(this, args);
  // };
}
