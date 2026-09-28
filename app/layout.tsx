import type React from "react";
import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Made with App Studio",
  description: "PC Ecosystem — cổng kết nối an toàn tới các module trong hệ sinh thái Pi.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#f4f6f8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${GeistMono.variable} bg-background`}>
      <body><AppWrapper>{children}</AppWrapper></body>
    </html>
  );
}
