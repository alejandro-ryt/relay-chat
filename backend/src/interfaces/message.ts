import { Document, Types } from "mongoose";

export interface IMessage {
  message: string;
  author: Types.ObjectId | { _id: Types.ObjectId; username: string };
  createdAt: Date;
}

export interface IMessageDocument extends IMessage, Document {}
