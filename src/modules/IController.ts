import { Request, Response } from 'express';
import { IRequest } from '../types';
import { RequestError } from '../utils/RequestError';
import { LogsErrorDTO } from './Logs/LogErrorDTO';

export default class IController {
  _request: IRequest;
  _response: Response;

  constructor(request: Request, response: Response) {
    this._request = request;
    this._response = response;
  }

  response(body: any = {}, status: number = 200): void {
    this._response.status(status).json(body);
  }

  responseError(error: RequestError): void {
    console.log('error:::', error);

    LogsErrorDTO.create({
      user: this._request.currentUser?.id,
      body: this._request.body || {},
      responseMessage: error.message,
      code: error?.statusCode || 500,
      endpoint: this._request.originalUrl,
    });

    this._response.status(error?.statusCode || 500).json({
      message: error.message || `Ocorreu algum erro!`,
    });
  }
}
