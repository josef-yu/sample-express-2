import { loginSchema } from "./users/model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hashString } from "../utils/hashing";

export async function handleLogin(req: Request, res: Response) {
  try {
    const payload = loginSchema.parse(req.body);

    const user = await req.prisma.users.findFirst({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(payload.password, user.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
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
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong." });
  }
}
