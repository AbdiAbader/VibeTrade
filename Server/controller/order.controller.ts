import { Request, Response } from 'express';
import orderSchema from '../models/order.schema';
import productSchema from '../models/product.schema';
import userSchema from '../models/user.schema';
import mongoose from 'mongoose';
import { ClientSession } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  try {
   
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken: any = jwt.verify(token!, JWT_SECRET);
    const userId = decodedToken.userId;
    const filter = { _id: userId };


    for (const item of req.body.order_items) {
      const productId = item.product;
      const product: any = await productSchema.findById(productId).session(session);
      if (!product) {
        res.status(400).json({
          status: "Failed",
          message: "Product not found"
        });
        return;
      }      
      if (product.quantity < item.quantity) {
        res.status(400).json({
          status: "Failed",
          message: "Product is out of stock"
        });
        return;
      }
      await productSchema.findByIdAndUpdate(productId, { $inc: { quantity: -item.quantity } }).session(session);
    }
  
      const new_order= {
         user: filter._id,
          order_items: req.body.order_items,
          payment_method: req.body.payment_method
      };
      const userExists = await userSchema.findById(new_order.user).session(session);
if (!userExists) {
  res.status(400).json({
    status: "Failed",
    message: "Invalid user ID",
  });
  return;
}

      await orderSchema.create([new_order], {session: session}).then((res) => {
       s
       
      }).catch((err) => {
        console.log(err);
    });
  
    await session.commitTransaction();

    res.status(200).json({
      status: "Success"
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({
      status: "Failed",
        message: err

    });
  } finally {
    session.endSession();
  }
}

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken: any = jwt.verify(token!, JWT_SECRET);
    const userId = decodedToken.userId;
    const filter = { _id: userId };

    const orders = await orderSchema.find({ user: filter }).populate('order_items.product');
    res.status(200).json({
      orders
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err
    });
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken: any = jwt.verify(token!, JWT_SECRET);
      const userId = decodedToken.userId;
      const filter = { _id: userId };

      const deletedOrder = await orderSchema.findByIdAndDelete(req.params.id).session(session);
      if (!deletedOrder) {
        res.status(400).json({
          status: "Failed",
          message: "Order not found"
        });
        return;
      }
   await session.commitTransaction();
      res.status(200).json({
        status: "Success"
      });
    } catch (err) {
      await session.abortTransaction();
      res.status(400).json({
        status: "Failed",
        message: err
      });
    } finally {
      session.endSession();
    }

  }

