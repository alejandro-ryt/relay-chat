import { Router } from "express";
import * as userController from "@/controllers/userController";
import { authenticateUser } from "@/middlewares/authMiddleware";

const router = Router();

// POST add new contact
router.post(
  "/add/:userId/:contactId",
  authenticateUser,
  userController.addContact
);

// POST create task
router.post(
  "/block-contact/:userId/:contactId",
  authenticateUser,
  userController.blockContactController
);

// DELETE task
router.delete(
  "/remove/:userId/:contactId",
  authenticateUser,
  userController.removeContactController
);

export default router;
