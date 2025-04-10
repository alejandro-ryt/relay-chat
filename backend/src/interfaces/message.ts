import { Document, Types } from "mongoose";

export interface IMessage {
  message: string;
  chatId: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IMessageDocument extends IMessage, Document {}
