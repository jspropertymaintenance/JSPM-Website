import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const paths = ["", "about/", "process/", "services/", "work-with-us/", "contact/", "request-a-quote/", "referrals/", "privacy/", "cookies/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}/${p}` }));
}
