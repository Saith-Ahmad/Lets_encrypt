import type { Metadata } from "next";
import { Poppins, Merriweather } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import LenisProvider from "@/components/global/LenisProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Let's Encrypt",
  description: "Protect your data with Let's Encrypt's next-generation encryption tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
     appearance={{
        baseTheme: dark, // Start from dark mode
        variables: {
          colorBackground: "#0f172a", // Dark blue background
          colorText: "#f8fafc", // Light text
          colorPrimary: "#facc15", // Yellow accent
          colorInputBackground: "#1e293b", // Input field background
          colorInputText: "#f8fafc",
          colorShimmer: "#facc15",
        },
        elements: {
          card: "bg-[#0f172a]/90 border border-[#334155] shadow-xl", // Dark bluish card
          formButtonPrimary:
            "bg-[#facc15] hover:bg-[#fbbf24] text-black font-semibold transition", // Yellow accent
          footerActionText: "text-gray-400",
          footerActionLink: "text-[#facc15] hover:underline",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          formFieldInput:
            "bg-[#1e293b] text-white border border-[#334155] focus:border-[#facc15]",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${poppins.variable} ${merriweather.variable} antialiased`}
        >
          <LenisProvider>

            <Header />
            {children}
            <Toaster />
            <Footer />
            
          </LenisProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
