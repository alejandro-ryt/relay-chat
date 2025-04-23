import { IUser, IUserDocument, IUserRepository } from "@/interfaces/user";
import User from "@/models/userModel";
import { TSearchQuery, TUsersPagination } from "@/types/searchQuery";
import { Types } from "mongoose";

export default class UserRepository implements IUserRepository {
  async searchUsersByQuery(
    query: TSearchQuery,
    skip: number,
    limit: number
  ): Promise<TUsersPagination> {
    const users = await User.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select("profilePic firstName lastName username email socketId")
      .populate({
        path: "contacts.contact",
        select: "firstName lastName email username profilePic socketId",
      })
      .lean()
      .exec();

    const totalCount = await User.countDocuments(query);
    return { users, totalCount };
  }
  async getUserById(id: string): Promise<IUserDocument | null> {
    return await User.findById(new Types.ObjectId(id))
      .select("firstName lastName email username profilePic contacts socketId")
      .populate({
        path: "contacts.contact",
        select: "firstName lastName email username profilePic socketId",
      })
      .lean()
      .exec();
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
    const user = await User.findById(new Types.ObjectId(userId))
      .select("socketId")
      .exec();
    return user ? user.socketId : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return await newUser.save();
  }

  async updateUser(
    id: Types.ObjectId,
    updatedUser: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return await User.findByIdAndUpdate(
      id,
      { ...updatedUser, updatedAt: new Date().toISOString() },
      { new: true } // return the updated user
    ).exec();
  }

  async deleteUser(id: Types.ObjectId): Promise<IUserDocument | null> {
    return await User.findByIdAndDelete(id).exec();
  }

  async updateContact(
    user: IUserDocument,
    contact: IUserDocument
  ): Promise<void> {
    // Update user Contacts
    await User.updateOne(
      { _id: user._id },
      { $set: { contacts: user.contacts } }
    );

    // Update contact's contacts
    await User.updateOne(
      { _id: contact._id },
      { $set: { contacts: contact.contacts } }
    );
  }
}
