import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(
    `${request.method} ${request.path} at ${new Date().toISOString()} ip ${
      request.socket.localAddress
    }`
  );
  next();
}
