import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ServerError } from "./error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ServerError({
      statusCode: 401,
      message: "You are unathorized to do this request",
    });
  }

  try {
    jwt.verify(token, `${process.env.JWT_SALT}`);
  } catch (e) {
    throw new ServerError({
      statusCode: 401,
      message: "You are unathorized to do this request",
    });
  }

  next();
};
