import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { IUser } from "@/interfaces/user";
import { ErrorHandler } from "@/utils/errorHandler";
import { Socket } from "socket.io";
import { lookUpForPendingInvites } from "./chatController";

const userService = new UserService();

// GET user by id
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log("Error get user by Id", error);
    next(error);
  }
};

// PUT update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { profilePic, firstName, lastName, username, email, password } =
      req.body;
    // Call Validate id from params and data from req.body
    const result = await userService.updateUser(id, {
      profilePic,
      firstName,
      lastName,
      username,
      email,
      password,
    } as Partial<IUser>);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log("Error update user by Id", error);
    next(error);
  }
};

export const assignSocketIdByUserId = async (
  userId: string,
  socket: Socket
) => {
  try {
    await userService.assignSocketToUser(userId, socket.id);
    lookUpForPendingInvites(socket, userId);
  } catch (error) {
    console.log("Error assigning socket by user Id", error);
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
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log("Error delete user by Id", error);
    next(error);
  }
};

// Add Contact
export const addContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, contactId } = req.params;
    await userService.addContact(userId, contactId);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log("adding contact --> error", error);
    next(error);
  }
};

// Remove Contact
export const removeContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, contactId } = req.params;
    await userService.removeContact(userId, contactId);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log("Error removing contact", error);
    next(error);
  }
};

// Block Contact
export const blockContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, contactId } = req.params;
    await userService.blockContact(userId, contactId);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log("blocking contact --> error", error);
    next(error);
  }
};

// Search users
export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchText, page = 1, limit = 10 } = req.query;
    const { users, totalCount } = await userService.searchUsersByQuery(
      searchText as string,
      Number(page),
      Number(limit)
    );
    res.status(StatusCodes.OK).json({
      totalCount,
      page: Number(page),
      totalPages: Math.ceil((totalCount as number) / Number(limit)),
      users,
    });
  } catch (error) {
    console.error("Error search users", error);
    next(error);
  }
};
