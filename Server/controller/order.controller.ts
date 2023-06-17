import { Request, Response } from 'express';
import orderSchema from '../models/order.schema';
import productSchema from '../models/product.schema';
import orderItemsSchema from '../models/orderitems.schema';
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

      const orders = await orderSchema.create({
        user: filter,
        order_items: req.body.order_items,
      }, { session });

      const orderItems = [];

      for (const item of req.body.order_items) {
        const orderItem = {
           // @ts-ignore
          order: orders._id,
          product: item.product,
          quantity: item.quantity
        };
        orderItems.push(orderItem);
      }

      await orderItemsSchema.create(orderItems, { session });
      await productSchema.findByIdAndUpdate(productId, { quantity: product.quantity - item.quantity }, { session });
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