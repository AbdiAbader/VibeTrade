import express from 'express';
import { createOrder } from '../controller/order_controller';

const OrderRouter = express.Router();

OrderRouter.post('/', createOrder);

export default OrderRouter;