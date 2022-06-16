import * as express from 'express';
import CheckoutController from './CheckoutController';

const CheckoutsRoutes = () => {
  const router = express.Router();

  router.get('/all', (request: express.Request, response: express.Response) => {
    const checkoutController = new CheckoutController(request, response);
    return checkoutController.getAll();
  });

  router.get(
    '/:id',
    (request: express.Request<{ id: string }>, response: express.Response) => {
      const checkoutController = new CheckoutController(request, response);
      return checkoutController.get();
    }
  );

  router.post('/', (request: express.Request, response: express.Response) => {
    const checkoutController = new CheckoutController(request, response);
    return checkoutController.create();
  });

  router.put('/:id', (request: express.Request, response: express.Response) => {
    const checkoutController = new CheckoutController(request, response);
    return checkoutController.update();
  });

  router.delete(
    '/:id',
    (request: express.Request, response: express.Response) => {
      const checkoutController = new CheckoutController(request, response);
      return checkoutController.delete();
    }
  );

  return router;
};

export default CheckoutsRoutes;
