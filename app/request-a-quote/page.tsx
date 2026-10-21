import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import NetlifyForm from "@/components/NetlifyForm";
import PageHero from "@/components/PageHero";
import { quoteForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Request a property maintenance quote from JS Property Maintenance.",
};

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
