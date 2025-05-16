import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.verifiedAdmin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
