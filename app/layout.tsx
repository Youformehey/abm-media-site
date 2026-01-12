import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABM Media - Your Vision, Our Inspiration",
  description: "Creative agency specializing in branding...",
  icons: {
    icon: '/icon.svg?v=1',      // <--- AJOUTE ÇA
    shortcut: '/icon.svg?v=1',  // <--- AJOUTE ÇA
    apple: '/icon.svg?v=1',     // <--- AJOUTE ÇA
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}