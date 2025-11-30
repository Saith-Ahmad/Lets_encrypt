import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";
import User from "@/models/user";
import File from "@/models/file";

// ✅ CREATE USER (POST)
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const file = await File.create(body);
    return NextResponse.json(file, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ GET ALL USERS (GET)
export async function GET() {
  try {
    await connectToDB();

    const files = await File.find().sort({ createdAt: -1 });
    return NextResponse.json(files, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
