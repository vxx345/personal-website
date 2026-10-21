import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：构建产物在 out/，可直接丢 Cloudflare Pages / OSS / 任意 CDN
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // 关掉左下角的 Next.js 开发指示器（那个 "N" 圆钮），避免压住 BGM 按钮
  devIndicators: false,
};

export default nextConfig;
