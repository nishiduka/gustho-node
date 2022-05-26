import * as express from 'express';
import ClientsController from './ClientsController';

const ClientssRoutes = () => {
  const router = express.Router();

  router.get('/all', (request: express.Request, response: express.Response) => {
    const clientsController = new ClientsController(request, response);
    return clientsController.getAll();
  });

  router.get(
    '/:id',
    (request: express.Request<{ id: string }>, response: express.Response) => {
      const clientsController = new ClientsController(request, response);
      return clientsController.get();
    }
  );

  router.post('/', (request: express.Request, response: express.Response) => {
    const clientsController = new ClientsController(request, response);
    return clientsController.create();
  });

  router.put('/:id', (request: express.Request, response: express.Response) => {
    const clientsController = new ClientsController(request, response);
    return clientsController.update();
  });

  router.delete(
    '/:id',
    (request: express.Request, response: express.Response) => {
      const clientsController = new ClientsController(request, response);
      return clientsController.delete();
    }
  );

  return router;
};

export default ClientssRoutes;
