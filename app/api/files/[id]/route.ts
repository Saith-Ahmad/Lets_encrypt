import { connectToDB } from "@/lib/db/db";
import File from "@/models/file";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔥 FIX: Await the params promise
    const { id } = await context.params;

    await connectToDB();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      );
    }

    const updated = await File.findByIdAndUpdate(
      id,
      { $addToSet: { allowedUsers: userId } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });

  } catch (err: any) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
