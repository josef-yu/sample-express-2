import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import { databaseClient } from "./src/db/postgres";
import usersRouter from "./src/modules/users/controller";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("triggered root route");
  res.send("Express + TypeScript Server");
});

app.use("/users", usersRouter);

app.listen(port, async () => {
  await databaseClient.connect();

  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
