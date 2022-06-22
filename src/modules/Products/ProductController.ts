import { Auth } from 'modules/Auth/Decorators';
import IController from '../IController';
import ProductDTO from './ProductDTO';
import {
  findOne,
  createProduct,
  updateProduct,
  removeProduct,
  findPaginate,
  getAllPaginate,
} from './ProductService';

class ProductController extends IController {
  async getAll() {
    const query = this._request.query as any;
    const products = await getAllPaginate(query);

    return this.response(products);
  }

  @Auth('admin')
  async create() {
    try {
      const body = this._request.body;
      const product = await createProduct(body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async getPaginate() {
    try {
      const query = this._request.query as any;
      const product = await findPaginate(query);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('all')
  async get() {
    try {
      const params = this._request.params;
      const product = await findOne(params.id);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('admin')
  async update() {
    try {
      const params = this._request.params;
      const body = this._request.body;

      const product = await updateProduct(params.id, body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  @Auth('admin')
  async delete() {
    try {
      const params = this._request.params;

      await removeProduct(params.id);

      return this.response('', 204);
    } catch (error: any) {
      return this.responseError(error);
    }
  }
}

export default ProductController;
