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

export interface IChatDocument extends IChat, Document {}

export interface IChatService {
  findChatsByUserId(userId: string): Promise<IChat[] | []>;
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
  ): Promise<IMessageDocument | null>;
  getPendingChatInvitesByUserId(userId: string): Promise<IPendingInvites[]>;
  saveChatInvitation(userId: string, chatName: string): Promise<void>;
  clearPendingChatInvites(userId: string): Promise<void>;
  handleDisconnect(userId: string, user: Partial<IUser>): Promise<IUser | null>;
}
