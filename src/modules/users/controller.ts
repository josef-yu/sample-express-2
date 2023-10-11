import { Router } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUserList,
  handleUpdateUser,
} from "./service";

const usersRouter = Router();

// Create user
usersRouter.post("/", handleCreateUser);

// Get list of users
usersRouter.get("/", handleGetUserList);

// Get user by id
usersRouter.get("/:id", handleGetUserById);

// Update user by id
usersRouter.patch("/:id", handleUpdateUser);

// Delete user by id
usersRouter.delete("/:id", handleDeleteUser);

export default usersRouter;
