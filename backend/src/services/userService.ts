import { ERROR } from "@/constants/relayChat";
import {
  IUserService,
  IUser,
  IUserDocument,
  IContact,
} from "@/interfaces/user";
import User from "@/models/userModel";
import { ErrorHandler } from "@/utils/errorHandler";
import { StatusCodes } from "http-status-codes";

export default class UserService implements IUserService {
  async getUserById(id: string): Promise<IUserDocument | null> {
    return await User.findById(id).exec();
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
    const result = await User.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async addContact(user: IUserDocument, contact: IUserDocument) {
    // Add new contact with 'pending' status
    user.contacts.push({
      contact: contact._id,
      isBlocked: false,
    } as IContact);
    await user.updateOne({ $set: { contacts: user.contacts } });

    // Optionally, add the user to the contact's contact list as well
    contact.contacts.push({
      contact: user._id,
      isBlocked: false,
    } as IContact);
    await contact.updateOne({ $set: { contacts: contact.contacts } });
  }

  // Remove a contact
  async removeContact(user: IUserDocument, contact: IUserDocument) {
    // Remove contact from user
    user.contacts = user.contacts.filter(
      (contactUser) => contactUser.contact._id.toString() !== contact.id
    );
    await user.updateOne({ $set: { contacts: user.contacts } });

    // Remove contact on the other side
    contact.contacts = contact.contacts.filter(
      (contactUser) => contactUser.contact._id.toString() !== user.id
    );
    await contact.updateOne({ $set: { contacts: contact.contacts } });
  }

  // Block a contact
  async blockContact(user: IUserDocument, contactUser: IUserDocument) {
    const contact = user.contacts.find(
      (userContact) => userContact.contact._id.toString() === contactUser.id
    );

    if (!contact) {
      throw new ErrorHandler(ERROR.CONTACT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    contact.isBlocked = true;
    await user.updateOne({ $set: { contacts: user.contacts } });

    // Block the user on the other side as well
    if (contactUser) {
      const reverseContact = contactUser.contacts.find(
        (userContact) => userContact.contact._id.toString === user.id
      );

      if (reverseContact) {
        reverseContact.isBlocked = true;
        await contactUser.save();
        await contactUser.updateOne({
          $set: { contacts: contactUser.contacts },
        });
      }
    }
  }
}
