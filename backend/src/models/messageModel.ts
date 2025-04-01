import { IMessageDocument } from '@/interfaces/message';
import { Schema, model } from 'mongoose';



const messageSchema = new Schema<IMessageDocument>({
  message: { type: String, required: true },
  username: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
}, { timestamps: true });

const Message = model<IMessageDocument>('Message', messageSchema);

export default Message;
