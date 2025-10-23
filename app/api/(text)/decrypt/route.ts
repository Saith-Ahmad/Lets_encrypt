import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
    console.log("request recieved")
  try {
    const { encryptedText, key } = await req.json();

    if (!encryptedText || !key) {
      return NextResponse.json({ error: "Both encrypted text and key are required" }, { status: 400 });
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return NextResponse.json({ error: "Invalid key or text" }, { status: 400 });
    }

    return NextResponse.json({ decrypted });
  } catch (error) {
    console.error("Decryption error:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
