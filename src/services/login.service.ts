import { ILogin } from '../interfaces/Login';
import connection from '../models/connection';
import LoginModel from '../models/login.model';
import generateToken from '../utils/generateToken';
import HttpException from '../utils/http.exception';

export default class LoginService {
  constructor(private loginModel = new LoginModel(connection)) {}

  async findLogin(loginBody: ILogin):Promise<string> {
    const login = await this.loginModel.findLogin(loginBody.username);
    
    if (!login) {
      throw new HttpException(401, 'Username or password invalid');
    }
  
    if (login.password !== loginBody.password) {
      throw new HttpException(401, 'Username or password invalid');
    }

    return generateToken(login.username, login.password);
  }
}