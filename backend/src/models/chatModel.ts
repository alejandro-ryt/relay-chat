import { Schema, model } from "mongoose";
import { IChatDocument } from "@/interfaces/chat";

const chatSchema = new Schema<IChatDocument>(
  {
    chatPic: {
      type: String,
      required: false,
      default:
        "https://wallpapers.com/images/high/default-avatar-placeholder-672pawlg85u1erwp.png",
    },
    name: { type: String, required: true },
    type: { type: String, enum: ["direct", "group"], required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", required: true }],
  },
  { timestamps: true }
);

const Chat = model<IChatDocument>("Chat", chatSchema);

export default Chat;
