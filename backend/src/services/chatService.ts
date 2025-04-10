import { Socket } from "socket.io";
import UserService from "@/services/userService";
import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import { IUser, IUserDocument } from "@/interfaces/user";
import { IChat, IChatService, IChatDocument } from "@/interfaces/chat";
import { IMessage, IMessageDocument } from "@/interfaces/message";
import { Types } from "mongoose";
import { IPendingInvites } from "@/interfaces/pendingChatInvites";
import PendingChatInvites from "@/models/pendingChatInvites";

const userService = new UserService();

class ChatService implements IChatService {
  // Get pending chat invites by user id
  public async getPendingChatInvitesByUserId(
    userId: string
  ): Promise<IPendingInvites[]> {
    return await PendingChatInvites.find({
      userId: new Types.ObjectId(userId),
    }).exec();
  }

  // Get all chats with last message by user id
  public async findChatsByUserId(userId: string) {
    // Return the populated type directly
    return (
      (await Chat.find({ members: new Types.ObjectId(userId) })
        .populate("members", "id firstName lastName username email")
        .populate({
          path: "messages",
          select: "message author createdAt",
          options: { sort: { createdAt: -1 }, limit: 1 }, // Get the most recent message
        })
        .exec()) ?? []
    );
  }

  // Find chat by name
  public async findByChatName(chatName: string): Promise<IChatDocument | null> {
    return await Chat.findOne({ name: chatName }).exec();
  }

  public async findByChatNamePopulated(
    chatName: string
  ): Promise<IChat | null> {
    const chat = await Chat.findOne({ name: chatName })
      .populate("members", "id profilePic firstName lastName username email")
      .populate("messages", "message author createdAt")
      .exec();
    return chat;
  }

  // Find and/or save chat
  public async saveChat(
    chatName: string,
    type: "direct" | "group",
    userIds: string[] // Array of userIds
  ): Promise<IChatDocument> {
    // Find chat by name
    let chat = await Chat.findOne({ name: chatName }).exec();
    if (chat) {
      // Ensure all users are added to the chat, avoiding duplicates
      const newUserIds = userIds.map((id) => new Types.ObjectId(id));
      const updatedMembers = new Set([
        ...chat.members.map((m) => m.toString()),
        ...newUserIds.map((_id) => _id.toString()),
      ]);

      chat.members = Array.from(updatedMembers).map(
        (id) => new Types.ObjectId(id)
      );

      await chat.save();
    } else {
      // Create the chat if it doesn't exist
      const userIdsObj = userIds.map((id) => new Types.ObjectId(id));

      chat = await Chat.create({
        name: chatName,
        type,
        members: userIdsObj,
        messages: [],
      });
    }

    return chat;
  }

  async saveChatInvitation(userId: string, chatName: string): Promise<void> {
    await PendingChatInvites.updateOne(
      { chatName }, // search by chatName
      {
        $set: {
          userId: new Types.ObjectId(userId),
        },
      },
      { upsert: true }
    );
  }

  async clearPendingChatInvites(userId: string): Promise<void> {
    await PendingChatInvites.deleteMany({ userId: new Types.ObjectId(userId) });
  }

  // public async saveChat(
  //   chatName: string,
  //   type: "direct" | "group",
  //   userId: string
  // ): Promise<IChatDocument> {
  //   // Find chat by name
  //   let chat = await Chat.findOne({ name: chatName }).exec();

  //   // Find or save chat
  //   if (chat) {
  //     // Check if the user already joined the chat to avoid duplicates
  //     const memberFound = chat.members.find((id) => id.toString() === userId);

  //     if (!memberFound) {
  //       // Add the user if not exist
  //       const userIdObj = new Types.ObjectId(userId);
  //       chat.members.push(userIdObj);
  //       await chat.save();
  //     }
  //   } else {
  //     // Create the chat
  //     chat = await Chat.create({
  //       name: chatName,
  //       type,
  //       members: [userId],
  //       messages: [],
  //     });
  //   }

  //   return chat;
  // }

  // Save message in DB
  public async saveMessage(
    message: string,
    userId: string
  ): Promise<IMessageDocument | null> {
    const newMessage = new Message({
      author: new Types.ObjectId(userId),
      message,
      createdAt: new Date(),
    });

    const savedMessage = await newMessage.save();

    return await Message.findById(savedMessage._id).populate(
      "author",
      "username profilePic"
    );
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
    return await userService.updateUser(new Types.ObjectId(userId), user);
  }
}

export default ChatService;
