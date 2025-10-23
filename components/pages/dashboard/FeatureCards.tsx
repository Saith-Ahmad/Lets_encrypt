"use client";

import { Lock, Unlock, FileLock2, FileCode2 } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Text Encryption",
    icon: Lock,
    href: "/dashboard/text-encryption",
    color: "text-yellow-400",
    desc: "Encrypt your text instantly with AES security.",
  },
  {
    title: "Text Decryption",
    icon: Unlock,
    href: "/dashboard/text-decryption",
    color: "text-accent",
    desc: "Decrypt your encrypted text securely and fast.",
  },
  {
    title: "File Encryption",
    icon: FileLock2,
    href: "/dashboard/file-encryption",
    color: "text-accent",
    desc: "Protect files with high-end encryption algorithms.",
  },
  {
    title: "File Decryption",
    icon: FileCode2,
    href: "/dashboard/file-decryption",
    color: "text-accent",
    desc: "Restore encrypted files using your private key.",
  },
];

export default function FeatureCards() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map(({ title, icon: Icon, href, color, desc }) => (
        <div
          key={title}
          onClick={() => router.push(href)}
          className="cursor-pointer group bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
        >
          <div className={`mb-4 flex justify-center`}>
            <Icon className={`w-10 h-10 ${color} group-hover:scale-110 transition-transform`} />
          </div>
          <h3 className="text-lg font-semibold text-center text-yellow-400 mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-center text-sm">{desc}</p>
        </div>
      ))}
    </div>
  );
}
