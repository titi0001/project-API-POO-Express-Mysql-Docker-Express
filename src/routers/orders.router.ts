import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authUser from '../middlewares/authUser';
import validateOrder from '../middlewares/validateOrder';

const orderController = new OrderController();

const router = Router();

router.get('/', (req, res) => orderController.findAllOrders(req, res));
router.post('/', authUser, validateOrder);

export default router;

// (req, res) => orderController.createOrder(req, res)