import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { encrypted, key } = await req.json();

    if (!encrypted || !key) {
      return NextResponse.json({ error: "Encrypted data and key required" }, { status: 400 });
    }

    const encryptedBuffer = Buffer.from(encrypted, "base64");

    const iv = encryptedBuffer.subarray(0, 16);
    const data = encryptedBuffer.subarray(16);

    const hashedKey = crypto.createHash("sha256").update(key).digest();
    const decipher = crypto.createDecipheriv("aes-256-cbc", hashedKey, iv);

    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

    // Return as Base64 for safe transmission
    return NextResponse.json({ decrypted: decrypted.toString("base64") });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
