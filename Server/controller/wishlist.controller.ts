import { Request, Response } from 'express';
import wishlistSchema from '../models/wishlist.schema';
import { ClientSession } from 'mongoose';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import productSchema from '../models/product.schema';

dotenv.config();



const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const data: any = [];
export const createWishlist = async (req: Request, res: Response): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
        console.log(req.params.id);
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };

      

        const wishlist = await wishlistSchema.create({
            user: filter,
            product: req.params.id
        });
        await session.commitTransaction();
        res.status(200).json({
            status: "success",
            data: wishlist
        });
      
     
   
     
    }
    catch (err) {
        await session.abortTransaction();
        res.status(400).json({
            status: "Failed",
            massage: err
        });
    }
    await session.endSession();
};

export const getWishlist = async (req: Request, res: Response): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    const products: any = [];
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken: any = jwt.verify(token!, JWT_SECRET);
      const userId = decodedToken.userId;
      const filter = { _id: userId };
  
      const wishlist: any  = await wishlistSchema.find({ user: filter }).session(session);
      await session.commitTransaction();
  
      for (let i = 0; i < wishlist.length; i++) {
        const product = await productSchema.findById(wishlist[i].product).session(session);
        products.push(product);
      }
  
      res.status(200).json({
        status: "success",
        data: products
      });
    } catch (err) {
      await session.abortTransaction();
      res.status(400).json({
        status: "Failed",
        massage: err
      });
    } finally {
      await session.endSession();
    }
  };
  
export const deleteWishlist = async (req: Request, res: Response): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
        const product_id = req.params.id;
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
        const wishlist = await wishlistSchema.findOneAndDelete({ user: filter, product: product_id }).session(session);
        await session.commitTransaction();
        res.status(200).json({
            status: "success",
            data: wishlist
        });
    }
    catch (err) {
        await session.abortTransaction();
        res.status(400).json({
            status: "Failed",
            massage: err
        });
    }
    await session.endSession();

}
