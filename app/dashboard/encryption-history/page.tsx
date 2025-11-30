"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn UI skeleton

interface FileType {
  _id: string;
  filename: string;
  cloudinaryFileUrl: string;
  createdAt: string;
}

export default function EncryptionHistoryPage() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decryptingFileId, setDecryptingFileId] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [popupFile, setPopupFile] = useState<FileType | null>(null);

  // Fetch user's files from API
  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/files/history");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch files");
        setFiles(data);
      } catch (err: any) {
        console.error(err);
        setError("Unable to get files");
        toast.error("Failed to fetch your files");
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  const handleDecrypt = async () => {
    if (!key || !popupFile) return toast.error("Enter the key!");

    try {
      setDecryptingFileId(popupFile._id);
      setDownloadUrl(null);

      const res = await fetch("/api/file/decrypt-from-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: popupFile.cloudinaryFileUrl, key }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Decryption failed!");
      }

      const decryptedBlob = await res.blob();
      const url = URL.createObjectURL(decryptedBlob);
      setDownloadUrl(url);
      toast.success("Decryption successful!");
    } catch (err) {
      console.error(err);
      toast.error("Decryption failed: Wrong key or corrupted file");
    } finally {
      setDecryptingFileId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-xl font-medium text-white mb-6">Encryption History</h1>

      <div className="space-y-2">
        {/* Loading skeleton */}
        {loading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-16 w-full bg-gray-700 rounded-md animate-pulse"
            />
          ))}

        {/* Error */}
        {!loading && error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {/* No files */}
        {!loading && !error && files.length === 0 && (
          <p className="text-gray-400 text-center">No files found</p>
        )}

        {/* Files */}
        {!loading && !error &&
          files.map((file) => (
            <Card
              key={file._id}
              className="bg-[#333735] border-accent border-1 p-2 overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 min-w-0">
                <span className="text-white font-medium break-words truncate sm:truncate-none">
                  {file.filename}.enc.txt
                </span>
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  {new Date(file.createdAt).toLocaleString()}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => setPopupFile(file)}
                className="bg-accent text-black hover:bg-accent mt-2 sm:mt-0 w-full max-w-[200px]"
              >
                Decrypt
              </Button>
            </Card>
          ))}
      </div>

      {/* Decrypt Popup */}
      {popupFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-thin text-white mb-4">
              <span className="text-accent">Decrypt</span> "{popupFile.filename}.enc"
            </h2>
            <Input
              type="password"
              placeholder="Enter decryption key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mb-4 bg-gray-700 border-gray-600 text-white"
            />
            <div className="flex gap-2">
              <Button
                className="bg-accent text-black hover:bg-accent w-full flex-1"
                onClick={handleDecrypt}
                disabled={decryptingFileId === popupFile._id}
              >
                {decryptingFileId === popupFile._id ? "Decrypting..." : "Decrypt"}
              </Button>
              <Button
                className="bg-gray-600 hover:bg-gray-700 flex-1"
                onClick={() => {
                  setPopupFile(null);
                  setKey("");
                  setDownloadUrl(null);
                }}
              >
                Cancel
              </Button>
            </div>
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={popupFile.filename}
                className="w-full block text-center bg-[#333735] border-accent border-1 rounded-sm text-white py-2 hover:scale-[0.98] transition-all mt-4"
              >
                Download Decrypted File
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
