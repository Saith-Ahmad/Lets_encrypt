// /app/api/files/history/route.ts
import { NextResponse } from "next/server";
import { auth, currentUser } from '@clerk/nextjs/server'
import { connectToDB } from "@/lib/db/db";
import File from "@/models/file";

export async function GET() {
  try {
    await connectToDB();

    const user = await currentUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const userId = user.id;
    console.log("user.id", userId)

    // Find files owned by this user, newest first
    const files = await File.find({ owner: userId }).sort({ createdAt: -1 });

    return NextResponse.json(files, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
