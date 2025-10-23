"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, KeyRound, Shield, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TextEncryptionPage() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Auto-generate random 16-character key
  const handleAutoGenerate = () => {
    const randomKey = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setKey(randomKey);
  };

  // 🔥 Encrypt function
  const handleEncrypt = async () => {
    if (!text.trim()) return toast.error("Please enter text to encrypt.");
    if (text.trim().split(" ").length > 200) return toast.error("Max 200 words allowed.");
    if (key.trim().length < 8) return toast.error("Key must be at least 8 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, key }),
      });

      const data = await res.json();
      if (res.ok){
         setEncrypted(data.encrypted);
         toast.success("Text encrypted successfully!");
      }
      else toast.error(data.error || "Encryption failed");
    } catch (err) {
      toast.error("Error encrypting text");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 📋 Copy encrypted text
  const handleCopy = async () => {
    await navigator.clipboard.writeText(encrypted);
    toast.success("Encrypted text copied to clipboard!");
  };

  return (
    <div className="w-full  overflow-hidden text-gray-100 flex justify-start items-center">
      <Card className=" w-full bg-[#1e293b]  border border-gray-700  max-w-6xl text-gray-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent text-2xl font-bold">
            <Lock className="text-yellow-400" /> Text Encryption
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Enter text to encrypt (max 200 words)
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[150px] bg-[#0f172a] text-gray-200 border-gray-700 focus-visible:ring-yellow-400"
            />
          </div>

          {/* Key input + Auto-generate */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Encryption Key</label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your key (min 8 chars)"
                className="bg-[#0f172a] text-gray-200 border-gray-700 focus-visible:ring-yellow-400"
              />
            </div>
            <Button
              onClick={handleAutoGenerate}
              variant="outline"
              className="border-yellow-500 text-black  transition-colors mt-6"
            >
              <KeyRound className="mr-2 h-4 w-4" /> Auto Generate
            </Button>
          </div>

          {/* Encrypt Button */}
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
              "Encrypt Text"
            )}
          </Button>

          {/* Encrypted Output */}
          {encrypted && (
            <div className="mt-6">
              <label className="text-sm text-gray-400 mb-2 block">Encrypted Output</label>
              <div className="relative">
                <Textarea
                  value={encrypted}
                  readOnly
                  className="min-h-[120px] bg-[#0f172a] text-gray-200 border-gray-700"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  className="absolute top-3 right-3 border-yellow-500 text-yellow-900 "
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
