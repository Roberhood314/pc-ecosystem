import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC Ecosystem",
  description: "Secure Pi ecosystem hub and SoloHost node runtime."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
