import type { Metadata } from "next";
import "./globals.css";
import { CompanyProvider } from "@/lib/context/CompanyContext";

export const metadata: Metadata = {
  title: "Sandra Casey - Roofing Safety Platform",
  description: "OSHA Compliance Management for Multi-Company Roofing Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CompanyProvider>
          {children}
        </CompanyProvider>
      </body>
    </html>
  );
}
