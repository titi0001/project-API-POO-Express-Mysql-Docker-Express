import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  async findAllOrders(req: Request, res: Response) {
    const findOrder = await this.orderService.findAllOrder();
    res.status(200).send(findOrder);
  }

  // async function createOrder(req: Request, res: Response) {
  //   const newOrder = await this.orderService.createOrder()
  //   res.status(201).send(newOrder)
  // }
}