import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "./components/BackgroundWrapper";
import ClientImageOverlay from "./components/ClientImageOverlay";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnyVM - Open Source Cloud Services",
  description: "Experience transparent, accessible cloud services without vendor lock-in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased relative`}
      >
        <BackgroundWrapper />
        <ClientImageOverlay src="/sample.png" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
