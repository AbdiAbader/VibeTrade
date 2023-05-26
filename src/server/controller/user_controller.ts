import { Request, Response } from 'express';
import userSchema from '../models/userSchema';

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

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userSchema.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: user
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err
    });
  }
};
