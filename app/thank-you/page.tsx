import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

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
