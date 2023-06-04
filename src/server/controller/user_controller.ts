import { Request, Response } from 'express';
import userSchema from '../models/user.schema';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await userSchema.create(req.body);
    res.status(200).json({
      status: "Success"
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {

}
  

