import connection from '../database/connection';
import UserModel from '../database/models/user.model';
import { IUser } from '../interfaces/Users';

export default class UserService {
  constructor(
    private userModel = new UserModel(connection),
  ) {}

  async createUser(
    username: string,
    vocation: string, 
    level: number, 
    password: string,
  ): Promise<IUser> {
    return this.userModel.createNewUser(username, vocation, level, password);
  }
}