import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    console.log({ accessToken });

    if (!accessToken) {
      return NextResponse.json(
        { msg: "Access token not found" },
        { status: 401 },
      );
    }
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const nextResponse = NextResponse.json(data);

    nextResponse.cookies.delete("accessToken");
    nextResponse.cookies.delete("refreshToken");

    return nextResponse;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        msg: "Logout failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
