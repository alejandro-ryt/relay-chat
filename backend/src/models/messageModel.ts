import mongoose, { Schema } from 'mongoose';
import { IMessageDocument } from '../interfaces/message';



const messageSchema = new Schema<IMessageDocument>({
    username: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const Message = mongoose.model<IMessageDocument>('Message', messageSchema);
