import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ServerError } from "../middleware/error";
import { isValidPassword } from "../utils/hashing";
import { loginSchema } from "./users/model";

export async function handleLogin(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);

  const user = await req.prisma.users.findFirst({
    where: {
      username: payload.username,
    },
  });

  if (!user) {
    throw new ServerError(400, "Username/password is invalid");
  }

  if (!isValidPassword(payload.password, user.password)) {
    throw new ServerError(400, "Username/password is invalid");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    `${process.env.JWT_SALT}`,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    token,
  });
}
