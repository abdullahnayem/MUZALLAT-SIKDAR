import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    // A package-lock.json exists in the home directory; pin the root to this project.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  poweredByHeader: false,
  experimental: {
    // Real 404 status for any unmatched URL (the root layout sits under the [locale] segment).
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
