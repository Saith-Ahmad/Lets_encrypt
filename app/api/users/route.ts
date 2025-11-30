import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";
import User from "@/models/user";

// ✅ CREATE USER (POST)
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ GET ALL USERS (GET)
export async function GET() {
  try {
    await connectToDB();

    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
