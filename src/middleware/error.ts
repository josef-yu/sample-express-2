import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class ServerError extends Error {
  public readonly statusCode: number;
  public readonly extra: Record<string, string>;

  constructor(
    statusCode: number = 500,
    message: string,
    extra: Record<string, string> = {}
  ) {
    super(message);

    this.statusCode = statusCode;
    this.extra = extra;
  }
}

export function errorHandlerMiddleware<
  T extends ServerError | ZodError | PrismaClientKnownRequestError
>(error: T, req: Request, res: Response, next: NextFunction) {
  console.log(error);

  let statusCode = 500;
  let body = { message: "Something went wrong..." };

  if (error instanceof ServerError) {
    statusCode = error.statusCode;
    body = {
      message: error.message,
      ...error.extra,
    };
  }

  if (error instanceof ZodError) {
    statusCode = 400;
    const errorFields: Record<string, string> = {};

    for (const issue of error.issues) {
      errorFields[issue.path[0]] = issue.message;
    }

    body = {
      message: "Payload invalid",
      ...errorFields,
    };
  }

  if (error instanceof PrismaClientKnownRequestError) {
    statusCode = 400;
    body = {
      message: error.message,
    };
  }

  res.status(statusCode).json(body);
}
