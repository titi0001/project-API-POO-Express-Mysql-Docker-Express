import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validateProduct from '../middlewares/validateProduct';

const productController = new ProductController();
const router = Router();

router.get('/', (req, res) => productController.findAllProduct(req, res));
router.post('/', validateProduct, (req, res) => productController.createProduct(req, res));

export default router; 