import { Router } from 'express';
import validateLogin from '../middlewares/validatelogin';
import LoginController from '../controllers/login.controller';

const loginController = new LoginController();

const router = Router();

router.post('/', validateLogin, (req, res) => loginController.findUserLogin(req, res));

export default router;