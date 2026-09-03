import type { MetadataRoute } from "next";
import { SITE_URL } from "./config/seo";
import { conditions } from "./data";

const staticPaths = [
  "",
  "/about",
  "/conditions",
  "/drugs",
  "/health-news",
  "/privacy",
  "/subscribe",
  "/symptom-checker",
  "/wellbeing",
];

function conditionSlug(condition: string) {
  return condition.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");
}

/** Search-engine page list served automatically at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticPaths.map((path, index) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.7,
    })),
    ...conditions.map((condition) => ({
      url: `${SITE_URL}/conditions/${conditionSlug(condition)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
