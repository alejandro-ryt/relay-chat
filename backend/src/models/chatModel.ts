import { Schema, model } from "mongoose";
import { IChatDocument } from "@/interfaces/chat";

const chatSchema = new Schema<IChatDocument>(
  {
    name: { type: String, required: false }, // For group chats
    type: { type: String, enum: ["direct", "group"], required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const Chat = model<IChatDocument>("Chat", chatSchema);

export default Chat;
