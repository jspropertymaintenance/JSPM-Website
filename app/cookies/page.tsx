import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cookies | JS Property Maintenance",
  description:
    "How the JS Property Maintenance website uses cookies.",
  path: "/cookies/",
});

export default function Cookies() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookies" />
      <section className="section">
        <div className="container prose">
          <p>
            This website does not use advertising or tracking cookies, and does not set
            any cookies of its own. If that changes, we&apos;ll update this page and ask
            for your consent where required.
          </p>
          <p>
            Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
