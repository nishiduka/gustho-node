import * as express from 'express';
import SupplierController from './SupplierController';

const SuppliersRoutes = () => {
  const router = express.Router();

  router.get('/all', (request: express.Request, response: express.Response) => {
    const supplierController = new SupplierController(request, response);
    return supplierController.getAll();
  });

  router.get(
    '/:id',
    (request: express.Request<{ id: string }>, response: express.Response) => {
      const supplierController = new SupplierController(request, response);
      return supplierController.get();
    }
  );

  router.post('/', (request: express.Request, response: express.Response) => {
    const supplierController = new SupplierController(request, response);
    return supplierController.create();
  });

  router.put('/:id', (request: express.Request, response: express.Response) => {
    const supplierController = new SupplierController(request, response);
    return supplierController.update();
  });

  router.delete(
    '/:id',
    (request: express.Request, response: express.Response) => {
      const supplierController = new SupplierController(request, response);
      return supplierController.delete();
    }
  );

  return router;
};

export default SuppliersRoutes;
