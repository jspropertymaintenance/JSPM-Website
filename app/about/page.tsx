import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ArrowIcon } from "@/components/Icons";
import TradesCarousel from "@/components/TradesCarousel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Planned and reactive property maintenance across Teesside and the North East, with every trade through one point of contact.",
};

const trades = [
  { title: "Joinery", text: "Doors, locks, skirting, architraves and joinery repairs." },
  { title: "Plumbing", text: "Leaks, taps, toilets and plumbing faults, fixed fast." },
  { title: "Electrics", text: "Fault finding, sockets, lighting and EICR remedial work." },
  { title: "Decorating", text: "Interior and exterior decorating, from prep to finish." },
  { title: "Repairs", text: "Reactive and planned repairs across every part of the property." },
  { title: "Kitchens", text: "Kitchen upgrades, repairs and fitting." },
  { title: "Bathrooms", text: "Bathroom upgrades, installations and resealing." },
];

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
          <TradesCarousel title="Trades we coordinate" slides={trades} />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container split">
          <div>
            <span className="eyebrow">Where we cover</span>
            <h2>Teesside and surrounding areas</h2>
            <p className="lead">
              Based locally and working across Teesside and the North East every
              day, we know the area&apos;s housing stock, from Victorian terraces to
              new builds. Our trades are never far from your property, so jobs keep
              moving.
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
