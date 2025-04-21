import { Router } from "express";
import * as userController from "@/controllers/userController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// Search users
router.get("/search", authenticateUser, userController.searchUsers);

// GET task by id
router.get("/:id", authenticateUser, userController.getUserById);

// POST create task
router.put("/update-user/:id", authenticateUser, userController.updateUser);

// DELETE task
router.delete("/:id", authenticateUser, userController.deleteUser);

export default router;
