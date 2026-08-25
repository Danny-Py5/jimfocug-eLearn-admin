import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { msg: "Access token not found" },
        { status: 401 },
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get courses error:", error);

    return NextResponse.json(
      {
        msg: "Failed to fetch courses",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
