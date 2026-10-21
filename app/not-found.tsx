import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="Page not found">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </PageHero>
      <section className="section">
        <div className="container btn-row">
          <Link href="/" className="btn btn--solid">Back to home</Link>
          <Link href="/contact/" className="btn btn--ghost">Contact us</Link>
        </div>
      </section>
    </>
  );
}
