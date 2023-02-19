import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateFieldsOrder = Joi.object().keys({
  productsIds: Joi.array().items(Joi.number()).required(),
});

export default async function validateOrder(req: Request, res: Response, next: NextFunction) {
  const { error } = await validateFieldsOrder.validate(req.body);
  
  console.log(error);
  
  if (error?.details[0].type === 'any.required') {
    return res.status(400).send({ message: error.details[0].message });
  }
  if (error?.details[0].type === 'string.base') {
    return res.status(422).send({ message: error.details[0].message });
  }

  next();
}
