import { Document, Types } from "mongoose";

export interface IPendingInvites {
  userId: Types.ObjectId;
  chatId: Types.ObjectId;
}

export interface IPendingInvitesDocument extends IPendingInvites, Document {}
