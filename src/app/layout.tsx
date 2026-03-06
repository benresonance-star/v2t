import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recite - Voice-to-Text Reference Checker",
  description: "Check your speech against a reference text",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Recite",
  },
  icons: {
    icon: "/icon.png?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
