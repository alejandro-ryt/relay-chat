import { signUpSchema } from "@/schemas/signUp";
import { signInSchema } from "@/schemas/signIn";
import { z } from "zod";
import { TUser } from "./user.types";
import { Socket } from "socket.io-client";

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
  socket: Socket | null;
  authenticate: (data: TAuthUser) => void;
  setAuthUserDetails: (data: TUser) => void;
  logOut: () => void;
  socketConnection: () => void;
};

export type TAuthUser = {
  userId: string;
  username: string;
};
