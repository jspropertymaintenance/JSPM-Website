import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import PageHero from "@/components/PageHero";
import SubcontractorForm from "@/components/SubcontractorForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Work With Us | Subcontractor Trades | JS Property Maintenance",
  description:
    "Qualified trades across Teesside and the North East: apply to join JS Property Maintenance's subcontractor network.",
  path: "/work-with-us/",
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow="For trades" title="Work with us">
        We&apos;re always looking for reliable, qualified tradespeople across Teesside and the
        North East. Complete the form below with your details and documents. We review every
        application and will be in touch to let you know the outcome.
      </PageHero>
      <section className="section">
        <div className="container apply__layout">
          <SubcontractorForm />
          <aside className="apply__aside">
            <ContactDetails />
          </aside>
        </div>
      </section>
    </>
  );
}
