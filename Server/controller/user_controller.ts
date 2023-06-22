import { Request, Response } from 'express';
import userSchema from '../models/user.schema';
import bcrypt from 'bcrypt';
import { ClientSession } from 'mongoose';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Mailjet from 'node-mailjet';
import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';

dotenv.config();



const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const mailjet = new Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE

});



export const createUser = async (req: Request, res: Response): Promise<void> => {

  
  
  try {

    const gpin = Math.floor(Math.random() * 10000) + 1000;

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new userSchema({
       name,
       email,
       password: hashedPassword,
       pin: gpin,
   });
    await userSchema.create(newUser);

(async () => {
  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: 'ethioafri2@gmail.com',
        },
        To: [
          {
            Email: email,
          },
        ],
       
        Subject: 'Your registered successfully to VibeTrade!' + name,
        HTMLPart: '<h1>Your pin is: </h1>' + gpin,
        TextPart: 'VibeTrade!',
      },
    ],
  };

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
          .post('send', { version: 'v3.1' })
          .request(data);

  const { Status } = result.body.Messages[0];
})();
    res.status(200).json({
      status: "Success"
    });

  } catch (err: any) {
    res.status(400).json({
      status: "Failed",
      message: "Email Already Exist"
    });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;


      const user: any  = await userSchema.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.verified === false) {
        return res.status(403).json({ message: 'Please verify your email to login' });
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
    const user: any = await userSchema.findOne(filter).session(client);
    if (req.body.password) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }
      else {  
        req.body.password = await bcrypt.hash(req.body.new_password, 10);
      }


    }
    

    
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


export const verifyPin = async (req: Request, res: Response): Promise<void> => {
  const client: ClientSession = await userSchema.startSession();
  await client.startTransaction();
  try {
    const { email, pin } = req.body;
  
   const user: any = await userSchema.findOne({ email }).session(client);

 
    if (pin == user.pin) {
      console.log("pin matched");
      await userSchema.findOneAndUpdate({ email }, { $set: { pin: 0, verified: true } }).session(client);

      await client.commitTransaction();
      res.status(200).json({
        status: "success"
      })
    }
    else {
      res.status(401).json({
        status: "Failed",
        message: "Invalid Pin"
      })
    }
  }
  catch (err) {
    await client.abortTransaction();
    res.status(400).json({
      status: "Failed",
      massage: err
    });
  }
  finally {
    await client.endSession();
  }
}


export const getcode = async (req: Request, res: Response) => {
   try {
    const email = req.body.email;

    const result = await userSchema.findOne({ email });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    const pin = Math.floor(Math.random() * 10000) + 1000;

(async () => {
  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: 'ethioafri2@gmail.com',
        },
        To: [
          {
            Email: email,
          },
        ],
       
        Subject: '   VibeTrade-PassWord ',
        HTMLPart: '<h1 color="red">Your pin is: </h1>' + pin+'<h1>Dont Share it with anyone</h1>'+'<h1> If you did not request this, please ignore this email.</h1>',
        TextPart: 'VibeTrade!',
      },
    ],
  };

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
          .post('send', { version: 'v3.1' })
          .request(data);

  const { Status } = result.body.Messages[0];
})();
    await userSchema.findOneAndUpdate({ email }, { $set: { pin } });
    console.log(pin);

    res.status(200).json({
      status: "success",
      pin})

  }catch (err) {
    res.status(400).json({
      status: "Failed",
      massage: err
    });
  }
}

  export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const client: ClientSession = await userSchema.startSession();
    await client.startTransaction();
    try {
      const { email, password, pin } = req.body;
      const user: any = await userSchema.findOne({ email }).session(client);
      if (!user)
      {
        res.status(401).json({
          status: "Failed",
          message: "Invalid email"
        })
        return;

      }
      if (pin == user.pin) {
        await userSchema.findOneAndUpdate({ email }, { $set: { password: await bcrypt.hash(password, 10), pin: 0 } }).session(client);
       
      await client.commitTransaction();
        res.status(200).json({
          status: "success"
        })
      }
      else{
        res.status(401).json({
          status: "Failed",
          message: "Invalid Pin"
        })
      }

    
    }
    catch (err) {
      await client.abortTransaction();
      res.status(400).json({
        status: "Failed",
        massage: err
      });
    }
    finally {
      await client.endSession();
    }
  }

  export const paydemo = async (req: Request, res: Response): Promise<void> => {

     try{
      console.log(req.body.total);

      const token = req.headers.authorization?.split(' ')[1];
      console.log(token);
      const decodedToken: any = jwt.verify(token!, JWT_SECRET);
      const userId = decodedToken.userId;
      const filter = { _id: userId };
      const user: any = await userSchema.findOne(filter);
      const email = user.email;
      const total = req.body.total;



(async () => {
  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: 'ethioafri2@gmail.com',
        },
        To: [
          {
            Email: email,
          },
        ],
       
        Subject: '   VibePay ',
        HTMLPart: '<img src="https://cdn-icons-png.flaticon.com/128/677/677069.png"><br><h1 style="font-size: 2rem; font-weight: bold; color: #333;">You have paid: ' +total+'</h1> <br><h1 style="font-size: 1.5rem; color: #333;">Thank you for using VibePay</h1>',
        TextPart: 'VibeTrade!',
      },
    ],
  };

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
          .post('send', { version: 'v3.1' })
          .request(data);

  const { Status } = result.body.Messages[0];
})();

    res.status(200).json({
      status: "success",
    })

     }
     catch(err){
      res.status(400).json({
        status: "Failed",
        massage: err
      });
     }
  }