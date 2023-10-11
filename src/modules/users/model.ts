import { z } from "zod";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export const createUserSchema = z.object({
  firstName: z.string({ required_error: "First name is required." }),
  lastName: z.string({ required_error: "Last name is required." }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
