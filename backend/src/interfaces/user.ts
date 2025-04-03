import { Document, Types } from "mongoose";

export interface IUser {
  profilePic: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  socketId: string | null;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

export interface IUserService {
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserBySocketId(socketId: string): Promise<IUserDocument | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: string, updatedUser: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
}
