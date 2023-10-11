import { Request, Response } from "express";
import { databaseClient } from "../../db/postgres";
import { User, createUserSchema, updateUserSchema } from "./model";
import { handleInvalidPayload } from "../../utils/parsing";

// Create a user
export async function handleCreateUser(req: Request, res: Response) {
  try {
    const payload = createUserSchema.parse(req.body);

    const result = await databaseClient.query<User>(
      "INSERT INTO users (firstName, lastName) VALUES($1, $2);",
      [...Object.values(payload)]
    );

    if (result.rowCount === 0) {
      return res.status(500).json({ message: "Failed to insert user" });
    }

    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    if (handleInvalidPayload(e, res)) {
      return;
    }

    return res
      .status(500)
      .json({ message: "Something happened with the server." });
  }
}

// Get list of users
export async function handleGetUserList(req: Request, res: Response) {
  const usersResultSet = await databaseClient.query<User>(
    "SELECT * from users;"
  );
  const users = usersResultSet.rows;

  return res.status(200).json(users);
}

// Get user by id
export async function handleGetUserById(req: Request, res: Response) {
  const userId = req.params.id;

  const usersResultSet = await databaseClient.query<User>(
    "SELECT * from users where id=$1;",
    [userId]
  );

  if (usersResultSet.rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  if (usersResultSet.rowCount > 1) {
    return res.status(400).json({ message: "Multiple users found" });
  }

  const user = usersResultSet.rows[0];

  return res.status(200).json(user);
}

// Update user by id
export async function handleUpdateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const payload = updateUserSchema.parse(req.body);

    let setParams: string[] = [];

    for (const [field, value] of Object.entries(payload)) {
      if (value) {
        setParams.push(`${field} = '${value}'`);
      }
    }

    if (setParams.length === 0) {
      return res.status(400).json({ message: "All fields are empty." });
    }

    const usersResultSet = await databaseClient.query<User>(
      `update users set ${setParams.join(",")} where id=${userId}`
    );

    if (usersResultSet.rowCount === 0) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    return res.status(200).json(usersResultSet.rows[0]);
  } catch (e) {
    console.log(e);
    if (handleInvalidPayload(e, res)) {
      return;
    }

    return res
      .status(500)
      .json({ message: "Something happened with the server." });
  }
}

// Delete user by id
export async function handleDeleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    const usersResultSet = await databaseClient.query<User>(
      `delete from users where id=$1`,
      [userId]
    );

    if (usersResultSet.rowCount === 0) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    return res.status(200).json(usersResultSet.rows[0]);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something happened with the server." });
  }
}
