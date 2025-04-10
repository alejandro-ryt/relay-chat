import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "@/utils/errorHandler";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  userId: string;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(
        new ErrorHandler(
          "Authentication token is missing",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    if (!JWT_SECRET) {
      return next(
        new ErrorHandler(
          "Authentication token is missing",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = {
      userId: decoded.userId,
    };

    next(); // move to the next middleware or route handler
  } catch (err) {
    return next(
      new ErrorHandler("Invalid or expired token", StatusCodes.UNAUTHORIZED)
    );
  }
};
