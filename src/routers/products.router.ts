import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ValidateProduct from '../middlewares/validateproduct';

const productController = new ProductController();
const router = Router();

router.get('/', (req, res) => productController.findAllProduct(req, res));
router.post('/', ValidateProduct, (req, res) => productController.createProduct(req, res));

export default router; 