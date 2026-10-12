import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML, CSS and JS to out/, which the
// cPanel deployment copies to public_html.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
