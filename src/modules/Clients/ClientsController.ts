import IController from '../IController';
import ClientsDTO from './ClientsDTO';
import * as clientsService from './ClientsService';

export default class ClientsController extends IController {
  async getAll() {
    const clients = await ClientsDTO.findAll();

    return this.response({
      clients,
    });
  }

  async create() {
    try {
      const body = this._request.body;
      const product = await clientsService.createClients(body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async get() {
    try {
      const params = this._request.params;
      const product = await clientsService.findOne(params.id);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async update() {
    try {
      const params = this._request.params;
      const body = this._request.body;

      const product = await clientsService.updateClients(params.id, body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

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

