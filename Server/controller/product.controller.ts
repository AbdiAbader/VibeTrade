import { Request, Response } from "express";
import productSchema from "../models/product.schema";
import orderitemSchema from "../models/orderitems.schema";
import mongoose from "mongoose";

export const createProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const product = await productSchema.create(req.body);
        res.status(200).json({
          status: "success",
          data: product,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Failed to create product.",
          error: error,
        });
      }
    };

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productSchema.find();
    res.status(200).json({
      products,
    });

  }
  catch (err) {
    res.status(400).json({
      status: "Failed",
      massage: err
    });

  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
     try {
        const product = await productSchema.findById(req.params.id);
        res.status(200).json({
          status: "success",
          data: product,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Failed to get product.",
          error: error,
        });
      }
     }

     export const updateProduct = async (req: Request, res: Response): Promise<void> => {
      try {
        const filter = { _id: req.params.id }; 
    
        const update = req.body;
    
        const updatedProduct = await productSchema.findOneAndUpdate(filter, update, { new: true, runValidators: true});
    
        res.status(200).json({
          status: "success",
          data: updatedProduct,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Failed to update product.",
          error: error,
        });
      }
    };
    
    export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
      const session = await mongoose.startSession();
      session.startTransaction();
       try {
       
        const productfilter = { _id: req.params.id };
        const deletedProduct = await productSchema.findOneAndDelete(productfilter).session(session);
      
         await orderitemSchema.deleteMany({product: req.params.id}).session(session);
         await session.commitTransaction();

        res.status(200).json({
          status: "success",
          data: deletedProduct,
        });
      } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
          
          status: "error",
          message: "Failed to delete product.",
          error: error,
        });
      }
      finally {
        session.endSession();
      }

       }