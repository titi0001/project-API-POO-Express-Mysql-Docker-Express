import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IOrder } from '../interfaces/Order';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async findAllOrders(): Promise<IOrder[]> {
    const [result] = await this.connection.execute<(IOrder & RowDataPacket)[]>(
      `SELECT orders.id id , orders.user_id userId , JSON_ARRAYAGG(products.id) productsIds 
      FROM Trybesmith.products
      INNER JOIN Trybesmith.orders
      ON orders.id = products.order_id
      GROUP BY orders.id, orders.user_id;`);

    return result;
  }

  async createOrder(productsIds: number[], userId: number | undefined) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.orders (user_id) VALUE (?)`, [userId]);

    await Promise.all(productsIds.map(async (product: number) => {
      await this.connection.execute(`
        UPDATE Trybesmith.products SET order_id = ? WHERE id = ?
        `, [insertId, product]);
    }));

    return userId;
  }
}