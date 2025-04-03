import { Socket } from "socket.io";
// import User from "@/models/userModel";
import UserService from "@/services/userService";
import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import { IUser, IUserDocument } from "@/interfaces/user";
import { IChat, IChatService, IChatDocument } from "@/interfaces/chat";
import { IMessage, IMessageDocument } from "@/interfaces/message";
import { Types } from "mongoose";

const userService = new UserService();

class ChatService implements IChatService {
  // Get all chats with last message by user id
  public async findChatsByUserId(userId: string) {
    // Return the populated type directly
    return await Chat.find({ members: userId })
      .populate("members", "id firstName lastName username email")
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 }, // Get the most recent message
      })
      .exec();
  }

  // Find chat by name
  public async findByChatName(chatName: string): Promise<IChatDocument | null> {
    return await Chat.findOne({ name: chatName }).exec();
  }
  // Find and/or save chat
  public async saveChat(
    chatName: string,
    type: "direct" | "group",
    userId: string
  ): Promise<IChatDocument> {
    // Find chat by name
    let chat = await Chat.findOne({ name: chatName }).exec();

    // Find or save chat
    if (chat) {
      // Check if the user already joined the chat to avoid duplicates
      const memberFound = chat.members.find((id) => id.toString() === userId);

      if (!memberFound) {
        // Add the user if not exist
        const userIdObj = new Types.ObjectId(userId);
        chat.members.push(userIdObj);
        await chat.save();
      }
    } else {
      // Create the chat
      chat = await Chat.create({
        name: chatName,
        type,
        members: [userId],
        messages: [],
      });
    }

    return chat;
  }

  // Save message in DB
  public async saveMessage(
    message: string,
    userId: string
  ): Promise<IMessageDocument> {
    const newMessage = new Message({
      username: userId,
      message,
      createdAt: new Date(),
    });

    return await newMessage.save();
  }

  // Add the message reference (ID) to the messages array in the Chat model
  public async addMessageToChat(
    chat: IChatDocument,
    messageId: string
  ): Promise<void> {
    // Push the new message ID into the messages array
    const messageObjId = new Types.ObjectId(messageId);
    chat.messages.push(messageObjId);

    // Save the updated Chat document
    await chat.save();
  }

  // Service to handle user disconnecting
  public async handleDisconnect(
    userId: string,
    user: Partial<IUser>
  ): Promise<IUser | null> {
    return await userService.updateUser(userId, user);
  }
}

export default ChatService;
