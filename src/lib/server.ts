import express from 'express';
import cors from 'cors';
import SwaggerUI from 'swagger-ui-express';

import swaggerDocument from './Swagger';
import { loggerMiddleware, noRobots } from './middleware';
import { initSequlize } from './sequelize';
import * as routes from '../modules/routes';
import helmet from 'helmet';

class Server {
  app!: express.Express;

  private boot() {
    this.app = express();
  }

  private initRoutes() {
    this.app.use('/auth', routes.AuthRoutes());
    this.app.use('/products', routes.ProductsRoutes());
    this.app.use('/clients', routes.ClientsRoutes());
    this.app.use('/users', routes.UsersRoutes());
    this.app.use('/checkout', routes.CheckoutRoutes());

    console.log(`\n        🗺  Routes loaded\n`);
  }

  private async initModules() {
    await initSequlize();
    this.app.use(express.json({ limit: '50MB' }));
    this.app.use(express.urlencoded({ limit: '50MB', extended: true }));

    this.app.use(loggerMiddleware);

    this.app.use(helmet());
    this.app.use(cors());

    this.app.use(
      '/api-docs',
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
