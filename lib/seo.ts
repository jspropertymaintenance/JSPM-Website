import type { Metadata } from "next";
import { site } from "./site";

// Builds a page's title, description, canonical URL and social sharing
// preview (Open Graph), so every page gets the same treatment.
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} logo` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
    ...(noindex && { robots: { index: false } }),
  };
}
