"use client";
import { FileIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function FileUpload({ file, setFile }: FileUploadProps) {
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
    toast.success("File selected successfully!");
  };

  return (
    <>
      <label className="text-sm text-gray-400 mb-2 block">
        Upload file (only .txt, .doc, .docx, .pdf under 1MB)
      </label>
      <Input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="bg-[#0f172a] text-gray-200 file:text-gray-400 border-gray-700 focus-visible:ring-yellow-400 placeholder:text-white"
      />
      {file && (
        <div className="flex max-w-[300px] items-center gap-3 p-4 bg-[#0f172a] rounded-lg border border-gray-700 mt-2">
          <FileIcon className="w-12 h-12 text-yellow-400" />
          <div>
            <p className="text-sm font-medium text-gray-200">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}
    </>
  );
}
