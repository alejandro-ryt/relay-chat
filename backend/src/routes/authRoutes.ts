import { Router } from "express";
import * as authController from "@/controllers/authController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Sign Up
/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details
 *     tags: [Auth]
 *     operationId: signUp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               profilePic: "https://example.com/profile.jpg"
 *               firstName: "Jorge"
 *               lastName: "Gomez"
 *               username: "jorgegmez"
 *               email: "example@text.com"
 *               password: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 profilePic:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *
 *
 */
router.post("/sign-up", authController.signUp);

// POST Sign In
/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Login a user
 *     description: Login a user with the provided credentials
 *     tags: [Auth]
 *     operationId: signIn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "example@text.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *
 */
router.post("/sign-in", authController.signIn);

/**
 * @swagger
 * /api/auth/logout/{id}:
 *   post:
 *     summary: Logout a user
 *     description: Logout a user and clear the session
 *     tags: [Auth]
 *     operationId: signOut
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to logout
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 */
router.post("/logout/:id", authenticateUser, authController.logOut);

export default router;
