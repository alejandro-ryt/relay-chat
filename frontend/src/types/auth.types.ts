import { schema } from "@/schemas/signUp";
import { z } from "zod";

export type SignUpForm = z.output<typeof schema>;
export type SignUpFormData = Omit<SignUpForm, "agreement" | "confirmPassword">;
export type SignInFormData = Pick<SignUpForm, "email" | "password">;
