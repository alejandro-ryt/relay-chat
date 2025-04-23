import { Router } from "express";
import * as userController from "@/controllers/userController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// POST add new contact
/**
 * @swagger
 * /api/contact/add/{userId}/{contactId}:
 *   post:
 *     summary: Add a new contact
 *     description: Add a new contact with the provided user ID and contact ID
 *     tags: [Contact]
 *     operationId: addContact
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user adding the contact
 *         schema:
 *           type: string
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: The ID of the contact to be added
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact added successfully
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
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
 *
 */
router.post(
  "/add/:userId/:contactId",
  authenticateUser,
  userController.addContact
);

// POST block contact
/**
 * @swagger
 * /api/contact/block-contact/{userId}/{contactId}:
 *   post:
 *     summary: Block a contact by Id
 *     description: Block a new contact with the provided user ID and contact ID
 *     tags: [Contact]
 *     operationId: blockContact
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user blocking the contact
 *         schema:
 *           type: string
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: The ID of the contact to be blocked
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact blocked successfully
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
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
 *
 */
router.post(
  "/block-contact/:userId/:contactId",
  authenticateUser,
  userController.blockContactController
);

// DELETE task
/**
 * @swagger
 * /api/contact/remove/{userId}/{contactId}:
 *   delete:
 *     summary: Remove a contact by Id
 *     description: Remove a new contact with the provided user ID and contact ID
 *     tags: [Contact]
 *     operationId: blockContact
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user removing the contact
 *         schema:
 *           type: string
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: The ID of the contact to be removed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact removed successfully
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
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
 *
 */
router.delete(
  "/remove/:userId/:contactId",
  authenticateUser,
  userController.removeContactController
);

export default router;
