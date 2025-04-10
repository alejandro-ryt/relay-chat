import { Document, Types } from "mongoose";

export interface IMessage {
  message: string;
  author: Types.ObjectId | { _id: Types.ObjectId; username: string };
  createdAt: Date;
  messageId?: string;
}

export interface IMessageDocument extends IMessage, Document {}
