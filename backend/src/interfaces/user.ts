import { TUserLoggedRes } from "@/types/auth";
import { SearchQuery, UsersPagination } from "@/types/searchQuery";
import { Document, Types } from "mongoose";

export interface IContact {
  contact: Types.ObjectId; // Reference to another user
  isBlocked: Boolean;
}
export interface IUser {
  profilePic?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  contacts: IContact[];
  socketId: string | null;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

export interface IUserService {
  signIn(email: string, password: string, key: string): Promise<TUserLoggedRes>;
  getUserById(id: string): Promise<IUserDocument | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserBySocketId(socketId: string): Promise<IUserDocument | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: string, updatedUser: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<void>;
  assignSocketToUser(userId: string, socketId: string): Promise<void>;
  addContact(userId: string, contactId: string): Promise<void>;
  removeContact(userId: string, contactId: string): Promise<void>;
  blockContact(userId: string, contactId: string): Promise<void>;
}

export interface IUserRepository {
  searchUsersByQuery(
    searchQuery: SearchQuery,
    skip: number,
    limit: number
  ): Promise<UsersPagination>;
  getUserById(id: string): Promise<IUserDocument | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserBySocketId(socketId: string): Promise<IUserDocument | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(
    id: Types.ObjectId,
    updatedUser: Partial<IUser>
  ): Promise<IUserDocument | null>;
  deleteUser(id: Types.ObjectId): Promise<IUserDocument | null>;
  updateContact(userId: IUserDocument, contactId: IUserDocument): Promise<void>;
}
