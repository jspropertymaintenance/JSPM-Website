import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Managed Property Maintenance Plans | Coming Soon | JS Property Maintenance",
  description:
    "Managed maintenance plans for landlords, letting agents and serviced accommodation operators across Teesside and the North East. Coming soon.",
  path: "/managed-maintenance/",
});

const expect = [
  "Regular Property MOT inspections with RAG photo reports",
  "Planned and reactive maintenance managed through one point of contact",
  "An online client portal to request work and track progress",
  "Full reporting and coordination across every trade",
];

export default function ManagedMaintenance() {
  return (
    <>
      <PageHero eyebrow="Coming soon" title="Managed maintenance">
        A complete, structured maintenance service for landlords, letting agents and
        serviced accommodation operators, launching soon.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What to expect</h2>
          </div>
          <div className="grid grid--4">
            {expect.map((t) => (
              <div className="card" key={t}>
                <span className="card__icon">
                  <CheckIcon />
                </span>
                <p style={{ color: "var(--paper)" }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <h2>In the meantime</h2>
          </div>
          <div className="grid grid--2">
            <div className="card card--feature">
              <h3>Book a one-off Property MOT</h3>
              <p>Get a full condition and safety check of your property today.</p>
              <Link href="/#property-mot" className="btn btn--solid" style={{ marginTop: "2rem" }}>
                Get a Property MOT quote <ArrowIcon />
              </Link>
            </div>
            <div className="card card--feature">
              <h3>Register your interest</h3>
              <p>Be the first to hear when our plans launch.</p>
              <Link href="/contact/" className="btn btn--ghost" style={{ marginTop: "2rem" }}>
                Register interest
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
