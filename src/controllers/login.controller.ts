import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  async findUserLogin(req: Request, res:Response) {
    const { body } = req;
    const newToken = await this.loginService.findLogin(body);
    res.status(200).send({ token: newToken });
  }
}
