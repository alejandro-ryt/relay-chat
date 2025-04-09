import { REGEX } from "@/constants/regex";
import SIGN_UP_DATA from "@/constants/signUp";
import { TSignUpForm } from "@/types/auth.types";
import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4)
      .regex(REGEX.HAS_LETTER_NUMBER, {
        message: SIGN_UP_DATA.ERR_LETTER_NUMBER,
      })
      .trim(),
    firstName: z.string().min(3).trim(),
    lastName: z.string().min(4).trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .regex(REGEX.HAS_ALL_SECURITY, {
        message: SIGN_UP_DATA.EER_PASSWORD_CRITERIA,
      })
      .trim(),
    confirmPassword: z
      .string()
      .regex(REGEX.HAS_ALL_SECURITY, {
        message: SIGN_UP_DATA.EER_PASSWORD_CRITERIA,
      })
      .trim(),
    agreement: z.literal(true, {
      errorMap: () => ({
        message: SIGN_UP_DATA.ERR_AGREEMENT,
      }),
    }),
    profilePic: z.string().optional(),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: SIGN_UP_DATA.ERR_PASSWORD_MATH,
    path: ["confirmPassword"],
  });

export const initialSignUpForm = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreement: false,
} as unknown as TSignUpForm;
