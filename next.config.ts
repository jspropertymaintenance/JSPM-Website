import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: Netlify serves the `out` directory directly and
  // detects the Netlify Forms embedded in the generated HTML.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
