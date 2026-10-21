import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Planned and reactive property maintenance across Teesside and the North East, with every trade through one point of contact.",
};

const trades = ["Joinery", "Plumbing", "Electrics", "Decorating", "Repairs", "Kitchens", "Bathrooms"];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Your long-term maintenance partner">
        One call, clear communication and work completed when promised.
      </PageHero>

      <section className="section">
        <div className="container split split--top">
          <div>
            <p className="lead" style={{ color: "var(--paper)" }}>
              JS Property Maintenance delivers planned and reactive maintenance across
              Teesside and the North East for landlords, letting agents, serviced
              accommodation operators and homeowners.
            </p>
            <p className="muted">
              Every trade is handled through a single point of contact, so you never
              have to juggle multiple contractors. We&apos;re built for property
              professionals who value reliability and organisation, and who want a
              maintenance partner for the long run.
            </p>
            <div className="btn-row" style={{ marginTop: "2rem" }}>
              <Link href="/services/" className="btn btn--solid">
                Explore all services <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="card">
            <h3>Trades we coordinate</h3>
            <ul className="contact-list" style={{ gap: "0.6rem", marginTop: "1rem" }}>
              {trades.map((t) => (
                <li key={t} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                  <CheckIcon className="" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container split">
          <div>
            <span className="eyebrow">Where we cover</span>
            <h2>Teesside and surrounding areas</h2>
            <p className="lead">
              From terraces and student lets to new-build homes and full portfolios.
            </p>
          </div>
          <ul className="areas">
            {site.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
