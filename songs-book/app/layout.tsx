import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Amor Dei Ministries",
  description: "Sacred Telugu Christian songs archive for worship and devotion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} antialiased bg-[#eef2f5] dark:bg-[#0a0a0c] text-slate-900 dark:text-white transition-colors duration-500`}>
        {children}
      </body>
    </html>
  );
}

