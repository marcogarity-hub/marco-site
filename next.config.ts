import type { NextConfig } from "next";

// Static export: the whole site is plain HTML and CSS, so it is fast,
// free to host, and has nothing to break between updates.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
