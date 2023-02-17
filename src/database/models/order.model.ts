import { Pool, RowDataPacket } from 'mysql2/promise';
import { IOrder } from '../../interfaces/Order';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async findAllOrders(): Promise<IOrder[]> {
    const [resutl] = await this.connection.execute<(IOrder & RowDataPacket)[]>(
      `SELECT orders.id id , orders.user_id userId , JSON_ARRAYAGG(products.id) productsIds 
      FROM Trybesmith.products
      INNER JOIN Trybesmith.orders
      ON orders.id = products.order_id
      GROUP BY orders.id, orders.user_id;`);

    return resutl;
  }
}