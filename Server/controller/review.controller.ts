import { Request, Response } from 'express';
import reviewSchema from '../models/review.schema';
import { ClientSession } from 'mongoose';
import notificationSchema from '../models/notification.schema';
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
         const disliked = review.dislikes.find((dislike: any) => dislike.user == userId);
         if (disliked) {
            review.updateOne({ $pull: { dislikes: disliked } }).exec();
        }
        
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
        const liked = review.likes.find((like: any) => like.user == userId);
        if (liked) {
            review.updateOne({ $pull: { likes: liked } }).exec();
        }
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
    const session: ClientSession = await reviewSchema.startSession();
    session.startTransaction();
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
            }).session(session);


           
            const replied: any = await reviewSchema.findById(req.params.id).populate('user').populate('product').populate('replies.user');
             if (replied.user._id.toString() !== userId) {
                console.log(replied.user._id.toString());
                console.log(userId);
              
            await notificationSchema.create(
                [{
                    user: replied.user,
                    message: "You have a new reply on your review " + replied.product.name + ' by ' + replied.replies[replied.replies.length - 1].user.name,
                    title: "New reply"
                }], 
                { session: session });
            }
            await session.commitTransaction();
    
            res.status(200).json({
                status: "Success",
            })
       
            }
            catch (err) {
        await session.abortTransaction();
                res.status(400).json({
                    status: "Failed",
                    message: "Create reply failed"
                });
            }
            finally {
                session.endSession();
            }
         
        }
    
export const repliesliked = async (req: Request, res: Response): Promise<void> => {
    try {
         const token = req.headers.authorization?.split(' ')[1];
            const decodedToken: any = jwt.verify(token!, JWT_SECRET);
            const userId = decodedToken.userId;
            const filter = { _id: userId };

            const review: any = await reviewSchema.findById(req.params.id);
            const reply: any = review.replies.find((reply: any) => reply._id == req.body.id);
            const like = {
                user: filter,
                like: true
            }
            const liked = reply.likes.find((like: any) => like.user == filter._id);
            const disliked = reply.dislikes.find((dislike: any) => dislike.user == filter._id);
            if (disliked) {
              await  reviewSchema.updateOne({ _id: req.params.id, "replies._id": req.body.id }, { $pull: { "replies.$.dislikes": disliked } }).exec();
            }
          await  reviewSchema.updateOne({ _id: req.params.id, "replies._id": req.body.id }, { $pull: { "replies.$.likes": liked } }).exec();
            if (liked) {
                res.status(200).json({
                    status: "Success",
                    message: "Like removed"
                })
            }
            else {
               await reviewSchema.updateOne({ _id: req.params.id, "replies._id": req.body.id }, { $push: { "replies.$.likes": like } }).exec();
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

export const repliesdisliked = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, JWT_SECRET);
        const userId = decodedToken.userId;
        const filter = { _id: userId };

        const review: any = await reviewSchema.findById(req.params.id);
        const reply: any = review.replies.find((reply: any) => reply._id == req.body.id);
        const dislike = {
            user: filter,
            dislike: true
        }
        const disliked = reply.dislikes.find((dislike: any) => dislike.user == filter._id);
        const liked = reply.likes.find((like: any) => like.user == filter._id);
        if (liked) {
            await reviewSchema.updateOne({ _id: req.params.id, "replies._id": req.body.id }, { $pull: { "replies.$.likes": liked } }).exec();
        }
        await reviewSchema.updateOne({ _id: req.params.id, "replies._id": req.body.id }, { $pull: { "replies.$.dislikes": disliked } }).exec();
        if (disliked) {
            res.status(200).json({
                status: "Success",
                message: "Dislike removed"
            })
        }
        else {
            await reviewSchema.updateOne({ _id: req.params.id, "replies._id": req.body.id }, { $push: { "replies.$.dislikes": dislike } }).exec();
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
