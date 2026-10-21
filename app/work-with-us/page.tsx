import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import NetlifyForm from "@/components/NetlifyForm";
import PageHero from "@/components/PageHero";
import { tradeForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Work with us",
  description: "Join the JS Property Maintenance trade network.",
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="For trades" title="Work with us">
        We're growing our trade network to keep up with demand. If you're an experienced, professional contractor and want to work with us, fill in the form and we'll be in touch about next steps.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <NetlifyForm config={tradeForm} />
          <ContactDetails />
        </div>
      </section>
    </>
  );
}
