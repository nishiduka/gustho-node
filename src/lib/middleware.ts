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

export function noRobots(req: Request, res: Response, next: NextFunction) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
}
