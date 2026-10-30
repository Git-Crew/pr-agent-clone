import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/env";

const SITE_URL = getSiteUrl();

const PUBLIC_ROUTES = ["/", "/auth/v1/login", "/auth/v1/register"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));
}
