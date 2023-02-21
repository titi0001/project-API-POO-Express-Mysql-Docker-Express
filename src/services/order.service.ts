import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { IOrder } from '../interfaces/Order';
import UserModel from '../models/user.model';

export default class OrderService {
  constructor(
    private orderModel = new OrderModel(connection),
    private userModel = new UserModel(connection),
  ) {}

  async findAllOrder(): Promise<IOrder[]> {
    return this.orderModel.findAllOrders();
  }

  async createOrder(productsIds : number[], username: string) {
    const user = await this.userModel.getUserByName(username);
    
    const userId = await this.orderModel.createOrder(productsIds, user?.id);
    return { userId, productsIds };
  }
}