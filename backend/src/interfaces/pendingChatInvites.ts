import { Document, Types } from "mongoose";

export interface IPendingInvites {
  userId: Types.ObjectId;
  chatName: string;
}

export interface IPendingInvitesDocument extends IPendingInvites, Document {}
