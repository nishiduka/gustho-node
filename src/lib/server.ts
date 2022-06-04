import express from 'express';
import cors from 'cors';
import SwaggerUI from 'swagger-ui-express';

import swaggerDocument from './Swagger';
import { loggerMiddleware } from './middleware';
import { initSequlize } from './sequelize';
import * as routes from '../modules/routes';

class Server {
  app: any;

  private boot() {
    this.app = express();
  }

  private initRoutes() {
    this.app.use('/api/auth', routes.AuthRoutes());
    this.app.use('/api/products', routes.ProductsRoutes());
    this.app.use('/api/suppliers', routes.SuppliersRoutes());
    this.app.use('/api/clients', routes.ClientsRoutes());
    this.app.use('/api/users', routes.UsersRoutes());

    console.log(`\n        🗺  Conexao do banco de dados estabilizada\n`);
  }

  private async initModules() {
    await initSequlize();

    this.app.use(loggerMiddleware);
    this.app.use(express.json());

    this.app.use(cors());

    this.app.use(
      '/api-docs',
      SwaggerUI.serve,
      SwaggerUI.setup(swaggerDocument)
    );
    this.initRoutes();
  }

  public start() {
    this.boot();
    this.initModules();

    this.app.listen(process.env.NODE_PORT);

    console.log(
      `\n        🚀 Server ready at: http://localhost:${process.env.NODE_PORT}\n`
    );
  }
}

export default Server;
