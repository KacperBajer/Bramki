import { deleteSession } from "@/lib/sessions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const token = headers.get("token");

  try {
    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 400 });
    }

    const res = await deleteSession(token)

    if(res === 'failed') {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
