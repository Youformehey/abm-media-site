import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABM Media - Your Vision, Our Inspiration",
  description: "Creative agency specializing in branding, web creation, content, graphic design, and video editing.",
  // J'AI TOUT SUPPRIMÉ ICI (icons: ...). 
  // Next.js va trouver src/app/icon.svg tout seul.
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