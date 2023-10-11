import { z } from "zod";
import { Prisma } from "@prisma/client";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export const createUserSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  password: z.string({ required_error: "Password is required." }),
  firstName: z.string({ required_error: "First name is required." }),
  lastName: z.string({ required_error: "Last name is required." }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  password: z.string({ required_error: "Password is required." }),
});

export const BasicUserSelect: Prisma.UsersSelect = {
  id: true,
  firstName: true,
  lastName: true,
  username: true,
};
