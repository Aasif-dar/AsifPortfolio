import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder screenshots/avatar are SVG until real assets are added.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
