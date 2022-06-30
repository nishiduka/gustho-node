import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { LogsDTO } from 'modules/Logs/LogDTO';

const statusByColor = (status: number) => {
  const statusStr = status.toString();
  const firstNumber = statusStr[0];

  if (firstNumber === '2') {
    return chalk.green(status);
  }

  if (firstNumber === '4' || firstNumber === '5') {
    return chalk.red(status);
  }

  return chalk.white(status);
};

export function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let method = chalk.magenta(request.method);
  let route = chalk.blue.bgWhite(request.url);
  let start = Date.now();
  const ip = chalk.yellow(
    request.headers['x-forwarded-for'] || request.socket.localAddress
  );

  response.on('finish', function (asd: any) {
    // @ts-ignore
    let code = this.statusCode;

    let color = statusByColor(code);

    const calc = (Date.now() - start) / 1000;
    const duration = chalk.cyan(calc);

    const date = new Date().toISOString();

    LogsDTO.create({
      endpoint: request.originalUrl,
      statusCode: code,
      createdAt: date,
      ip: request.headers['x-forwarded-for'] || request.socket.localAddress,
      timeElapsed: `${calc}s`,
    });

    console.log(`${method} ${route} ${color} at ${date} ip ${ip} ${duration}s`);
  });

  next();
}

export function noRobots(req: Request, res: Response, next: NextFunction) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
}
