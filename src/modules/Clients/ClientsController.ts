import JWTAuthentication from 'lib/JWTAuthentication';
import { Auth } from 'modules/Auth/Decorators';
import IController from '../IController';
import ClientsDTO from './ClientsDTO';
import * as clientsService from './ClientsService';

export default class ClientsController extends IController {
  @Auth('admin')
  async getAll() {
    const clients = await ClientsDTO.findAll();

    return this.response({
      clients,
    });
  }

  async create() {
    try {
      const body = this._request.body;

      const { client, user } = await clientsService.createClients(body);

      const jwt = new JWTAuthentication();

      return this.response({
        ...client,
        token: jwt.assignToken(user),
      });
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('user')
  async getCurrentUser() {
    try {
      const id = this._request.currentUser?.id as number;
      const client = await clientsService.findOne(id.toString());

      return this.response(client);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('admin')
  async get() {
    try {
      const params = this._request.params;
      const client = await clientsService.findOne(params.id);

      return this.response(client);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('admin')
  async update() {
    try {
      const params = this._request.params;
      const body = this._request.body;

      const client = await clientsService.updateClients(params.id, body);

      return this.response(client);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('user')
  async updateUser() {
    try {
      const id = this._request.currentUser?.id as number;
      const body = this._request.body;

      const client = await clientsService.updateClients(id?.toString(), body);

      return this.response(client);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('admin')
  async delete() {
    try {
      const params = this._request.params;

      await clientsService.removeClients(params.id);

      return this.response('', 204);
    } catch (error: any) {
      return this.responseError(error);
    }
  }
}
