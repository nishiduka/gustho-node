import JWTAuthentication from '../../lib/JWTAuthentication';
import IController from '../IController';
import { RequestError } from '../../utils/RequestError';

export default class AuthController extends IController {
  async login() {
    try {
      const body = this._request.body;

      const jwtAuth = new JWTAuthentication();

      const token = await jwtAuth.authenticate(body);

      return this.response({ token });
    } catch (error: any) {
      return this.responseError(error);
    }
  }
}
