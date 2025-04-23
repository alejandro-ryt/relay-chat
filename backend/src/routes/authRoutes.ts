import { Router } from "express";
import * as authController from "@/controllers/authController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Sign Up
router.post("/sign-up", authController.signUp);

// POST Sign In
router.post("/sign-in", authController.signIn);

router.post("/logout/:id", authenticateUser, authController.logOut);

export default router;
