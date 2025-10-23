import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const key = formData.get("key") as string;

    if (!file || !key) {
      return NextResponse.json({ error: "File and key required" }, { status: 400 });
    }

    // Read file as binary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Derive encryption key
    const hashedKey = crypto.createHash("sha256").update(key).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", hashedKey, iv);

    // Encrypt
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    // Return as Base64 with IV prepended
    const result = Buffer.concat([iv, encrypted]).toString("base64");

    return NextResponse.json({ encrypted: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Encryption failed" }, { status: 500 });
  }
}
