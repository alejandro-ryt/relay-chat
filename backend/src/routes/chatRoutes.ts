import { Router } from "express";
import { getChatsByUserId } from "@/controllers/chatController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Get chats with users
router.get("/by-user/:id", authenticateUser, getChatsByUserId);

export default router;
