import type { Metadata } from "next";
import NetlifyForm from "@/components/NetlifyForm";
import PageHero from "@/components/PageHero";
import { referralForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Referrals",
  description: "Refer a landlord, agent or neighbour to JS Property Maintenance and earn 10% commission when they accept a quote.",
};

const how = [
  { title: "Refer someone", text: "Send us their details using the form below. Let them know we'll be in touch." },
  { title: "We quote", text: "We contact them, understand the job and provide a clear quote." },
  { title: "You earn 10%", text: "If they accept the quote, you earn 10% commission. There's no limit on referrals." },
];

export default function Referrals() {
  return (
    <>
      <PageHero eyebrow="Referral programme" title="Know someone who needs us? Earn 10%">
        Refer a landlord, letting agent or neighbour. When they accept a quote, you
        earn 10% commission.
      </PageHero>
      <section className="section" id="how-it-works">
        <div className="container">
          <h2>How it works</h2>
          <ol className="steps" style={{ marginTop: "2rem" }}>
            {how.map((s, i) => (
              <li className="card" key={s.title}>
                <span className="card__num">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section--line">
        <div className="container split split--top">
          <div>
            <h2>Make a referral</h2>
            <p className="lead">
              Tell us who you&apos;re referring and how to reach them. We&apos;ll take it
              from there and keep you updated.
            </p>
          </div>
          <NetlifyForm config={referralForm} />
        </div>
      </section>
    </>
  );
}
