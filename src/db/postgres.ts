import { Client } from "pg";

export const databaseClient = new Client({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DATABASE_PORT ?? "5432"),
  database: process.env.DATABASE_NAME,
  host: process.env.DATABSE_HOST,
});
