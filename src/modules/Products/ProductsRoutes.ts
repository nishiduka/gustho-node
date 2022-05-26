import * as express from 'express';
import ProductController from './ProductController';

const productsRoutes = () => {
  const router = express.Router();

  router.get('/all', (request: express.Request, response: express.Response) => {
    const productController = new ProductController(request, response);
    return productController.getAll();
  });

  router.get(
    '/:id',
    (request: express.Request<{ id: string }>, response: express.Response) => {
      const productController = new ProductController(request, response);
      return productController.get();
    }
  );

  router.post('/', (request: express.Request, response: express.Response) => {
    const productController = new ProductController(request, response);
    return productController.create();
  });

  router.put('/:id', (request: express.Request, response: express.Response) => {
    const productController = new ProductController(request, response);
    return productController.update();
  });

  router.delete(
    '/:id',
    (request: express.Request, response: express.Response) => {
      const productController = new ProductController(request, response);
      return productController.delete();
    }
  );

  return router;
};

export default productsRoutes;
