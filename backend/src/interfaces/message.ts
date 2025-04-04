import { Document, Types } from "mongoose";

export interface IMessage {
  message: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IMessageDocument extends IMessage, Document {}
