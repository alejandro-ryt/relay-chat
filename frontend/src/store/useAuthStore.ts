import { SignUpFormData, SignInFormData } from "@/types/auth.types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Socket } from "socket.io-client";

type TAuthStore = {
  authUser: TAuthUser | null;
  socket: null | Socket;
  isAuthenticated: boolean;
  signIn: (data: SignInFormData) => void;
  signUp: (data: SignUpFormData) => void;
  logOut: () => void;
};

type TAuthUser = {
  userId: string;
  username: string;
};

export const useAuthStore = create<TAuthStore>((set, get) => ({
  authUser: { userId: "1234567890", username: "alejandromagno" },
  socket: null,
  isAuthenticated: true,
  signIn: async (data) => {
    try {
      console.log(data);
    } catch (error) {
      toast.error("signIn", error ?? "");
    }
  },
  signUp: async (data) => {
    try {
      console.log(data);
    } catch (error) {
      toast.error("signIn", error ?? "");
    }
  },
  logOut: async () => {
    try {
      console.log("Log out");
    } catch (error) {
      toast.error("signIn", error ?? "");
    }
  },
}));
