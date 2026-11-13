import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Thank you | JS Property Maintenance",
  description: "Thanks for getting in touch with JS Property Maintenance.",
  path: "/thank-you/",
  noindex: true,
});

export default function ThankYou() {
  return (
    <>
      <PageHero eyebrow="Received" title="Thank you">
        We&apos;ve received your details and will be in touch as soon as we can.
      </PageHero>
      <section className="section">
        <div className="container">
          <Link href="/" className="btn btn--solid">Back to home</Link>
        </div>
      </section>
    </>
  );
}
