import express from 'express';
import { createOrder, getOrders, deleteOrder} from '../controller/order.controller';
import { authorize } from '../middleware/Auth';

const OrderRouter = (app: express.Application) => {
    app.post('/order', authorize, createOrder);
    app.get('/order', authorize, getOrders);
    app.delete('/order/:id', authorize, deleteOrder);
}

export default OrderRouter;