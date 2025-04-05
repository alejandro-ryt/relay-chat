import { Router } from "express";
import * as userController from "@/controllers/userController";
import { validateSearchQuery } from "@/middlewares/queryValidator";

const router = Router();

// GET task by id
// router.get("/:id", userController.getUserById);

// POST create task
router.put("/update-user/:id", userController.updateUser);

// DELETE task
router.delete("/:id", userController.deleteUser);

// Search users
router.get("/search", userController.searchUsers);

export default router;
