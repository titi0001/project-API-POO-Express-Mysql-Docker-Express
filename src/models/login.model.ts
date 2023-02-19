import { Pool, RowDataPacket } from 'mysql2/promise';
import { ILogin } from '../interfaces/Login';

export default class LoginModel {
  connection: Pool;

  constructor(conneciton: Pool) {
    this.connection = conneciton;
  }

  async findLogin(username: string):Promise<ILogin | undefined> {
    const [result] = await this.connection.execute <RowDataPacket[] & ILogin[]>(
      `SELECT username, password 
      FROM Trybesmith.users WHERE username = ?;`,
      [username],
    );

    return result[0];
  }
}