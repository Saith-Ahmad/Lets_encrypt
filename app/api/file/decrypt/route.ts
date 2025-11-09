import { NextResponse } from "next/server";
import { createDecipheriv, scryptSync } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const key = formData.get("key") as string;

    if (!file || !key) {
      return NextResponse.json({ error: "File and key are required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length < 32) throw new Error("Corrupted file!");

    const salt = buffer.subarray(0, 16);
    const iv = buffer.subarray(16, 32);
    const encryptedData = buffer.subarray(32);

    const derivedKey = scryptSync(key, salt, 32);
    const decipher = createDecipheriv("aes-256-cbc", derivedKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    return new NextResponse(decrypted, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (err: any) {
    console.error("Decryption error:", err);
    return NextResponse.json({ error: err.message || "Decryption failed" }, { status: 500 });
  }
}
