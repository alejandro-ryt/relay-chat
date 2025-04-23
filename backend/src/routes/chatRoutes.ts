import { Router } from "express";
import {
  getChatsByUserId,
  deleteMessageById,
} from "@/controllers/chatController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Get chats with users
/**
 * @swagger
 * /api/chat/by-user/{id}:
 *   get:
 *     summary: Fetch chats for a user
 *     description: Fetch chats for a user with the provided ID
 *     tags: [Chat]
 *     operationId: chatsByUserId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch chats
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of chats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   chatPic:
 *                     type: string
 *                     format: uri
 *                     example: "https://wallpapers.com/images/high/default-avatar-placeholder-672pawlg85u1erwp.png"
 *                   id:
 *                     type: string
 *                     example: "68081d0541759f69930cc88e"
 *                   chatName:
 *                     type: string
 *                     example: "test-chat-name"
 *                   lastMessage:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Hi, How're you?"
 *                       author:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "68081ca641759f69930cc86c"
 *                           firstName:
 *                             type: string
 *                             example: "User"
 *                           lastName:
 *                             type: string
 *                             example: "Test"
 *                           username:
 *                             type: string
 *                             example: "userTest"
 *                           email:
 *                             type: string
 *                             format: email
 *                             example: "user@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T16:02:18.463Z"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-22T22:49:41.396Z"
 *       400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid user ID"
 */
router.get("/by-user/:id", authenticateUser, getChatsByUserId);

// Delete message by ID
/**
 * @swagger
 * /api/chat/delete-message/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Delete a message with the provided ID
 *     tags: [Chat]
 *     operationId: deleteMessageById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the message to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message deleted successfully"
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message not found"
 *       400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid message ID"
 *
 */
router.delete("/delete-message/:id", authenticateUser, deleteMessageById);

export default router;
