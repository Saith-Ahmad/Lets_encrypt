import { NextResponse } from "next/server";
import { randomBytes, createCipheriv, scryptSync } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const key = formData.get("key") as string;

    if (!file || !key) {
      return NextResponse.json({ error: "File and key are required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const salt = randomBytes(16);
    const iv = randomBytes(16);

    const derivedKey = scryptSync(key, salt, 32);

    const cipher = createCipheriv("aes-256-cbc", derivedKey, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    const finalBuffer = Buffer.concat([salt, iv, encrypted]);

    console.log(" salt", salt.length, "iv", iv.length, "enc", encrypted.length);

    // Return Base64
    return NextResponse.json({ encrypted: finalBuffer.toString("base64") });
  } catch (err: any) {
    console.error("Encryption error:", err);
    return NextResponse.json({ error: err.message || "Encryption failed" }, { status: 500 });
  }
}
