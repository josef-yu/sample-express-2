import { existsSync, mkdirSync, writeFileSync } from "fs";

export function saveUserImage(userId: string, data: string) {
  const BASE_PATH = `./data/user/${userId}`;

  if (!existsSync(BASE_PATH)) {
    mkdirSync(BASE_PATH, { recursive: true });
  }

  const buffer = Buffer.from(
    data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  writeFileSync(`${BASE_PATH}/image.jpeg`, buffer);

  return `${process.env.BASE_URL}/images/users/${userId}/image.jpeg`;
}
