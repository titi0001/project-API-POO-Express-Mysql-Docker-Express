import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../utils/http.exception';

export default function authUser(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  if (!token) {
    throw new HttpException(401, 'Token not found');
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = user;
    next(); 
  } catch (error) {
    throw new HttpException(401, 'Invalid token');
  }
}