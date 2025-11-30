import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/db/db";
import File from "@/models/file";

export async function GET() {
  try {
    await connectToDB();

    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const userId = user.id;

    // Find files where current user is in allowedUsers
    const files = await File.find({ allowedUsers: userId }).sort({ createdAt: -1 });

    return NextResponse.json(files, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
