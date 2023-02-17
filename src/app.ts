import express from 'express';
import 'express-async-errors';
import httpErrorMiddleware from './middlewares/http.error.middleware';
import productRouter from './routers/products.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/orders.router';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use(httpErrorMiddleware);

export default app;
