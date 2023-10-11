import { Request, Response } from "express";
import { hashString } from "../../utils/hashing";
import { BasicUserSelect, createUserSchema, updateUserSchema } from "./model";

// Create a user
export async function handleCreateUser(req: Request, res: Response) {
  const payload = createUserSchema.parse(req.body);

  payload.password = hashString(payload.password);

  const result = await req.prisma.users.create({
    data: payload,
    select: BasicUserSelect,
  });

  return res.status(201).json(result);
}

// Get list of users
export async function handleGetUserList(req: Request, res: Response) {
  const prisma = req.prisma;
  const users = await prisma.users.findMany({
    select: BasicUserSelect,
  });
  return res.status(200).json(users);
}

// Get user by id
export async function handleGetUserById(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await req.prisma.users.findFirstOrThrow({
    where: {
      id: parseInt(userId),
    },
    select: BasicUserSelect,
  });

  return res.status(200).json(user);
}

// Update user by id
export async function handleUpdateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const payload = updateUserSchema.parse(req.body);

  const result = await req.prisma.users.update({
    data: payload,
    where: {
      id: parseInt(userId),
    },
    select: BasicUserSelect,
  });

  return res.status(200).json(result);
}

// Delete user by id
export async function handleDeleteUser(req: Request, res: Response) {
  const userId = req.params.id;

  const result = await req.prisma.users.delete({
    where: {
      id: parseInt(userId),
    },
    select: BasicUserSelect,
  });

  return res.status(200).json(result);
}
