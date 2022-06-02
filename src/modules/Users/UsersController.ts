import { Auth } from '../../modules/Auth/Decorators';
import IController from '../IController';
import UsersDTO from './UsersDTO';
import * as usersService from './UsersService';

export default class UsersController extends IController {
  async getAll() {
    const users = await UsersDTO.findAll();

    return this.response({
      users,
    });
  }

  async create() {
    try {
      const body = this._request.body;
      const product = await usersService.createUsers(body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('all')
  async get() {
    try {
      const userId = this._request.currentUser!.id as number;
      const product = await usersService.findOne(userId.toString());

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async update() {
    try {
      const params = this._request.params;
      const body = this._request.body;

      const product = await usersService.updateUsers(params.id, body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async delete() {
    try {
      const params = this._request.params;

      await usersService.removeUsers(params.id);

      return this.response('', 204);
    } catch (error: any) {
      return this.responseError(error);
    }
  }
}
