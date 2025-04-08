import { Router } from "express";
import * as authController from "@/controllers/authController";

const router = Router();

// Sign Up
router.post("/sign-up", authController.signUp);

// POST Sign In
router.post("/sign-in", authController.signIn);

//
router.post("/logout", authController.logOut);

export default router;
