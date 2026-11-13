import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import NetlifyForm from "@/components/NetlifyForm";
import PageHero from "@/components/PageHero";
import { quoteForm } from "@/lib/forms";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Request a quote | JS Property Maintenance",
  description:
    "Request a property maintenance quote from JS Property Maintenance.",
  path: "/request-a-quote/",
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Free quote" title="Request a quote">
        Share a few details about the job and we'll follow up with next steps. If it's urgent, give us a call.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <NetlifyForm config={quoteForm} />
          <ContactDetails />
        </div>
      </section>
    </>
  );
}
