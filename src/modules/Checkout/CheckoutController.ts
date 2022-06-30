import { Auth } from 'modules/Auth/Decorators';
import IController from '../IController';
import CheckoutDTO from './CheckoutDTO';
import * as checkoutService from './CheckoutService';

export default class CheckoutController extends IController {
  @Auth('user')
  async getAll() {
    const query = this._request.query as any;
    const currentUser = this._request.currentUser;

    const products = await checkoutService.getAllPaginate({
      ...query,
      currentUser,
    });

    return this.response(products);
  }

  @Auth('user')
  async create() {
    try {
      const body = this._request.body;
      const id = this._request.currentUser?.id as number;

      const product = await checkoutService.createCheckout(id.toString(), body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('user')
  async get() {
    try {
      const params = this._request.params;
      const product = await checkoutService.findOne(params.id);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('user')
  async update() {
    try {
      const params = this._request.params;
      const body = this._request.body;

      const product = await checkoutService.updateCheckout(params.id, body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('user')
  async delete() {
    try {
      const params = this._request.params;

      await checkoutService.removeCheckout(params.id);

      return this.response('', 204);
    } catch (error: any) {
      return this.responseError(error);
    }
  }
}
