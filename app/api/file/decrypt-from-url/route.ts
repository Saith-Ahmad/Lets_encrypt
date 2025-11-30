// app/api/file/decrypt-from-url/route.ts
import { NextResponse } from "next/server";
import { createDecipheriv, scryptSync } from "crypto";
import fetch from "node-fetch"; // Make sure to install: npm i node-fetch

export async function POST(req: Request) {
  try {
    const { url, key } = await req.json();

    if (!url || !key) {
      return NextResponse.json({ error: "URL and key are required" }, { status: 400 });
    }

    // 1️⃣ Fetch the encrypted file from Cloudinary
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch the file from URL");

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length < 32) throw new Error("Corrupted encrypted file!");

    // 2️⃣ Extract salt, IV, and ciphertext
    const salt = buffer.subarray(0, 16);
    const iv = buffer.subarray(16, 32);
    const encryptedData = buffer.subarray(32);

    // 3️⃣ Derive key using scrypt (same as encryption)
    const derivedKey = scryptSync(key, salt, 32);

    // 4️⃣ Decrypt AES-256-CBC
    const decipher = createDecipheriv("aes-256-cbc", derivedKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    // 5️⃣ Return decrypted file
    return new NextResponse(decrypted, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="decrypted_file"',
      },
    });
  } catch (err: any) {
    console.error("Decryption error:", err);
    return NextResponse.json({ error: err.message || "Decryption failed" }, { status: 500 });
  }
}
