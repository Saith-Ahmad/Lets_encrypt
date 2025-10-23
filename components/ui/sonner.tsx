"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark" // ✅ Force dark mode
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-400" />,
        info: <InfoIcon className="size-4 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-400" />,
        error: <OctagonXIcon className="size-4 text-red-400" />,
        loading: <Loader2Icon className="size-4 animate-spin text-gray-300" />,
      }}
      toastOptions={{
        style: {
          background: "#0f172a", // dark navy background
          color: "#f8fafc", // light text
          border: "1px solid #334155",
          borderRadius: "8px",
        },
      }}
      {...props}
    />
  );
};
