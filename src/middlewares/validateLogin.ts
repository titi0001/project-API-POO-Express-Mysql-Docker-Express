import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateFieldsLogin = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { error } = await validateFieldsLogin.validate(req.body);

  if (error !== undefined) {
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
}
