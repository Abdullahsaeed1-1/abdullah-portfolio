import type { MetadataRoute } from "next";

import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/journey",
    "/contact",
    ...featuredProjects.map((project) => `/work/${project.slug}`)
  ];

  return routes.map((route) => ({ url: `${site.url}${route}`, changeFrequency: "monthly" }));
}
