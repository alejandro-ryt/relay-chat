import { Router } from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import chatRoutes from "@/routes/chatRoutes";
import contactRoutes from "@/routes/contactRoutes";

const router = Router();

// Use the imported routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/chat", chatRoutes);
router.use("/contact", contactRoutes);

export default router;
