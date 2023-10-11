import { Response } from "express";
import { ZodError } from "zod";

export function handleInvalidPayload<T extends unknown, Error>(
  error: T,
  res: Response
) {
  if (error instanceof ZodError) {
    const errorFields: Record<string, string> = {};

    for (const issue of error.issues) {
      errorFields[issue.path[0]] = issue.message;
    }

    res.status(400).json({
      message: "Payload invalid",
      ...errorFields,
    });

    return true;
  }

  return false;
}
