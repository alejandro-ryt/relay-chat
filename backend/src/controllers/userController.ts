import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { IUser } from "@/interfaces/user";
import { ErrorHandler } from "@/utils/errorHandler";

const userService = new UserService();

// GET user by id
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.ERROR_CREATING_USER,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};

// PUT update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const currentUser = await userService.getUserById(req.params.id);
    const { profilePic, firstName, lastName, username, email, password } =
      req.body;
    const updatedUser: Partial<IUser> = {
      ...currentUser,
      profilePic,
      firstName,
      lastName,
      username,
      email,
      password,
    };

    const result = await userService.updateUser(req.params.id, updatedUser);
    if (!result) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.ERROR_UPDATING_USER,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};

// DELETE user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const result = await userService.deleteUser(req.params.id);
    if (!result) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({ message: "User deleted" });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.ERROR_DELETING_USER,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};
