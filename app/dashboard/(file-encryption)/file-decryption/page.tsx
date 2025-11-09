"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileIcon, Unlock, Loader2, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function FileDecryptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = ["text/plain"];
    if (!allowedTypes.includes(selected.type)) {
      toast.error("Only encrypted .txt files are supported!");
      return;
    }

    if (selected.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB!");
      return;
    }

    setFile(selected);
    setDownloadUrl(null);
    toast.success("Encrypted file selected!");
  };

const handleDecrypt = async () => {
  if (!file) return toast.error("Please upload an encrypted file!");
  if (!key.trim()) return toast.error("Please enter your decryption key!");
  if (key.trim().length < 8)
    return toast.error("Key must be at least 8 characters long!");

  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", key);

    const res = await fetch("/api/file/decrypt", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Decryption failed!");
    }

    const decryptedBlob = await res.blob();
    const url = URL.createObjectURL(decryptedBlob);
    setDownloadUrl(url);

    toast.success("File decrypted successfully!");
  } catch (err: any) {
    toast.error(err.message || "Error decrypting file");
  } finally {
    setLoading(false);
  }
};



  const handleDownload = () => {
    if (!downloadUrl || !file) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name.replace(".enc.txt", "_decrypted");
    link.click();
    toast.success("File downloaded!");
  };

  return (
    <div className="w-full flex justify-start items-center text-gray-100">
      <Card className="w-full bg-[#1e293b] border border-gray-700 max-w-6xl text-gray-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent text-2xl font-bold">
            <Unlock className="text-yellow-400" /> File Decryption
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Upload encrypted file (.enc.txt only)
            </label>
            <Input
              type="file"
              accept=".enc,.txt"
              onChange={handleFileChange}
              className="bg-[#0f172a] text-gray-200 file:text-gray-400 border-gray-700 
                         focus-visible:ring-yellow-400 placeholder:text-white"
            />
          </div>

          {file && (
            <div className="flex max-w-[300px] items-center gap-3 p-4 bg-[#0f172a] rounded-lg border border-gray-700">
              <FileIcon className="w-12 h-12 text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">{file.name}</p>
                <p className="text-xs text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Decryption Key
            </label>
            <Input
              type="text"
              placeholder="Enter your decryption key (min 8 chars)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-[#0f172a] text-gray-200 py-5 border-gray-700 focus-visible:ring-yellow-400"
            />
          </div>

          <Button
            onClick={handleDecrypt}
            disabled={loading}
            className={cn(
              "w-full py-5 text-base bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Decrypting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileDown className="h-5 w-5" /> Decrypt File
              </span>
            )}
          </Button>

          {downloadUrl && (
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full mt-3 border-yellow-500 bg-yellow-500/10 hover:bg-yellow-600/10"
            >
              <FileDown className="h-4 w-4 mr-2" /> Download Decrypted File
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}