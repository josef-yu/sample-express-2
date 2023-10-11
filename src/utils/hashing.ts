import bcrypt from "bcrypt";

export const HASH = bcrypt.genSaltSync(10);

export async function hashString(payload: string) {
  return await bcrypt.hash(payload, HASH);
}

export async function validateHash(payload: string, hash: string) {
  const hashedPayload = await hashString(payload);
  return await bcrypt.compare(payload, hash);
}
