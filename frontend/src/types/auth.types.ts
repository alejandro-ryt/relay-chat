import { signUpSchema } from "@/schemas/signUp";
import { signInSchema } from "@/schemas/signIn";
import { z } from "zod";
import { Socket } from "socket.io-client";

export type TSignUpForm = z.output<typeof signUpSchema>;
export type TSignUpFormData = Omit<
  TSignUpForm,
  "agreement" | "confirmPassword"
>;
export type TSignInForm = z.output<typeof signInSchema>;
export type TAuthStore = {
  authUser: TAuthUser | null;
  socket: null | Socket;
  isAuthenticated: boolean;
  isSigningUp: boolean;
  isSigningIn: boolean;
  signIn: (data: TSignInForm) => Promise<boolean>;
  signUp: (data: TSignUpFormData) => Promise<boolean>;
  logOut: () => void;
};

export type TAuthUser = {
  userId: string;
  username: string;
};
