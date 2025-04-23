import { Router } from "express";
import * as userController from "@/controllers/userController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Search users
/**
 * @swagger
 * /api/user/search:
 *   get:
 *     summary: Get paginated list of users
 *     description: Retrieves a paginated list of users with contact information
 *     tags: [User]
 *     operationId: getUserList
 *     parameters:
 *       - name: searchQuery
 *         in: query
 *         required: false
 *         description: The search query filter users by username, first name, or last name
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   example: 1
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "68081ca641759f69930cc86c"
 *                       profilePic:
 *                         type: string
 *                         format: uri
 *                         example: "https://ui-avatars.com/api/?name=A+S"
 *                       firstName:
 *                         type: string
 *                         example: "Test"
 *                       lastName:
 *                         type: string
 *                         example: "User"
 *                       username:
 *                         type: string
 *                         example: "testUser"
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "test@example.com"
 *                       socketId:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       contacts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             contact:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: "68081ce041759f69930cc874"
 *                                 profilePic:
 *                                   type: string
 *                                   format: uri
 *                                   example: "https://ui-avatars.com/api/?name=D+T"
 *                                 firstName:
 *                                   type: string
 *                                   example: "Don"
 *                                 lastName:
 *                                   type: string
 *                                   example: "Testing"
 *                                 username:
 *                                   type: string
 *                                   example: "testUser"
 *                                 email:
 *                                   type: string
 *                                   format: email
 *                                   example: "test@gmail.com"
 *                                 socketId:
 *                                   type: string
 *                                   nullable: true
 *                                   example: null
 */
router.get("/search", authenticateUser, userController.searchUsers);

// GET task by id
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieves detailed user information, including contacts and their block status.
 *     tags: [User]
 *     operationId: getUserById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *           example: "68090ecd164ec4934610bad8"
 *     responses:
 *       200:
 *         description: User details with contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "68090ecd164ec4934610bad8"
 *                 profilePic:
 *                   type: string
 *                   format: uri
 *                   example: "https://wallpapers.com/images/high/default-avatar-placeholder-672pawlg85u1erwp.png"
 *                 firstName:
 *                   type: string
 *                   example: "Test"
 *                 lastName:
 *                   type: string
 *                   example: "User"
 *                 username:
 *                   type: string
 *                   example: "testuser"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "test@example.com"
 *                 socketId:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contact:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "680910c0aa7028a4fc01c4d0"
 *                           profilePic:
 *                             type: string
 *                             format: uri
 *                             example: "https://ui-avatars.com/api/?name=T+C"
 *                           firstName:
 *                             type: string
 *                             example: "Test"
 *                           lastName:
 *                             type: string
 *                             example: "User"
 *                           username:
 *                             type: string
 *                             example: "testUser"
 *                           email:
 *                             type: string
 *                             format: email
 *                             example: "test@example.com"
 *                           socketId:
 *                             type: string
 *                             nullable: true
 *                             example: "EjRHz2rfvoHCRMZ6AAAP"
 *                       isBlocked:
 *                         type: boolean
 *                         example: false
 *                       _id:
 *                         type: string
 *                         example: "6809227e746e0e4162d709f3"
 */

router.get("/:id", authenticateUser, userController.getUserById);

// PUT update user
/**
 * @swagger
 * /api/user/update-user/{id}:
 *   put:
 *     summary: Update user data
 *     description: Updates a user returns the updated user object.
 *     tags: [User]
 *     operationId: updateUser
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *           example: "68090ecd164ec4934610bad8"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "User Updated"
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 profilePic:
 *                   type: string
 *                   format: uri
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   description: Hashed password
 *                 socketId:
 *                   type: string
 *                   nullable: true
 *                 contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contact:
 *                         type: string
 *                         description: Contact user ID
 *                       isBlocked:
 *                         type: boolean
 *                       _id:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *                   example: 0
 */
router.put("/update-user/:id", authenticateUser, userController.updateUser);

// DELETE user by Id
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by Id
 *     description: Delete a user with the provided ID
 *     tags: [User]
 *     operationId: blockContact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User removed successfully
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
router.delete("/:id", authenticateUser, userController.deleteUser);

export default router;
