import type { Metadata } from "next";
import { Bangers, DM_Sans } from "next/font/google";
import "./globals.css";
import DevReset from "@/components/DevReset";

const bangers = Bangers({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yonkoma",
  description: "Your day is a manga page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bangers.variable} ${dmSans.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        {children}
        <DevReset />
      </body>
    </html>
  );
}
