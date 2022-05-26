import { ValidationError as ValidationErrorJoi } from 'joi';
import { RequestError } from './RequestError';

export class ValidationError extends RequestError {
  statusCode: number;
  body: any;

  constructor(error: ValidationErrorJoi) {
    super('Validation Error');

    this.name = this.constructor.name;
    this.message = error.message;
    this.body = error.details;
    this.statusCode = 400;
  }
}
