import { NextResponse } from "next/server";

import type { LoginAPIResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data: LoginAPIResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const nextResponse = NextResponse.json({
      msg: "Login successful",
    });

    nextResponse.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    nextResponse.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7days | same as the one I used in the backend
      path: "/",
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        msg: "Unable to connect to server",
      },
      { status: 500 },
    );
  }
}
