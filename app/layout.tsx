import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inyange Industries",
  description: "Football, Friends, and Inyange. The Pride of Rwanda's Beverage Industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-calibre overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
