import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IProduct } from '../../interfaces/Product';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async createOneProduct(name: string, amount: string): Promise<IProduct> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products(name, amount) VALUES(?,?)',
      [name, amount],
    );
  
    const newProduct = { 
      id: insertId, 
      name, 
      amount, 
    };
  
    return newProduct;
  }

  async findAllProduct(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<(IProduct & RowDataPacket)[]>(
      'SELECT * FROM  Trybesmith.products');

    return result;
  }
}
