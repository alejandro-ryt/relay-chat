import { Types, Document } from "mongoose";

export interface IChat {
  name?: string;
  type: "direct" | "group";
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatDocument extends IChat, Document {}
