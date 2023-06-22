import { Request, Response } from 'express';
import userSchema from '../models/user.schema';
import reviewSchema from '../models/review.schema';
import orderSchema from '../models/order.schema';
import bcrypt from 'bcrypt';
import { ClientSession } from 'mongoose';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';






export const createUser = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
         
    // Create a new user
    const newUser = new userSchema({
       name,
       email,
       password: hashedPassword,
   });
    await userSchema.create(newUser);
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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userSchema.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;


      const user: any  = await userSchema.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
    
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ 
        message: 'Login successful',
        token,
       });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
}
};

export const getbyID = async (req: Request, res: Response): Promise<void> => {
  const session: ClientSession = await userSchema.startSession();

  try {
   
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken: any = jwt.verify(token!, JWT_SECRET);
    const userId = decodedToken.userId;
    const filter = { _id: userId };

    const data = await userSchema.findOne(filter).session(session);
    
     res.status(200).json({
      data
      
    })
 
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


export const updateUserById = async (req: Request, res: Response): Promise<void> => {
   const client: ClientSession = await userSchema.startSession();
   await client.startTransaction();
  try {
   const token = req.headers.authorization?.split(' ')[1];
    const decodedToken: any = jwt.verify(token!, JWT_SECRET);
    const userId = decodedToken.userId;
    const filter = { _id: userId };
    

    
    await userSchema.findOneAndUpdate(filter, { $set: req.body }).session(client);

    await client.commitTransaction();
    res.status(200).json({
      status: "success"
    })
  }
  catch(err){
    await client.abortTransaction();
    res.status(400).json({
      status: "Failed",
      massage: err
    });
  }
  finally{
    await client.endSession();
  }
}
export const checkToken = async (req: Request, res: Response): Promise<void> => {
   
   const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Token not found' });
    }
    try {
      jwt.verify(token!, JWT_SECRET);
      res.status(200).json({
        message: 'Token is valid'
      });
    }
    catch (err) {
      res.status(400).json({
        message: 'Invalid token'
      });
    }
  }

  export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  
    try {
      const userId = req.params.id;
  
      await orderSchema.deleteMany({user: userId});

      await reviewSchema.deleteMany({ user: userId });
      
      await userSchema.findByIdAndDelete(userId);


      res.status(200).json({ message: 'User updated successfully' });
  
  
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });  
    }
  };
 
export const updatebyid = async (req: Request, res: Response): Promise<void> => {
  await userSchema.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ message: 'User updated successfully' });
};



