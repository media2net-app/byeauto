import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYE AUTO Workshop Management",
  description: "Professional workshop management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
} 