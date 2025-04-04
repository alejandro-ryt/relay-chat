import { userEditSchema } from "@/schemas/user";
import { z } from "zod";

export type TUser = {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePic: string;
  socketId: null;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
};

export type TUserStore = {
  user: TUser | null;
  setUser: (data: TUser) => void;
};

export type TEditUserForm = z.output<typeof userEditSchema>;
