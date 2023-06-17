import mongoose from "mongoose";
import { Request, Response } from "express";
import notificationSchema from "../models/notification.schema";
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const createNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };

        await notificationSchema.create(
            { 
                user: filter,
                message: req.body.message,
                title: req.body.title
              
            });
        res.status(200).json({
            status: "Success",
        })
    }
    catch (err) {

        res.status(400).json({
            status: "Failed",
            message: "Create notification failed"
        });
    }
}

export const getNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
        const notification = await notificationSchema.find({ user: filter });
        const msg = notification.length > 0 ? "Success" : "No notification found";
    
        res.status(200).json({
            status: msg,
            data: notification
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            message: "Get notification failed"
        });
    }
}

export const notificationRead = async (req: Request, res: Response): Promise<void> => {
     try{
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
       await notificationSchema.updateOne({user: filter}, {$push: {read: true}});
         res.status(200).json({
          status: "Success",
            message: "Notification read"
        })
    }
    catch (err) {
        
        res.status(400).json({
            status: "Failed",
            message: "Update Notification failed"
        });
    }
}