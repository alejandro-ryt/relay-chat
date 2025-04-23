import { z } from "zod";

export const createChatSchema = z.object({
  chatName: z.string().min(4).trim(),
});

export type TCreateChatForm = z.output<typeof createChatSchema>;
