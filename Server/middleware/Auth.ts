import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";


dotenv.config();

export const authorize = (req: Request,res: Response, next: NextFunction) => {
 
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token) {
        return res.status(401).json({
        message: "No token provided",
        });
    }
    
    try {
      
        jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({
            message: "Invalid token",
            });
        }
        req.body.userid = decoded;
        next();
        });
    } catch (err) {
        return res.status(500).json({
        message: "Something went wrong",
        });
    }


};

