import { RequestError } from './RequestError';

export class NotFoundError extends RequestError {
  constructor(message: string) {
    super(message);

    this.statusCode = 404;
  }
}
