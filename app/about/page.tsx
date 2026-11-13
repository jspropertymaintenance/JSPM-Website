import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CalendarIcon, CheckIcon, ShieldIcon, SlidersIcon, UserIcon } from "@/components/Icons";
import ReviewsStrip from "@/components/ReviewsStrip";
import TradesCarousel from "@/components/TradesCarousel";
import { advantages, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us | JS Property Maintenance | Teesside",
  description:
    "Your long-term maintenance partner: one point of contact for every trade, serving landlords and letting agents across Teesside and the North East.",
  path: "/about/",
});

const trades = [
  { title: "Joinery", text: "Doors, locks, skirting, architraves and joinery repairs." },
  { title: "Plumbing", text: "Leaks, taps, toilets and plumbing faults, fixed fast." },
  { title: "Electrics", text: "Fault finding, sockets, lighting and EICR remedial work." },
  { title: "Decorating", text: "Interior and exterior decorating, from prep to finish." },
  { title: "Repairs", text: "Reactive and planned repairs across every part of the property." },
  { title: "Kitchens", text: "Kitchen upgrades, repairs and fitting." },
  { title: "Bathrooms", text: "Bathroom upgrades, installations and resealing." },
];

const advantageIcons = [CalendarIcon, SlidersIcon, ShieldIcon, UserIcon];

const standards = [
  { title: "Fully insured", text: "£2m public liability insurance on every job." },
  { title: "Clear, itemised quotations", text: "You know the cost before any work starts." },
  { title: "Kept informed", text: "Booking confirmation and updates from start to finish." },
  { title: "Photo evidence", text: "Before and after photos on every job." },
  { title: "Work completed when promised", text: "And checked before we sign it off." },
  {
    title: "Straightforward invoicing",
    text: "A job summary and invoice, with nothing left for you to chase.",
  },
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
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Why JSPM</span>
              <h2>Our advantages</h2>
            </div>
            <p className="lead">
              Clear processes, vetted trades and consistent standards across all of
              our maintenance work.
            </p>
          </div>
          <div className="grid grid--4">
            {advantages.map((a, i) => {
              const Icon = advantageIcons[i];
              return (
                <div className="card" key={a.title}>
                  <span className="card__icon">
                    <Icon />
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Our standards</span>
              <h2>What you can expect on every job</h2>
            </div>
            <p className="lead">Clear standards, so you always know what you&apos;re getting.</p>
          </div>
          <div className="grid grid--3">
            {standards.map((st) => (
              <div className="card" key={st.title}>
                <span className="card__icon">
                  <CheckIcon />
                </span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </div>
            ))}
          </div>
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

      <ReviewsStrip />

      <CtaBand />
    </>
  );
}
