import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Secure E-Voting System | SIH 2026",
  description: "Complete 18-page digital voting platform with biometric authentication, live election browsing, digital QR vote receipts, and real-time analytics for SIH 2026.",
  keywords: ["SIH 2026", "E-Voting", "Digital Voting", "Smart India Hackathon", "Aadhar Verification", "Biometric Registration"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0a0e27] text-[#e0e0ff] antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
