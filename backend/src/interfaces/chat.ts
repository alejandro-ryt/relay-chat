import { Types, Document } from "mongoose";
import { Socket } from "socket.io";
import { IUserDocument } from "./user";
import { IMessageDocument } from "./message";

export interface IChat {
  name?: string;
  type: "direct" | "group";
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatDocument extends IChat, Document {}

export interface IChatService {
  findByChatName(chatName: string): Promise<IChatDocument | null>;
  saveChat(chatName: string,  user: IUserDocument): Promise<IChatDocument>;
  saveMessage(chatId: string, message: string, userId: string): Promise<IMessageDocument>;
  handleDisconnect(socket: Socket): Promise<void>;
}
