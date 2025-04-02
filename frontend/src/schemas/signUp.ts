import { REGEX } from "@/constants/regex";
import SIGN_UP_DATA from "@/constants/signUp";
import { SignUpForm } from "@/types/auth.types";
import { z } from "zod";

export const schema = z
  .object({
    username: z.string().min(6).regex(REGEX.HAS_LETTER_NUMBER, {
      message: SIGN_UP_DATA.ERR_LETTER_NUMBER,
    }),
    firstName: z.string().min(3).regex(REGEX.HAS_LETTER_NUMBER, {
      message: SIGN_UP_DATA.ERR_LETTER_NUMBER,
    }),
    lastName: z.string().min(4).regex(REGEX.HAS_LETTER_NUMBER, {
      message: SIGN_UP_DATA.ERR_LETTER_NUMBER,
    }),
    email: z.string().email(),
    password: z.string().regex(REGEX.HAS_ALL_SECURITY, {
      message: SIGN_UP_DATA.EER_PASSWORD_CRITERIA,
    }),
    confirmPassword: z.string().regex(REGEX.HAS_ALL_SECURITY, {
      message: SIGN_UP_DATA.EER_PASSWORD_CRITERIA,
    }),
    agreement: z.literal(true, {
      errorMap: () => ({
        message: SIGN_UP_DATA.ERR_AGREEMENT,
      }),
    }),
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
} as unknown as SignUpForm;
