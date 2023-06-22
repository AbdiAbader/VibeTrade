import express, { Router} from 'express';
import { createProduct, getAll, getProductById, updateProduct, deleteProduct } from '../controller/product.controller';

const productRouter = (app: express.Application) => {
    app.post('/product', createProduct);
    app.get('/product', getAll);
    app.get('/product/:id', getProductById);
    app.put('/product/:id', updateProduct);
    app.delete('/product/:id', deleteProduct);
}

export default productRouter;
