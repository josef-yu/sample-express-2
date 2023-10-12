import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";

dotenv.config();

import { PrismaClient } from "@prisma/client";
import { errorHandlerMiddleware } from "./src/middleware/error";
import { handleLogin } from "./src/modules";
import usersRouter from "./src/modules/users/controller";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

declare global {
  namespace Express {
    export interface Request {
      prisma: PrismaClient;
    }
  }
}

export const initPrisma = (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();
  req.prisma = prisma;

  next();
};

app.use(initPrisma);

app.get("/", (req: Request, res: Response) => {
  console.log("triggered root route");
  res.send("Express + TypeScript Server");
});

app.get("/images/users/:id/image.jpeg", (req: Request, res: Response) => {
  const userId = req.params.id;

  res.sendFile(`./data/user/${userId}/image.jpeg`, { root: "./" });
});

app.post("/login", handleLogin);

app.use("/users", usersRouter);

app.use(errorHandlerMiddleware);

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
