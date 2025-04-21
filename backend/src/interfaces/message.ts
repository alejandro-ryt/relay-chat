import { Document, Types } from "mongoose";

export interface IMessage {
  message: string;
  chatId: Types.ObjectId;
  author: Types.ObjectId | { _id: Types.ObjectId; username: string };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  messageId?: string;
}

export interface IMessageDocument extends IMessage, Document {}
