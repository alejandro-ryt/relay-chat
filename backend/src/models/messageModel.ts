import { IMessageDocument } from "@/interfaces/message";
import { Schema, model } from "mongoose";

const messageSchema = new Schema<IMessageDocument>(
  {
    message: { type: String, required: true },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Message = model<IMessageDocument>("Message", messageSchema);

export default Message;
