import { Router } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUserList,
  handleUpdateUser,
} from "./service";
import { authMiddleware } from "../../middleware/auth";

const usersRouter = Router();

// usersRouter.use(authMiddleware);

// Create user
usersRouter.post("/", handleCreateUser);

// Get list of users
usersRouter.get("/", authMiddleware, handleGetUserList);

// Get user by id
usersRouter.get("/:id", authMiddleware, handleGetUserById);

// Update user by id
usersRouter.patch("/:id", authMiddleware, handleUpdateUser);

// Delete user by id
usersRouter.delete("/:id", authMiddleware, handleDeleteUser);

export default usersRouter;
