import { Document, Types } from "mongoose";

export interface IUser {
  chatPic?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserService {
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: string, updatedUser: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
}
