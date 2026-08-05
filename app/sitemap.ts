import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/create",
    "/transform",
    "/operate",
    "/runtime",
    "/proof",
    "/studio",
    "/legal/privacy",
    "/legal/terms",
  ];

  return routes.map((route) => ({
    url: `https://evoq.example${route}`,
    lastModified: new Date(),
  }));
}
