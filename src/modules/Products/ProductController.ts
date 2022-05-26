import IController from '../IController';
import ProductDTO from './ProductDTO';
import {
  findOne,
  createProduct,
  updateProduct,
  removeProduct,
} from './ProductService';

class ProductController extends IController {
  async getAll() {
    const products = await ProductDTO.findAll();

    return this.response({
      products,
    });
  }

  async create() {
    try {
      const body = this._request.body;
      const product = await createProduct(body);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

  async get() {
    try {
      const params = this._request.params;
      const product = await findOne(params.id);

      return this.response(product);
    } catch (error: any) {
      return this.responseError(error);
    }
  }

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
