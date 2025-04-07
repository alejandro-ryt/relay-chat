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
  getUserById(id: string): Promise<IUserDocument | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserBySocketId(socketId: string): Promise<IUserDocument | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: Types.ObjectId, updatedUser: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
  addContact(userId: IUserDocument, contactId: IUserDocument): Promise<void>;
  removeContact(userId: IUserDocument, contactId: IUserDocument): Promise<void>;
  blockContact(userId: IUserDocument, contactId: IUserDocument): Promise<void>;
}
