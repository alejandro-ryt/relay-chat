import { IPendingInvitesDocument } from "@/interfaces/pendingChatInvites";
import { Schema, model } from "mongoose";

const pendingChatSchema = new Schema<IPendingInvitesDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: false },
    chatName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const PendingChatInvites = model<IPendingInvitesDocument>(
  "PendingChatInvites",
  pendingChatSchema
);

export default PendingChatInvites;
