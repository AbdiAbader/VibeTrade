import { Request, Response } from 'express';
import reviewSchema from '../models/review.schema';

export const createReview = async (req: Request, res: Response): Promise<void> => {
       try {
        await reviewSchema.create(req.body);
        res.status(200).json({
        status: "Success"
        });
    } catch (err) {
        res.status(400).json({
        status: "Failed",
        message: err
        });

       }};
