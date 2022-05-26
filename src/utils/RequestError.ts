export class RequestError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
