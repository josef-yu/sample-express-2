import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "You are not logged in!",
    });
  }

  const decodedToken = jwt.verify(token, `${process.env.JWT_SALT}`);
  console.log(decodedToken);

  next();
};
