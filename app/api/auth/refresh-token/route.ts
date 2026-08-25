import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { msg: "Refresh token not found" },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const nextResponse = NextResponse.json({
      msg: "Token refreshed",
      ...data,
    });

    nextResponse.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { msg: "Unable to refresh token" },
      { status: 500 },
    );
  }
}
