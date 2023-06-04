import { Request, Response } from 'express';
import orderSchema from '../models/order.schema';
import orderItemsSchema from '../models/orderitems.schema';
import mongoose from 'mongoose';
import { ClientSession } from 'mongoose';



export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
        const orders = await orderSchema.create(req.body, { session: session });

        
        // Retrieve the product IDs and quantities for the items in the order
        const items = req.body.order_items;
        
       
        const orderItems = [];

        // Iterate over the items and create the order item objects
        for (const item of items) {
          const orderItem = {
            // @ts-ignore
            order: orders._id,
            product: item.product,
            quantity: item.quantity
          };
          orderItems.push(orderItem);
        }
            
            await orderItemsSchema.create(orderItems, { session });
        
        session.commitTransaction();
        res.status(200).json({
        status: "Success"
        });

    } catch (err) {
        session.abortTransaction();
        res.status(400).json({
        status: "Failed",
        message: err,
        });
    }
    finally {
        session.endSession();
    }
    };
    
