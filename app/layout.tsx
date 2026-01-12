import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABM Media",
  description: "Your Vision, Our Inspiration",
  icons: {
    icon: '/logo-abm-final.svg', // On pointe vers le fichier dans public
    shortcut: '/logo-abm-final.svg',
    apple: '/logo-abm-final.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo-abm-final.svg',
    },
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