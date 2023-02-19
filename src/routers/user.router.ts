import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateUserJoi, { validateUserUndefined } from '../middlewares/validateUser';

const userController = new UserController();
const router = Router();

router.post(
  '/', 
  validateUserJoi, 
  validateUserUndefined,
  (req, res) => userController.createUser(req, res),
);

export default router;