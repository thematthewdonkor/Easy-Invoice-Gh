import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/components/QueryClientProvider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Invoice app",
  description: "Create invoice for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ClerkProvider afterSignOutUrl="/">
        <html lang="en">
          <body className={`${urbanist.variable} font-sans`}>{children}</body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  );
}
