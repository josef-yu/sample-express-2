import { Request, Response } from "express";
import {
  UserListSchema,
  UserSchema,
  createUserSchema,
  updateUserSchema,
} from "./model";
import { handleInvalidPayload } from "../../utils/parsing";
import { hashString } from "../../utils/hashing";

// Create a user
export async function handleCreateUser(req: Request, res: Response) {
  try {
    const payload = createUserSchema.parse(req.body);

    payload.password = hashString(payload.password);

    const result = await req.prisma.users.create({
      data: payload,
    });

    if (!result) {
      return res.status(500).json({ message: "Unable to create user" });
    }

    return res.status(201).json(result);
  } catch (e) {
    console.log(e);
    if (handleInvalidPayload(e, res)) {
      return;
    }

    return res
      .status(500)
      .json({ message: "Something happened with the server." });
  }
}

// Get list of users
export async function handleGetUserList(req: Request, res: Response) {
  const prisma = req.prisma;
  const users = await prisma.users.findMany();
  const result = UserListSchema.parse(users);
  return res.status(200).json(result);
}

// Get user by id
export async function handleGetUserById(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await req.prisma.users.findFirst({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const result = UserSchema.parse(user);

  return res.status(200).json(user);
}

// Update user by id
export async function handleUpdateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const payload = updateUserSchema.parse(req.body);

    const result = await req.prisma.users.update({
      data: payload,
      where: {
        id: parseInt(userId),
      },
    });

    if (!result) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    if (handleInvalidPayload(e, res)) {
      return;
    }

    return res
      .status(500)
      .json({ message: "Something happened with the server." });
  }
}

// Delete user by id
export async function handleDeleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    const result = await req.prisma.users.delete({
      where: {
        id: parseInt(userId),
      },
    });

    if (!result) {
      return res.status(500).json({ message: "Failed to delete user" });
    }

    return res.status(200).json(result);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something happened with the server." });
  }
}
