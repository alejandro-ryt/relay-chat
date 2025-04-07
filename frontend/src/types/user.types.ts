import { userEditSchema } from "@/schemas/user";
import { z } from "zod";

export type TUser = {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePic: string;
  socketId: string | null;
  updatedAt: string;
  username: string;
  contacts: TUserContact[];
  __v: number;
  _id: string;
};

export type TUserContact = { isBlocked: boolean; contact: TUser };

export type TUserStore = {
  users: TUser[];
  setUsers: (data: TUser[]) => void;
};

export type TUserSearchResponse = {
  page: number;
  totalCount: number;
  totalPages: number;
  users: TUser[];
};

// export type TUserSearch = Pick<
//   TUser,
//   "email" | "firstName" | "lastName" | "username" | "_id"
// >;

export type TEditUserForm = z.output<typeof userEditSchema>;
