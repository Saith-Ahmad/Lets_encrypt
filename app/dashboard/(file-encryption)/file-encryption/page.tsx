"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileIcon, Lock, KeyRound, Loader2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function FileEncryptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleAutoGenerate = () => {
    const randomKey = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setKey(randomKey);
    toast.success("Auto-generated secure key!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = [
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selected.type)) {
      toast.error("Only .txt, .doc, .docx, or .pdf files are allowed!");
      return;
    }

    if (selected.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB!");
      return;
    }

    setFile(selected);
    setDownloadUrl(null);
    toast.success("File selected successfully!");
  };

  const handleEncrypt = async () => {
    if (!file) return toast.error("Please upload a file!");
    if (!key.trim()) return toast.error("Please provide an encryption key!");
    if (key.trim().length < 8)
      return toast.error("Key must be at least 8 characters long!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", key);

      const res = await fetch("/api/file/encrypt", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Encryption failed");

      const binary = Uint8Array.from(atob(data.encrypted), (c) => c.charCodeAt(0));
      const blob = new Blob([binary], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      toast.success("File encrypted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Error encrypting file");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !file) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${file.name}.enc.txt`;
    link.click();
    toast.success("File downloaded!");
  };

  return (
    <div className="w-full flex justify-start items-center text-gray-100">
      <Card className="w-full bg-[#1e293b] border border-gray-700 max-w-6xl text-gray-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent text-2xl font-bold">
            <Lock className="text-yellow-400" /> File Encryption
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Upload file (only .txt, .doc, .docx, .pdf under 1MB)
            </label>
            <Input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="bg-[#0f172a] text-gray-200 file:text-gray-400 border-gray-700 focus-visible:ring-yellow-400 placeholder:text-white"
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

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">
                Encryption Key
              </label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your key (min 8 chars)"
                className="bg-[#0f172a] text-gray-200 py-5 border-gray-700 focus-visible:ring-yellow-400"
              />
            </div>
            <Button
              onClick={handleAutoGenerate}
              variant="outline"
              className="border-yellow-500 text-black transition-colors mt-7"
            >
              <KeyRound className="mr-2 h-4 w-4" /> Auto Generate
            </Button>
          </div>

          <Button
            onClick={handleEncrypt}
            disabled={loading}
            className={cn(
              "w-full py-5 text-base bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Encrypting...
              </span>
            ) : (
              "Encrypt File"
            )}
          </Button>

          {downloadUrl && (
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full mt-3 border-yellow-500 bg-yellow-500/10 hover:bg-yellow-600/10"
            >
              <Download className="h-4 w-4 mr-2" /> Download Encrypted File
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
