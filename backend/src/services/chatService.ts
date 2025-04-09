import UserService from "@/services/userService";
import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import { IUser } from "@/interfaces/user";
import { IChat, IChatService, IChatDocument } from "@/interfaces/chat";
import { IMessageDocument } from "@/interfaces/message";
import { Types } from "mongoose";
import { IPendingInvites } from "@/interfaces/pendingChatInvites";
import PendingChatInvites from "@/models/pendingChatInvites";
import { ERROR } from "@/constants/relayChat";
import { StatusCodes } from "http-status-codes";
import ChatRepository from "@/repositories/chats";

const chatRepository = new ChatRepository();

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
    if (!userId) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
        const chats = await .findChatsByUserId(userId);
    
        const formattedChats = chats.map((chat) => {
          // Cast to IMessage[]
          const messages = chat.messages as unknown as IMessage[];
          // Get last message
          const lastMessage = messages[0];
          return {
            id: chat._id,
            chatName: chat.name,
            chatPic: chat.chatPic,
            lastMessage: lastMessage
              ? {
                  message: lastMessage.message,
                  author: lastMessage.author,
                  timestamp: lastMessage.createdAt,
                }
              : null,
            timestamp: chat.createdAt.toLocaleDateString(),
          };
        });
  }

  // Find chat by name
  public async findByChatName(chatName: string): Promise<IChatDocument | null> {
    return await Chat.findOne({ name: chatName }).exec();
  }

  // Find chat by name
  public async findByChatId(id: Types.ObjectId): Promise<IChatDocument | null> {
    return await Chat.findById(id).exec();
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
        ...newUserIds.map((id) => id.toString()),
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

  // Save message in DB
  public async saveMessage(
    message: string,
    userId: string
  ): Promise<IMessageDocument> {
    const newMessage = new Message({
      author: userId,
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
    return await userService.updateUser(new Types.ObjectId(userId), user);
  }
}

export default ChatService;
