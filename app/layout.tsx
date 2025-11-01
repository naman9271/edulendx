import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduLendX - Decentralized Education Lending",
  description: "A decentralized platform built on Kwala that lets students automatically earn scholarships or secure micro-loans using NFT-based academic identity and reputation",
  keywords: ["blockchain", "education", "lending", "scholarships", "NFT", "Kwala", "DeFi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
