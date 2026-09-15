import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Packaged Commodity Compliance Checker | SIH 2026",
  description:
    "Automated Legal Metrology (Packaged Commodities) Rules 2011 compliance verification platform for Smart India Hackathon 2026 (PS SIH26034).",
  keywords: [
    "Legal Metrology",
    "Packaged Commodities Rules 2011",
    "SIH 2026",
    "OCR Compliance",
    "Ministry of Consumer Affairs",
    "FSSAI Label Validator"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
