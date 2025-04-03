import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/db/action";

export async function POST(request: NextRequest) {
  try {
    const user = await createUser();
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Create user request failed" },
      { status: 500 }
    );
  }
}
