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
      ERROR.INTERNAL_SERVICE_ERROR,
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
    if (!currentUser) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    const { profilePic, firstName, lastName, username, email, password } =
      req.body;
    const updatedUser: Partial<IUser> = {
      profilePic,
      firstName,
      lastName,
      username,
      email,
      password,
    };

    const result = await userService.updateUser(req.params.id, updatedUser);
    if (!result) {
      throw new ErrorHandler(
        ERROR.ERROR_UPDATING_USER,
        StatusCodes.BAD_REQUEST
      );
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

// Add Contact
export const addContact = async (req: Request, res: Response) => {
  try {
    const { userId, contactId } = req.params;
    if (!userId || !contactId) {
      throw new ErrorHandler(
        `${ERROR.ERROR_ID_REQUIRED}: ${!userId ? "user ID" : "contact ID"}`,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userService.getUserById(userId);
    const contact = await userService.getUserById(contactId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    // Check if contact is already added
    const existingContact = user.contacts?.find(
      (userContact) => userContact?.contact.id === contact.id
    );

    if (existingContact) {
      throw new ErrorHandler(
        ERROR.ERROR_CONTACT_ALREADY_ADDED,
        StatusCodes.BAD_REQUEST
      );
    }
    await userService.addContact(user, contact);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log("adding contact --> error", error);
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.INTERNAL_SERVICE_ERROR,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};

// Remove Contact
export const removeContactController = async (req: Request, res: Response) => {
  try {
    const { userId, contactId } = req.params;
    if (!userId || !contactId) {
      throw new ErrorHandler(
        `${ERROR.ERROR_ID_REQUIRED}: ${!userId ? "user ID" : "contact ID"}`,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userService.getUserById(userId);
    const contact = await userService.getUserById(contactId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    await userService.removeContact(user, contact);

    res.status(StatusCodes.OK).end();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.INTERNAL_SERVICE_ERROR,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};

// Block Contact
export const blockContactController = async (req: Request, res: Response) => {
  try {
    const { userId, contactId } = req.params;
    if (!userId || !contactId) {
      throw new ErrorHandler(
        `${ERROR.ERROR_ID_REQUIRED}: ${!userId ? "user ID" : "contact ID"}`,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userService.getUserById(userId);
    const contact = await userService.getUserById(contactId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    await userService.blockContact(user, contact);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log("blocking contact --> error", error);
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.INTERNAL_SERVICE_ERROR,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};

// Search users
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { searchText, page = 1, limit = 10 } = req.query;

    if (!searchText || typeof searchText !== "string") {
      res.status(400).json({
        error: "searchText query parameter is required and should be a string",
      });
    }

    // Build search query
    const searchQuery = {
      $or: [
        { username: { $regex: new RegExp(searchText as string, "i") } },
        { firstName: { $regex: new RegExp(searchText as string, "i") } },
        { lastName: { $regex: new RegExp(searchText as string, "i") } },
      ],
    };
    console.log("searchQuery type", typeof searchQuery);

    // Pagination options
    const skip = (Number(page) - 1) * Number(limit);
    const { users, totalCount } = await userService.searchUsersByQuery(
      searchQuery,
      skip,
      Number(limit)
    );

    res.status(200).json({
      totalCount,
      page: Number(page),
      totalPages: Math.ceil(totalCount / Number(limit)),
      users,
    });
  } catch (error) {
    console.error("Error search users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
