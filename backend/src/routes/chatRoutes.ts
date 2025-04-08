import { Router } from "express";
import { getChatsByUserId } from "@/controllers/chatController";

const router = Router();

// Get chats with users
router.get("/by-user/:id", getChatsByUserId);

export default router;
