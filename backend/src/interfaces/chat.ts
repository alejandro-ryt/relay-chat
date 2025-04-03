import { Types, Document } from "mongoose";
import { IUser } from "@/interfaces/user";
import { IMessageDocument } from "@/interfaces/message";

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
  saveChat(chatName: string, type: "direct"| "group", userId: string): Promise<IChatDocument>;
  saveMessage(chatId: string, message: string, userId: string): Promise<IMessageDocument>;
  handleDisconnect(userId: string, user: Partial<IUser>): Promise<IUser | null>;
}


