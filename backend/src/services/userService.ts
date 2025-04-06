import { IUserService, IUser, IUserDocument } from "@/interfaces/user";
import User from "@/models/userModel";
import { Types } from "mongoose";

export default class UserService implements IUserService {
  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(new Types.ObjectId(id)).exec();
  }

  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email }).exec();
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username }).exec();
  }

  async getUserBySocketId(socketId: string): Promise<IUserDocument | null> {
    return await User.findOne({ socketId }).exec();
  }

  async getUserSocketIdByUserId(userId: string): Promise<string | null> {

    const user = await User.findOne({ _id: new Types.ObjectId(userId) }).exec();
    return user ? user.socketId : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return await newUser.save();
  }

  async updateUser(
    id: string,
    updatedUser: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      { ...updatedUser, updatedAt: new Date().toISOString() },
      { new: true } // return the updated user
    ).exec();
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(new Types.ObjectId(id)).exec();
    return result !== null;
  }
}
