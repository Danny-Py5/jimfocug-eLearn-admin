import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { role } = await req.json();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { msg: "Access token not found" },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admins/${id}/change-role`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ role }),
      },
    );

    const data = await response.clone().json();

    if (!response.ok) {
      console.log(await response.clone().json());
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Change user role error:", error);

    return NextResponse.json(
      {
        msg: "Failed to change user role",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
