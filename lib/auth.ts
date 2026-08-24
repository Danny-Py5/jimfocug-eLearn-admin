import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;
  console.log({ token });

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY!);

    return decoded;
  } catch {
    return null;
  }
}
