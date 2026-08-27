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

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/courses/admin`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.clone().json();

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

export async function PATCH(req: Request) {
  const { id: courseId, status, rejectionReason, isReject } = await req.json();
  console.log({ status, rejectionReason });
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { msg: "Access token not found" },
        { status: 401 },
      );
    }

    // map status to what backend wants
    const statusMap: Record<string, string> = {
      mark_pending: "pending_review",
      publish: "published",
      reject: "rejected",
    };

    const patchBody = isReject
      ? JSON.stringify({ status: statusMap[status] })
      : JSON.stringify({ status: statusMap[status], rejectionReason });

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/courses/${courseId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: patchBody,
      },
    );

    const data = await response.clone().json();

    if (!response.ok) {
      const errorData = await response.clone().json();
      console.log(errorData);
      return NextResponse.json(errorData, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get courses error:", error);

    return NextResponse.json(
      {
        msg: "Failed to update course status",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
