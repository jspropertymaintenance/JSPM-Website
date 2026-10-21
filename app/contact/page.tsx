import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import NetlifyForm from "@/components/NetlifyForm";
import PageHero from "@/components/PageHero";
import { contactForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with JS Property Maintenance for questions, quotes or emergencies.",
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch">
        Questions, quotes or emergencies. Send us a message and we'll reply as soon as we can.
      </PageHero>
      <section className="section">
        <div className="container split split--top">
          <NetlifyForm config={contactForm} />
          <ContactDetails />
        </div>
      </section>
    </>
  );
}
