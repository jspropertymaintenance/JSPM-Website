import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy" />
      <section className="section">
        <div className="container prose">
          <h2>What we collect</h2>
          <p>
            When you use a form on this website we collect the details you enter, such
            as your name, contact details, property postcode and information about your
            enquiry.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your details only to respond to your enquiry, provide quotes, carry
            out and administer work, and handle trade or referral applications. Your
            details may be shared with a member of our team or a trade working on your
            job. We do not sell your information.
          </p>
          <h2>Storage</h2>
          <p>
            Form submissions are processed by our website host, Netlify, and kept only
            for as long as needed for the purposes above.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the personal information we hold
            about you by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
