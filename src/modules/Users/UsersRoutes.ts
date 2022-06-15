import * as express from 'express';
import JWTAuthentication from '../../lib/JWTAuthentication';
import UsersController from './UsersController';

const UserssRoutes = () => {
  const router = express.Router();

  router.get(
    '/',
    (request: express.Request<{ id: string }>, response: express.Response) => {
      const usersController = new UsersController(request, response);
      return usersController.getCurrentUser();
    }
  );

  router.get('/all', (request: express.Request, response: express.Response) => {
    const usersController = new UsersController(request, response);
    return usersController.getAll();
  });

  router.get(
    '/:id',
    (request: express.Request<{ id: string }>, response: express.Response) => {
      const usersController = new UsersController(request, response);
      return usersController.get();
    }
  );

  router.post('/', (request: express.Request, response: express.Response) => {
    const usersController = new UsersController(request, response);
    return usersController.create();
  });

  router.put('/:id', (request: express.Request, response: express.Response) => {
    const usersController = new UsersController(request, response);
    return usersController.update();
  });

  router.delete(
    '/:id',
    (request: express.Request, response: express.Response) => {
      const usersController = new UsersController(request, response);
      return usersController.delete();
    }
  );

  return router;
};

export default UserssRoutes;
