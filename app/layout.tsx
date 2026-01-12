import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABM Media",
  description: "Your Vision, Our Inspiration",
  // Pas besoin de préciser 'icons', Next.js détecte automatiquement favicon.ico dans le dossier app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* J'ai supprimé la balise <head> manuelle. Next.js gère tout. */}
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}