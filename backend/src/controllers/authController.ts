import { NextFunction, Request, Response } from "express";
import * as cookie from "cookie";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { IUser } from "@/interfaces/user";
import { ErrorHandler } from "@/utils/errorHandler";

dotenv.config();

const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up - Create User
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { profilePic, firstName, lastName, username, email, password } =
      req.body;
    // Validate if the each field was provided
    const createdUser = await userService.createUser({
      profilePic,
      firstName,
      lastName,
      username,
      email,
      password,
      socketId: null,
      contacts: [],
    } as IUser);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error: unknown) {
    // Check if it's a Mongoose validation error
    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessage = error.message;
      // Send back the validation error message and a 400 status code
      return next(new ErrorHandler(errorMessage, StatusCodes.BAD_REQUEST)); // Passing to next middleware
    }

    // Handle other known errors
    if (error instanceof ErrorHandler) {
      return next(error); // Pass the ErrorHandler to the error middleware
    }

    // Generic server error for any unexpected errors
    return next(
      new ErrorHandler(
        ERROR.INTERNAL_SERVICE_ERROR,
        StatusCodes.SERVICE_UNAVAILABLE
      )
    );
  }
};

// Sign In
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { userId, username, token } = await userService.signIn(
      email,
      password,
      JWT_SECRET
    );
    // Set cookie with Bearer token
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        maxAge: 3600, // 1 hour
        sameSite: "strict",
      })
    );
    res.status(StatusCodes.OK).json({ userId, username });
  } catch (error) {
    console.log("Error sign in", error);
    // Check if it's a Mongoose validation error
    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessage = error.message;
      // Send back the validation error message and a 400 status code
      return next(new ErrorHandler(errorMessage, StatusCodes.BAD_REQUEST)); // Passing to next middleware
    }

    // Handle other known errors
    if (error instanceof ErrorHandler) {
      return next(new ErrorHandler(error.message, error.statusCode)); // Pass the ErrorHandler to the error middleware
    }

    // Generic server error for any unexpected errors
    return next(
      new ErrorHandler(
        ERROR.INTERNAL_SERVICE_ERROR,
        StatusCodes.SERVICE_UNAVAILABLE
      )
    );
  }
};

// Log Out
export const logOut = (req: Request, res: Response) => {
  try {
    // Clear the cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Expire immediately
        sameSite: "strict",
      })
    );

    res.status(StatusCodes.OK).end();
  } catch (error) {
    throw new ErrorHandler(
      ERROR.INTERNAL_SERVICE_ERROR,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};
