import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";
import { isPasswordValid } from "@/utils/protectPassword";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { IUser } from "@/interfaces/user";
import { ErrorHandler } from "@/utils/errorHandler";
import {
  validateEmailFormat,
  validatePasswordFormat,
} from "@/utils/inputValidations";

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

    const newUser: IUser = {
      profilePic,
      firstName,
      lastName,
      username,
      email,
      password,
      socketId: null,
    };

    const createdUser = await userService.createUser(newUser);
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
        ERROR.ERROR_CREATING_USER,
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

    if (!email || !password) {
      throw new ErrorHandler(
        ERROR.ERROR_EMAIL_PASSWORD_MISSING,
        StatusCodes.BAD_REQUEST
      );
    }

    if (!validateEmailFormat(email)) {
      throw new ErrorHandler(ERROR.ERROR_EMAIL_FORMAT, StatusCodes.BAD_REQUEST);
    }

    if (!validatePasswordFormat(password)) {
      throw new ErrorHandler(
        ERROR.ERROR_PASSWORD_FORMAT,
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new ErrorHandler(ERROR.ERROR_USER_NOT_EXIST, StatusCodes.NOT_FOUND);
    }

    // Check if password match
    const isPasswordAuth = isPasswordValid(password, user.password);
    if (!isPasswordAuth) {
      throw new ErrorHandler(
        ERROR.ERROR_WRONG_CREDENTIALS,
        StatusCodes.UNAUTHORIZED
      );
    }

    // Generate JWT token
    if (!JWT_SECRET) {
      throw new ErrorHandler(
        ERROR.ERROR_INVALID_JWT_KE,
        StatusCodes.BAD_REQUEST
      );
    }
    // Get user id Object
    const userId = user._id as Types.ObjectId;

    const token = jwt.sign({ userId: userId.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });

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

    res.status(StatusCodes.OK).end();
  } catch (error) {
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
