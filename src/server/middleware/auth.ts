import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken');

interface CustomRequest extends Request {
  userId: string;
}

function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  jwt.verify(token, 'yoursecretkey', (err: any, decoded: { userId: string; }) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const userId = req.userId;
    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateToken;
