import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/types";
import { interceptorFetch } from "./interceptor-fetch";

export async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  //   console.log("token founded", { token });
  if (!token) {
    return null;
  }
  console.log("fetching auth.me ...");
  try {
    const response = await interceptorFetch(
      `${process.env.BACKEND_URL}/api/v1/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const user: User = await response.json();
    console.log("Fetched auth.me ...");
    return user;
  } catch (e) {
    console.log("error while getting me", e);
    return null;
  }
}
