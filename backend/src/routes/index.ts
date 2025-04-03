import { Router } from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import chatRoutes from "@/routes/chatRoutes";

const router = Router();

// Use the imported routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

export default router;
