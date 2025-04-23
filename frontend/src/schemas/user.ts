import { z } from "zod";

export const userEditSchema = z
  .object({
    firstName: z.string().min(3).trim(),
    lastName: z.string().min(4).trim(),
    profilePic: z.string().trim(),
  })
  .required();
