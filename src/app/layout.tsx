import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "有机化学反应机理学习平台",
  description: "交互式有机化学反应机理学习工具，深入理解每一步反应历程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-6 text-center text-sm text-muted">
          <p>有机化学反应机理学习平台 &copy; 2026</p>
        </footer>
      </body>
    </html>
  );
}
