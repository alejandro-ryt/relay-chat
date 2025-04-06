import { Router } from "express";
import * as userController from "@/controllers/userController";

const router = Router();

// POST add new contact
router.post("/add/:userId/:contactId", userController.addContact);

// POST create task
router.post(
  "/block-contact/:userId/:contactId",
  userController.blockContactController
);

// DELETE task
router.delete(
  "/remove/:userId/:contactId",
  userController.removeContactController
);

export default router;
