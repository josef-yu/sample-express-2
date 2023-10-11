import bcrypt from "bcrypt";

export function hashString(payload: string) {
  return bcrypt.hashSync(payload, `${process.env.PASSWORD_SALT}`);
}
