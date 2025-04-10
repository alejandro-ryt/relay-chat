import { IUserDocument } from "@/interfaces/user";

export type TSearchQuery = {
  $or: Array<{
    username?: { $regex: RegExp };
    firstName?: { $regex: RegExp };
    lastName?: { $regex: RegExp };
  }>;
};

export type TUsersPagination = {
  users: IUserDocument[];
  totalCount: Number;
};
