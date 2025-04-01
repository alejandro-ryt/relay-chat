import { Router } from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";

const router = Router();

// Use the imported routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
