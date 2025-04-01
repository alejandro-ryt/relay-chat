import { Router } from "express";
import * as userController from "@/controllers/userController";

const router = Router();

// GET task by id
router.get("/:id", userController.getUserById);

// POST create task
router.post("/update-user/:id", userController.updateUser);

// DELETE task
router.delete("/:id", userController.deleteUser);

export default router;
