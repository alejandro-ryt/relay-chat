import { Router } from "express";
import {
  getChatsByUserId,
  deleteMessageById,
} from "@/controllers/chatController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Get chats with users
router.get("/by-user/:id", authenticateUser, getChatsByUserId);
router.delete("/delete-message/:id", authenticateUser, deleteMessageById);

export default router;
