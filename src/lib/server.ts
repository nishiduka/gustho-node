import express from 'express';
import cors from 'cors';
import SwaggerUI from 'swagger-ui-express';

import swaggerDocument from './Swagger';
import { loggerMiddleware, noRobots } from './middleware';
import { initSequlize } from './sequelize';
import * as routes from '../modules/routes';
import helmet from 'helmet';
import { connectMongoose } from './mongoose';

class Server {
  app!: express.Express;

  private boot() {
    this.app = express();
  }

  private initRoutes() {
    this.app.use('/api/auth', routes.AuthRoutes());
    this.app.use('/api/products', routes.ProductsRoutes());
    this.app.use('/api/clients', routes.ClientsRoutes());
    this.app.use('/api/users', routes.UsersRoutes());
    this.app.use('/api/checkout', routes.CheckoutRoutes());

    console.log(`\n        🗺  Routes loaded\n`);
  }

  private async initModules() {
    await initSequlize();
    await connectMongoose();
    this.app.use(express.json({ limit: '50MB' }));
    this.app.use(express.urlencoded({ limit: '50MB', extended: true }));

    this.app.use(loggerMiddleware);

    this.app.use(helmet());
    this.app.use(cors());

    this.app.use(
      '/api/docs',
      SwaggerUI.serve,
      SwaggerUI.setup(swaggerDocument)
    );
    this.initRoutes();
  }

  public async start() {
    await this.boot();
    await this.initModules();

    this.app.listen(process.env.NODE_PORT);

    console.log(
      `\n        🚀 Server ready at: http://localhost:${process.env.NODE_PORT}\n`
    );
  }
}

export default Server;
