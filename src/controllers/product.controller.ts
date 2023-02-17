import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    const { name, amount } = req.body;
    const newProduct = await this.productService.createProduct(name, amount);
    res.status(201).send(newProduct);
  }

  async findAllProduct(_req: Request, res: Response): Promise<void> {
    const findProduct = await this.productService.findAllProduct();
    res.status(200).send(findProduct);    
  }
}