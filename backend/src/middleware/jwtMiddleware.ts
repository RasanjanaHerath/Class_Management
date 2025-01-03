import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";

// dotenv.config();

// Add a custom property 'user' to the 'Request' type definition
declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        userRole: string;
      };
    }
  }
}


export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret' )
    console.log('Decoded token here:', decoded); // Log the decoded token
    req.user = decoded as { userId: number; userRole: string };
    

    if (!req.user.userRole || !req.user.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};