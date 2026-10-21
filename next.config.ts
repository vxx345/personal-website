import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：构建产物在 out/，可直接丢 Cloudflare Pages / OSS / 任意 CDN
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
