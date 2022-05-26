export class RequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = 500;
  }
}
