import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Configuration des métadonnées (SEO + Icônes)
export const metadata: Metadata = {
  title: "ABM Media",
  description: "Your Vision, Our Inspiration",
  icons: {
    icon: [
      {
        url: "/logonavbar.png?v=2", // Le ?v=2 force la mise à jour si tu changes le logo
        href: "/logonavbar.png?v=2",
      },
    ],
    apple: "/logonavbar.png?v=2", // Pour les iPhones/iPad
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Sécurité supplémentaire pour l'icône de l'onglet */}
        <link rel="icon" href="/logonavbar.png?v=2" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased bg-[#020202]`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}