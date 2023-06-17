import express from 'express';
import { createWishlist, getWishlist, deleteWishlist } from '../controller/wishlist.controller';
import { authorize } from '../middleware/Auth'

const WishlistRouter = (app: express.Application) => {
    app.post('/wishlist/:id', authorize, createWishlist);
    app.get('/wishlist', authorize, getWishlist);
    app.delete('/wishlist/:id', authorize, deleteWishlist);
}
export default WishlistRouter;