import express from 'express';
import { createOrder, getOrders, getallOrders, deleteOrder } from '../controller/order.controller';
import { authorize } from '../middleware/Auth';

const OrderRouter = (app: express.Application) => {
    app.post('/order', authorize, createOrder);
    app.get('/order', authorize, getOrders);
    app.get('/order/all', getallOrders);
    app.delete('/order/all/:id', authorize, deleteOrder);
}

export default OrderRouter;