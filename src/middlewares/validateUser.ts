import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateFieldsUser = Joi.object().keys({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().strict().min(1).required(),
  password: Joi.string().min(8).required(),
});

export default async function validateUserJoi(req: Request, res: Response, next: NextFunction) {
  const { error } = await validateFieldsUser.validate(req.body);
 
  if (error?.details[0].type === 'string.base'
    || error?.details[0].type === 'string.min'
    || error?.details[0].type === 'number.min'
    || error?.details[0].type === 'number.base'
  ) {
    return res.status(422).send({ message: error.details[0].message });
  }
  next();
}

export async function validateUserUndefined(req: Request, res: Response, next: NextFunction) {
  const { error } = await validateFieldsUser.validate(req.body);
 
  if (error !== undefined) {
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
}