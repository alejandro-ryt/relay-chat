import { Types, Document } from "mongoose";
import { IUser } from "@/interfaces/user";
import { IMessageDocument } from "@/interfaces/message";
import { IPendingInvites } from "./pendingChatInvites";

export interface IChat {
  chatPic: string;
  name: string;
  type: "direct" | "group";
  members: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormattedChat {
  id: string;
  chatName: string;
  chatPic: string;
  lastMessage: {
    message: string;
    createdAt: string; // or Date, depending on how you're handling it
    author: {
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
    };
  } | null;
  timestamp: string; // ISO string or Date
}

export interface IChatDocument extends IChat, Document {}

export interface IChatService {
  findChatsByUserId(userId: string): Promise<FormattedChat[] | []>;
  findByChatNamePopulated(chatName: string): Promise<IChat | null>;
  findByChatName(chatName: string): Promise<IChatDocument | null>;
  saveChat(
    chatName: string,
    type: "direct" | "group",
    membersIds: string[]
  ): Promise<IChatDocument>;
  saveMessage(
    chatId: string,
    message: string,
    userId: string
  ): Promise<IMessageDocument>;
  getPendingChatInvitesByUserId(userId: string): Promise<IPendingInvites[]>;
  saveChatInvitation(userId: string, chatName: string): Promise<void>;
  clearPendingChatInvites(userId: string): Promise<void>;
  handleDisconnect(userId: string, user: Partial<IUser>): Promise<IUser | null>;
}

export interface IChatRepository {
  getPendingChatInvitesByUserId(userId: string): Promise<IPendingInvites[]>;
  findChatsByUserId(userId: string): Promise<FormattedChat[] | []>;
  findByChatName(chatName: string): Promise<IChatDocument | null>;
  findByChatId(id: Types.ObjectId): Promise<IChatDocument | null>;
  findByChatNamePopulated(chatName: string): Promise<IChat | null>;
  saveChat(chat: IChatDocument): Promise<IChatDocument>;
  updateChat(chat: IChatDocument): Promise<IChatDocument>;
  saveChatInvitation(userId: string, chatName: string): Promise<void>;
  clearPendingChatInvites(userId: string): Promise<void>;
  saveMessage(
    chatId: string,
    message: string,
    userId: string
  ): Promise<IMessageDocument>;
}
