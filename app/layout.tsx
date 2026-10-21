import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site.config";

export const metadata: Metadata = {
  title: `${site.name} · 后端 / AI Agent`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} · 后端 / AI Agent`,
    description: site.tagline,
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · 后端 / AI Agent`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
