import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
    console.log("request recieved")
  try {
    const { text, key } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const secretKey = key || CryptoJS.lib.WordArray.random(16).toString();
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();

    return NextResponse.json({ encrypted, key: secretKey });
  } catch (error) {
    console.error("Encryption error:", error);
    return NextResponse.json({ error: "Encryption failed" }, { status: 500 });
  }
}


export async function GET(req: Request) {
    console.log("request recieved")
    return NextResponse.json("HelloWorld");
}
