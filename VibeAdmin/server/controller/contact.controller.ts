import { Request, Response } from "express";
import contactus from "../models/contact.schema";

export const getrequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await contactus.find();
        res.status(200).json({
        requests,
        });
    } catch (err) {
        res.status(400).json({
        status: "Failed",
        message: err
        });
    }
    
}