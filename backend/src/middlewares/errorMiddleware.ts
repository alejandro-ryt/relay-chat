import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@/utils/errorHandler";
import { ERROR } from "@/constants/relayChat";

export const errorMiddleware = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = ERROR.INTERNAL_SERVICE_ERROR as string;

  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message as string;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
