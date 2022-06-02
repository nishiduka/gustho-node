import { Request } from 'express';
import { IAuthRequest } from './modules/Auth/TAuth';

export interface IRequest extends Request {
  currentUser?: IAuthRequest;
}
