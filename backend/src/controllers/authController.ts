import { NextFunction, Request, Response } from "express";
import * as cookie from "cookie";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import UserService from "@/services/userService";
import { IUser } from "@/interfaces/user";

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
    next(error);
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
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(StatusCodes.OK)
      .json({ userId, username });
  } catch (error) {
    console.log("Error sign in", error);
    next(error);
  }
};

// Log Out
export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // Clear the cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Expire immediately
      sameSite: "strict",
    });

    await userService.updateUser(id, {
      socketId: null,
    });

    res.status(StatusCodes.OK).end();
  } catch (error) {
    next(error);
  }
};
