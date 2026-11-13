import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import NetlifyForm from "@/components/NetlifyForm";
import PageHero from "@/components/PageHero";
import { contactForm } from "@/lib/forms";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us | JS Property Maintenance | Teesside",
  description:
    "Get in touch with JS Property Maintenance for property maintenance, repairs and Property MOT inspections across Teesside and the North East.",
  path: "/contact/",
});

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
