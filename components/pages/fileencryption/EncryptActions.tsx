"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface EncryptActionsProps {
  loading: boolean;
  onEncrypt: () => void;
  onDownload: () => void;
  downloadUrl: string | null;
}

export default function EncryptActions({ loading, onEncrypt, onDownload, downloadUrl }: EncryptActionsProps) {
  return (
    <>
      <Button
        onClick={onEncrypt}
        disabled={loading || Boolean(downloadUrl)}        
        className={cn(
          "w-full py-2 text-base bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition",
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
          onClick={onDownload}
          variant="outline"
          className="w-full mt-1 border-yellow-500 bg-yellow-500/10 hover:bg-yellow-600/10"
        >
          <Download className="h-4 w-4 mr-2" /> Download Encrypted File
        </Button>
      )}
    </>
  );
}
