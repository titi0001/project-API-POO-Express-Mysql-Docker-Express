import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces/Product';

export default class ProductService {
  constructor(private productModel = new ProductModel(connection)) { }

  async createProduct(name: string, amount: string): Promise<IProduct> {
    return this.productModel.createOneProduct(name, amount);
  }

  async findAllProduct(): Promise<IProduct[]> {
    return this.productModel.findAllProduct();
  }
}