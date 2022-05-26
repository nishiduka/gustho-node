import IController from '../IController';
import SupplierContactDTO from './SupplierContactDTO';
import SupplierDTO from './SupplierDTO';
import * as supplierService from './SupplierService';

export default class SupplierController extends IController {
  async getAll() {
    const suppliers = await SupplierDTO.findAll({
      include: SupplierContactDTO,
    });

    return this.response({
      suppliers,
    });
  }

  async create() {
    try {
      const body = this._request.body;
      const product = await supplierService.createSupplier(body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async get() {
    try {
      const params = this._request.params;
      const product = await supplierService.findOne(params.id);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async update() {
    try {
      const params = this._request.params;
      const body = this._request.body;

      const product = await supplierService.updateSupplier(params.id, body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async delete() {
    try {
      const params = this._request.params;

      await supplierService.removeSupplier(params.id);

      return this.response('', 204);
    } catch (error: any) {
      return this.responseError(error);
    }
  }
}
