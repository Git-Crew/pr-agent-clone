import type { MetadataRoute } from "next";

const SITE_URL = process.env.APP_URL ?? "http://localhost:3000";

const PUBLIC_ROUTES = ["/", "/auth/v1/login", "/auth/v1/register"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));
}
