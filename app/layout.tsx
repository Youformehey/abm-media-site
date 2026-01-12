import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// On définit les métadonnées ici (Titre du site, etc.)
export const metadata: Metadata = {
  title: "ABM Media",
  description: "Your Vision, Our Inspiration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* C'est ici qu'on force l'icône manuellement 👇 */}
      <head>
        <link rel="icon" href="/logo-abm-final.svg" sizes="any" />
      </head>
      {/* 👆 Fin de l'ajout manuel */}

      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}