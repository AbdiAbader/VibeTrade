import mongoose from "mongoose";
import { Request, Response } from "express";
import { ClientSession } from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import contactusSchema from "../models/contactus.schema";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const createContactus = async (
    req: Request,
    res: Response
): Promise<void> => {
    
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
        const contactus = await contactusSchema.create({
            
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await session.commitTransaction();
        res.status(200).json({
            status: "success",
            data: contactus
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

