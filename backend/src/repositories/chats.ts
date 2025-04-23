import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import {
  FormattedChat,
  IChat,
  IChatDocument,
  IChatRepository,
} from "@/interfaces/chat";
import { IMessage, IMessageDocument } from "@/interfaces/message";
import { Types } from "mongoose";
import { IPendingInvites } from "@/interfaces/pendingChatInvites";
import PendingChatInvites from "@/models/pendingChatInvites";
import { TFilter, TOptions } from "@/types/chat";

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
  public async findChatsByUserId(userId: string): Promise<FormattedChat[]> {
    const objectId = new Types.ObjectId(userId);

    const formattedChats: FormattedChat[] = await Chat.aggregate([
      { $match: { members: objectId } },

      {
        $lookup: {
          from: "messages",
          let: { chatId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$chatId", "$$chatId"] },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
              },
            },
            { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                _id: 0,
                message: 1,
                createdAt: 1,
                author: {
                  _id: "$author._id",
                  firstName: "$author.firstName",
                  lastName: "$author.lastName",
                  username: "$author.username",
                  email: "$author.email",
                },
              },
            },
          ],
          as: "lastMessage",
        },
      },

      // Reshape to final format
      {
        $project: {
          _id: 0,
          id: "$_id",
          chatName: "$name",
          chatPic: 1,
          lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
          timestamp: "$createdAt", // Format it later in frontend or service
        },
      },

      { $sort: { timestamp: -1 } },
    ]);

    return formattedChats;
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
      .populate("members", "_id profilePic firstName lastName username email")
      .exec();
    return chat;
  }

  // Create a new chat
  public async saveChat(chat: IChat): Promise<IChatDocument> {
    return await Chat.create(chat);
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

  // Get all messages by Chat id
  public async messagesByChatId(
    chatId: Types.ObjectId
  ): Promise<IMessageDocument[]> {
    return await Message.find({ chatId }).populate(
      "author",
      "username profilePic"
    );
  }

  public async deleteMessage(id: Types.ObjectId): Promise<void> {
    await Message.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
  }

  // Save message in DB
  public async saveMessage(
    message: string,
    userId: string,
    chatId: string
  ): Promise<IMessageDocument> {
    const newMessage = new Message({
      author: userId,
      chatId,
      message,
      createdAt: new Date(),
    });

    return await newMessage.save();
  }

  public async updateMessage(
    filter: TFilter,
    update: Partial<IMessage>,
    options: TOptions
  ): Promise<IMessageDocument | null> {
    return await Message.findOneAndUpdate(filter, update, options)
      .populate("author", "username profilePic")
      .exec();
  }

  public async findMessageById(id: Types.ObjectId) {
    return await Message.findById(id).populate("author", "username profilePic");
  }
}

export default ChatRepository;
