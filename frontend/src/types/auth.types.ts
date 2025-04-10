import { signUpSchema } from "@/schemas/signUp";
import { signInSchema } from "@/schemas/signIn";
import { z } from "zod";
import { TUser, TUserContact } from "@/types/user.types";

export type TSignUpForm = z.output<typeof signUpSchema>;
export type TSignUpFormData = Omit<
  TSignUpForm,
  "agreement" | "confirmPassword"
>;
export type TSignInForm = z.output<typeof signInSchema>;
export type TAuthStore = {
  authUser: TAuthUser | null;
  authUserDetails: TUser | null;
  isAuthenticated: boolean;
  authenticate: (data: TAuthUser) => void;
  setAuthUserDetails: (data: TUser) => void;
  filterContacts: (searchTerm: string) => TUserContact[];
  logOut: () => void;
};

export type TAuthUser = {
  userId: string;
  username: string;
};
