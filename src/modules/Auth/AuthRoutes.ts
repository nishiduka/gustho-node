import * as express from 'express';
import AuthController from './AuthController';

const AuthsRoutes = () => {
  const router = express.Router();

  router.post(
    '/login',
    (request: express.Request, response: express.Response) => {
      const authController = new AuthController(request, response);
      return authController.login();
    }
  );

  return router;
};

export default AuthsRoutes;
