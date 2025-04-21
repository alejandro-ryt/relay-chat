import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ErrorHandler } from "@/utils/errorHandler";
import { ERROR } from "@/constants/relayChat";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let customError: ErrorHandler;

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    customError = new ErrorHandler(err.message, 400);
  } 
  // Our custom ErrorHandler
  else if (err instanceof ErrorHandler) {
    customError = err;
  } 
  // Generic Error
  else if (err instanceof Error) {
    customError = new ErrorHandler(err.message, 500);
  } 
  // Unknown error (non-Error thrown)
  else {
    customError = new ErrorHandler(ERROR.INTERNAL_SERVICE_ERROR, 500);
  }

  res.status(customError.statusCode).json({
    success: false,
    error: customError.message,
  });
};
