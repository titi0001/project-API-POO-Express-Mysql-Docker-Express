import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateFieldsProduct = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

export default async function validateProduct(req: Request, res: Response, next: NextFunction) {
  const { error } = await validateFieldsProduct.validate(req.body);

  console.log(error?.details[0].type);
  
  if (error?.details[0].type === 'string.base' || error?.details[0].type === 'string.min') {
    return res.status(422).send({ message: error.details[0].message });
  }

  if (error !== undefined) {
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
}
