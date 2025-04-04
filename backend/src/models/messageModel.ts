import { IMessageDocument } from "@/interfaces/message";
import { Schema, model } from "mongoose";

const messageSchema = new Schema<IMessageDocument>(
  {
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Message = model<IMessageDocument>("Message", messageSchema);

export default Message;
