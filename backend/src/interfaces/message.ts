import { Document } from 'mongoose';

export interface IMessage {
    username: string;
    message: string;
    timestamp: Date;
}

export interface IMessageDocument extends IMessage, Document {};
