import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnyVM Technologies - Coming Soon",
  description: "Make the cloud open. AnyVM VPS hosting, AnyGPT AI API, AnyWeb proxy, and AnyCode deployment platform launching soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/AnyVM-logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/AnyVM-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/AnyVM-logo.svg" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
