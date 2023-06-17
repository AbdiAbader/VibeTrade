import { Request, Response } from 'express';
import reviewSchema from '../models/review.schema';
import { ClientSession } from 'mongoose';

import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import exp from 'constants';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const createReview = async (req: Request, res: Response): Promise<void> => {
try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
        console.log(filter);

        await reviewSchema.create(
            {
                user: filter,
                product: req.body.product,
                content: req.body.content,
                rating: req.body.rating,
                replies: req.body.replies,
                
                
            });
            res.status(200).json({
                status: "Success",
            })
       
            }
            catch (err) {
        
                res.status(400).json({
                    status: "Failed",
                    message: "Create review failed"
                });
            }
         
        }

export const getReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = req.params.id;
        const review = await reviewSchema.find({product: product}).populate('user').populate('product').populate('replies.user');
     
    
        res.status(200).json({
            status: "Success",
            data: review
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            message: "Get review failed"
        });
    }
}

export const updatelike = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
      
        
        const review: any = await reviewSchema.findById(req.params.id);
        const like = {
            user: filter,
            like: true
        }
      
        const liked = review.likes.find((like: any) => like.user == userId);
        review.updateOne({ $pull: { likes: liked } }).exec();
        if (liked) {
            res.status(200).json({
                status: "Success",
                message: "Like removed"
            })
        }
        else {
            review.updateOne({ $push: { likes: like } }).exec();
            res.status(200).json({
                status: "Success",
                message: "Like added"
            })
        }


    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: "Update like failed"
        });
    }
}

export const updatedislike = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
      
        
        const review: any = await reviewSchema.findById(req.params.id);
        const dislike = {
            user: filter,
            dislike: true
        }
      
        const disliked = review.dislikes.find((dislike: any) => dislike.user == userId);
        review.updateOne({ $pull: { dislikes: disliked } }).exec();
        if (disliked) {
            res.status(200).json({
                status: "Success",
                message: "Dislike removed"
            })
        }
        else {
            review.updateOne({ $push: { dislikes: dislike } }).exec();
            res.status(200).json({
                status: "Success",
                message: "Dislike added"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: "Update dislike failed"
        });
    }
}


export const createReply = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };
        console.log(filter);

        await reviewSchema.updateOne(
            {_id: req.params.id},
            {
                $push: {
                    replies: {
                        user: filter,
                        content: req.body.content
                    }
                }
            });
            res.status(200).json({
                status: "Success",
            })
       
            }
            catch (err) {
        
                res.status(400).json({
                    status: "Failed",
                    message: "Create reply failed"
                });
            }
         
        }
    
