import { Document, Types } from 'mongoose';

interface IMessage {
    message: string;
    username: Types.ObjectId;
    chat: Types.ObjectId;
    createdAt: Date;
  }

export interface IMessageDocument extends IMessage, Document {};
