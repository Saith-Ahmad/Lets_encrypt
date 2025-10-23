"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TextDecryptionPage() {
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔓 Decrypt function
  const handleDecrypt = async () => {
    if (!encryptedText.trim()) return toast.error("Please enter encrypted text.");
    if (key.trim().length < 8) return toast.error("Key must be at least 8 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encryptedText, key }),
      });

      const data = await res.json();
      if (res.ok) {
        setDecrypted(data.decrypted);
        toast.success("Text decrypted successfully!");
      } else {
        toast.error(data.error || "Invalid key or encrypted text.");
      }
    } catch (err) {
      toast.error("Error decrypting text.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 📋 Copy decrypted text
  const handleCopy = async () => {
    await navigator.clipboard.writeText(decrypted);
    toast.success("Decrypted text copied to clipboard!");
  };

  return (
    <div className="w-full  text-gray-100 flex justify-start items-center">
      <Card className="w-full bg-[#1e293b]  border border-gray-700  max-w-6xl text-gray-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent text-2xl font-bold">
            <Unlock className="text-yellow-400" /> Text Decryption
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Encrypted Text Input */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Encrypted Text
            </label>
            <Textarea
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              placeholder="Paste your encrypted text here..."
              className="min-h-[150px] bg-[#0f172a] text-gray-200 border-gray-700 focus-visible:ring-yellow-400"
            />
          </div>

          {/* Key input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">
                Decryption Key
              </label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your decryption key"
                className="bg-[#0f172a] text-gray-200 border-gray-700 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

          {/* Decrypt Button */}
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
              "Decrypt Text"
            )}
          </Button>

          {/* Decrypted Output */}
          {decrypted && (
            <div className="mt-6">
              <label className="text-sm text-gray-400 mb-2 block">
                Decrypted Output
              </label>
              <div className="relative">
                <Textarea
                  value={decrypted}
                  readOnly
                  className="min-h-[120px] bg-[#0f172a] text-gray-200 border-gray-700"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  className="absolute top-3 right-3 border-yellow-500 text-yellow-900"
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
