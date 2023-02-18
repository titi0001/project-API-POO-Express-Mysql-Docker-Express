import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { IOrder } from '../interfaces/Order';

export default class OrderService {
  constructor(private orderModel = new OrderModel(connection)) {}

  async findAllOrder(): Promise<IOrder[]> {
    return this.orderModel.findAllOrders();
  }
}