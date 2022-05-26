import { Request, Response } from 'express';
import { Model } from 'sequelize/types';
import { RequestError } from 'utils/RequestError';
import { ValidationError } from 'utils/ValidationError';

export default class IController {
  _request: Request;
  _response: Response;

  constructor(request: Request, response: Response) {
    this._request = request;
    this._response = response;
  }

  response(body: any = {}, status: number = 200): void {
    this._response.status(status).json(body);
  }

  responseError(error: RequestError): void {
    this._response.status(error?.statusCode || 500).json({
      message: error.message || `Ocorreu algum erro!`,
    });
  }
}
