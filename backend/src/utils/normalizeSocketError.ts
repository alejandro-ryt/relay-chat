import mongoose from "mongoose";
import { ErrorHandler } from "@/utils/errorHandler";
import { ERROR } from "@/constants/relayChat";
import { StatusCodes } from "http-status-codes";

export const normalizeSocketError = (err: unknown): ErrorHandler => {
  if (err instanceof mongoose.Error.ValidationError) {
    return new ErrorHandler(err.message, StatusCodes.BAD_REQUEST);
  }

  if (err instanceof ErrorHandler) {
    return err;
  }

  if (err instanceof Error) {
    return new ErrorHandler(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return new ErrorHandler(ERROR.INTERNAL_SERVICE_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
};
