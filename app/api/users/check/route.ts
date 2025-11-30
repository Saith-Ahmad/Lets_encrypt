import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    // ❗ Mongoose correct method
    const user = await User.findOne({ email });

    return NextResponse.json({ exists: !!user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
