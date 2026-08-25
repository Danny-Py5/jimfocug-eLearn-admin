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

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { msg: "Unable to connect to server" },
      { status: 500 },
    );
  }
}
