"use client";

import { useState } from "react";

export default function TestDecryptPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Encrypted Cloudinary raw file URL
  const ENCRYPTED_FILE_URL =
    "https://res.cloudinary.com/dqxi5d3o7/raw/upload/v1764454553/NexoraFixes_Portfolio%20-%20Copy.docx.enc.txt";

  // Helper: convert ArrayBuffer to Uint8Array
  const ab2u8 = (ab: ArrayBuffer) => new Uint8Array(ab);

  // Helper: convert string to ArrayBuffer
  const str2ab = (str: string) => new TextEncoder().encode(str);

  const handleDecrypt = async () => {
  if (!key) return alert("Enter your key!");

  try {
    setLoading(true);
    setDownloadUrl(null);

    const res = await fetch("/api/file/decrypt-from-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: ENCRYPTED_FILE_URL, key }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Decryption failed!");
    }

    const decryptedBlob = await res.blob();
    const url = URL.createObjectURL(decryptedBlob);
    setDownloadUrl(url);
    alert("Decryption successful!");
  } catch (err) {
    console.error(err);
    alert("Decryption failed: Wrong key or corrupted file");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white mb-6">
          🔐 Test Cloudinary AES Decryption
        </h1>

        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Enter decryption key..."
        />

        <button
          onClick={handleDecrypt}
          disabled={loading || key.length < 1}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4 disabled:opacity-50"
        >
          {loading ? "Decrypting..." : "Decrypt File"}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="decrypted_output"
            className="w-full block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-4"
          >
            Download Decrypted File
          </a>
        )}
      </div>
    </div>
  );
}
