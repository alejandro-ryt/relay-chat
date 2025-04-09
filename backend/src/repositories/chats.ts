import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import { IChat, IChatDocument, IChatRepository } from "@/interfaces/chat";
import { IMessageDocument } from "@/interfaces/message";
import { Types } from "mongoose";
import { IPendingInvites } from "@/interfaces/pendingChatInvites";
import PendingChatInvites from "@/models/pendingChatInvites";

class ChatRepository implements IChatRepository {
  // Get pending chat invites by user id
  public async getPendingChatInvitesByUserId(
    userId: string
  ): Promise<IPendingInvites[]> {
    return await PendingChatInvites.find({
      userId: new Types.ObjectId(userId),
    }).exec();
  }

  // Get all chats with last message by user id
  public async findChatsByUserId(userId: string): Promise<IChatDocument[]> {
    // Return the populated type directly
    return await Chat.find({ members: new Types.ObjectId(userId) })
      .populate("members", "id firstName lastName username email")
      .populate({
        path: "messages",
        select: "message author createdAt",
        options: { sort: { createdAt: -1 }, limit: 1 }, // Get the most recent message
      })
      .exec();
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

  // Create a new chat
  public async saveChat(chat: IChatDocument): Promise<IChatDocument> {
    return await await Chat.create(chat);
  }

  // Update an existing chat
  public async updateChat(chat: IChatDocument): Promise<IChatDocument> {
    return await chat.save();
  }

  // Save chat invitation
  async saveChatInvitation(userId: string, chatId: string): Promise<void> {
    await PendingChatInvites.updateOne(
      { _id: new Types.ObjectId(chatId) },
      {
        $set: {
          userId: new Types.ObjectId(userId),
        },
      },
      { upsert: true }
    );
  }

  // Clear pending invites
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
}

export default ChatRepository;
