import { Document, Types } from 'mongoose';

export interface IMessage {
    message: string;
    username: Types.ObjectId;
    createdAt: Date;
  }

export interface IMessageDocument extends IMessage, Document {};
