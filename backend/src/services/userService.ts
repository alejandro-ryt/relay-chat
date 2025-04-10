import { ERROR } from "@/constants/relayChat";
import {
  IUserService,
  IUser,
  IUserDocument,
  IContact,
} from "@/interfaces/user";
import User from "@/models/userModel";
import UserRepository from "@/repositories/user";
import { TSearchQuery } from "@/types/searchQuery";
import { ErrorHandler } from "@/utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { isPasswordValid } from "@/utils/protectPassword";
import {
  validateEmailFormat,
  validatePasswordFormat,
} from "@/utils/inputValidations";
import { TUserLoggedRes } from "@/types/auth";

const userRepository = new UserRepository();

export default class UserService implements IUserService {
  async signIn(
    email: string,
    password: string,
    key?: string
  ): Promise<TUserLoggedRes> {
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

    const user = await userRepository.getUserByEmail(email);
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
    if (!key) {
      throw new ErrorHandler(
        ERROR.ERROR_INVALID_JWT_KE,
        StatusCodes.BAD_REQUEST
      );
    }

    const token = jwt.sign({ userId: user._id.toString() }, key, {
      expiresIn: "1h",
    });

    return { username: user.username, userId: user._id.toString(), token };
  }

  async getUserById(id: string): Promise<IUserDocument | null> {
    if (!id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }

    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    return user;
  }

  async searchUsersByQuery(searchText: string, page: number, limit: number) {
    let searchQuery: TSearchQuery = {
      $or: [],
    };
    if (searchText && typeof searchText === "string") {
      searchQuery = {
        $or: [
          { username: { $regex: new RegExp(searchText, "i") } },
          { firstName: { $regex: new RegExp(searchText, "i") } },
          { lastName: { $regex: new RegExp(searchText, "i") } },
        ],
      };
    }

    // Pagination options
    const skip = (Number(page) - 1) * Number(limit);

    return await userRepository.searchUsersByQuery(searchQuery, skip, limit);
  }

  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email }).exec();
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username }).exec();
  }

  async getUserBySocketId(socketId: string): Promise<IUserDocument | null> {
    console.log("getUserBySocketId --> socketId", socketId);
    return await User.findOne({ socketId }).exec();
  }

  async getUserSocketIdByUserId(userId: string): Promise<string | null> {
    const user = await User.findById(new Types.ObjectId(userId)).exec();
    return user ? user.socketId : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = await userRepository.createUser(user);
    return newUser;
  }

  async updateUser(
    id: string,
    updatedUser: Partial<IUser>
  ): Promise<IUser | null> {
    if (!id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const currentUser = await userRepository.getUserById(id);
    if (!currentUser) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const result = await userRepository.updateUser(
      new Types.ObjectId(id),
      updatedUser
    );
    if (!result) {
      throw new ErrorHandler(
        ERROR.ERROR_UPDATING_USER,
        StatusCodes.BAD_REQUEST
      );
    }
    return result;
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const result = await userRepository.deleteUser(new Types.ObjectId(id));
    if (!result) {
      throw new ErrorHandler(
        ERROR.ERROR_DELETING_USER,
        StatusCodes.BAD_REQUEST
      );
    }
  }

  async assignSocketToUser(userId: string, socketId: string): Promise<void> {
    // Check if userId was provided
    if (!userId) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const currentUser = await userRepository.getUserById(userId);
    // Check if user was found
    if (!currentUser) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    // Assign socket id to user
    const updatedUser = await userRepository.updateUser(
      new Types.ObjectId(userId),
      {
        socketId,
      }
    );
    if (!updatedUser) {
      throw new ErrorHandler(
        ERROR.ERROR_UPDATING_USER,
        StatusCodes.BAD_REQUEST
      );
    }
  }

  async addContact(userId: string, contactId: string) {
    if (!userId || !contactId) {
      throw new ErrorHandler(
        `${ERROR.ERROR_ID_REQUIRED}: ${!userId ? "user ID" : "contact ID"}`,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userRepository.getUserById(userId);
    const contact = await userRepository.getUserById(contactId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const existingContact = user.contacts?.find(
      (userContact) =>
        userContact?.contact._id.toString() === contact._id.toString()
    );

    if (existingContact) {
      throw new ErrorHandler(
        ERROR.ERROR_CONTACT_ALREADY_ADDED,
        StatusCodes.BAD_REQUEST
      );
    }
    // Add new contact with 'pending' status
    user.contacts.push({
      contact: contact._id,
      isBlocked: false,
    } as IContact);

    // Add the user to the contact's contact list as well
    contact.contacts.push({
      contact: user._id,
      isBlocked: false,
    } as IContact);

    await userRepository.updateContact(user, contact);
  }

  // Remove a contact
  async removeContact(userId: string, contactId: string) {
    if (!userId || !contactId) {
      throw new ErrorHandler(
        `${ERROR.ERROR_ID_REQUIRED}: ${!userId ? "user ID" : "contact ID"}`,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userRepository.getUserById(userId);
    const contact = await userRepository.getUserById(contactId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    // Remove contact from user
    user.contacts = user.contacts.filter(
      (contactUser) =>
        contactUser.contact._id.toString() !== contact._id.toString()
    );
    // Remove contact on the other side
    contact.contacts = contact.contacts.filter(
      (contactUser) =>
        contactUser.contact._id.toString() !== user._id.toString()
    );
    await userRepository.updateContact(user, contact);
  }

  // Block a contact
  async blockContact(userId: string, contactId: string) {
    if (!userId || !contactId) {
      throw new ErrorHandler(
        `${ERROR.ERROR_ID_REQUIRED}: ${!userId ? "user ID" : "contact ID"}`,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userRepository.getUserById(userId);
    const contact = await userRepository.getUserById(contactId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    // Block user's contact
    user.contacts = user.contacts.map((userContact) => {
      if (userContact.contact._id.toString() === contact._id.toString()) {
        return {
          ...userContact,
          isBlocked: true,
        };
      }
      return userContact;
    });

    // Block contact's contact
    contact.contacts = user.contacts.map((userContact) => {
      if (userContact.contact._id.toString() === user._id.toString()) {
        return {
          ...userContact,
          isBlocked: true,
        };
      }
      return userContact;
    });

    await userRepository.updateContact(user, contact);
  }
}
