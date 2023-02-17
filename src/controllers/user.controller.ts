import { Request, Response } from 'express';
import UserService from '../services/user.service';
import generateToken from '../utils/generateToken';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const { username, vocation, level, password } = req.body;
    const newUser = await this.userService.createUser(username, vocation, level, password);
    if (newUser) {
      const newUserToken = generateToken(username, password);
      res.status(201).send({ token: newUserToken });
    }
  }
}