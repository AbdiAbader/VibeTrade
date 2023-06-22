import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";


dotenv.config();

export const authorize = (req: Request,res: Response, next: NextFunction) => {

    const bypassPort = 4200;
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    const allowedPort = 4200; // Replace with the port of your Angular app
  
  // Extract the requesting origin from the 'Origin' header
  const requestingOrigin = req.headers.origin;

  if (requestingOrigin && requestingOrigin.endsWith(`:${allowedPort}`)) {
    // Bypass authentication for requests from the specific port
    console.log('Bypassing authentication for port:', allowedPort);
    next();
  } else {
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

}