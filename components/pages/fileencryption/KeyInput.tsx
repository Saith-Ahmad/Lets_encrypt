"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

interface KeyInputProps {
  keyValue: string;
  setKey: (key: string) => void;
  onAutoGenerate: () => void;
}

export default function KeyInput({ keyValue, setKey, onAutoGenerate }: KeyInputProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label className="text-sm text-gray-400 mb-2 block">Encryption Key</label>
        <Input
          value={keyValue}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your key (min 8 chars)"
          className="bg-[#0f172a] text-gray-200 py-5 border-gray-700 focus-visible:ring-yellow-400"
        />
      </div>
      <Button
        onClick={onAutoGenerate}
        variant="outline"
        className="border-yellow-500 text-black transition-colors mt-7"
      >
        <KeyRound className="mr-2 h-4 w-4" /> Auto Generate
      </Button>
    </div>
  );
}
