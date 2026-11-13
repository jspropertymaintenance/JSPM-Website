import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import MotPromo from "@/components/MotPromo";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Planned Property Maintenance for Landlords | Teesside | JS Property Maintenance",
  description:
    "Scheduled repairs, decorating, property refreshes and end of tenancy works for landlords and letting agents across Teesside and the North East.",
  path: "/planned-maintenance/",
});

const included = [
  {
    title: "Scheduled minor repairs",
    text: "Sealant renewal, door and cupboard adjustments, loose fixtures, sticking windows, dripping taps and worn fittings, fixed before they become bigger problems.",
  },
  {
    title: "Cosmetic upkeep",
    text: "Decorating, touch-ups, filling and making good, flooring repairs and refreshing tired finishes to keep properties presentable.",
  },
  {
    title: "Property refreshes",
    text: "Full or partial redecoration, replacement flooring, updated fixtures and general improvements to raise a property's standard and appeal.",
  },
  {
    title: "End of tenancy works",
    text: "Snagging, repairs, decorating and making good between tenancies, to minimise void periods and get properties back on the market quickly.",
  },
  {
    title: "Compliance remedials",
    text: "Carrying out the works identified on gas, electrical and fire safety reports, through our qualified trade partners.",
  },
  {
    title: "Seasonal and preventive works",
    text: "Gutter clearing, exterior repairs, garden maintenance and pre-winter checks to protect the property year-round.",
  },
];

const tradesCovered = [
  "Plastering",
  "Decorating",
  "Flooring",
  "Joinery",
  "Plumbing",
  "Electrical",
  "Gardens",
  "General repairs",
];

const audiences = [
  {
    title: "Landlords",
    text: "Keep your properties in good condition, protect their value and reduce unexpected repair bills.",
  },
  {
    title: "Letting agents",
    text: "A reliable, single contractor to carry out planned works across your managed portfolio, with clear quotes and photo evidence on completion.",
  },
  {
    title: "Serviced accommodation operators",
    text: "Keep properties guest-ready with scheduled upkeep planned around your bookings.",
  },
];

const steps = [
  {
    title: "Request a quote",
    text: "Tell us about the property and the works needed, or send us a Property MOT report.",
  },
  {
    title: "Survey and quotation",
    text: "We assess the work and provide a clear, itemised quotation.",
  },
  {
    title: "Scheduling",
    text: "Once approved, we book the works at a time that suits you, your tenants or your guests.",
  },
  {
    title: "Completion and sign-off",
    text: "Works are completed to a professional standard, with before and after photos for your records.",
  },
];

export default function PlannedMaintenance() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Planned maintenance"
        actions={
          <Link href="/request-a-quote/" className="btn btn--solid">
            Request a quote <ArrowIcon />
          </Link>
        }
      >
        Scheduled upkeep that prevents problems, protects your investment and keeps your
        properties compliant and ready to let.
      </PageHero>

      <section className="section">
        <div className="container split split--top">
          <h2>What is planned maintenance?</h2>
          <p className="lead">
            Planned maintenance is work that&apos;s scheduled in advance rather than carried
            out in response to a breakdown. It covers the repairs, upkeep and improvements
            that keep a property in good condition, reduce the risk of costly emergencies and
            extend the life of fixtures, fittings and finishes. For landlords and letting
            agents, it means fewer surprises, better tenant satisfaction and properties that
            stay compliant between tenancies.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Planned maintenance</span>
            <h2>What&apos;s included</h2>
          </div>
          <div className="grid grid--3">
            {included.map((c, i) => (
              <div className="card" key={c.title}>
                <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Trades covered</h2>
          </div>
          <ul className="tick-list tick-list--cols">
            {tradesCovered.map((t) => (
              <li key={t}>
                <CheckIcon /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <h2>Who it&apos;s for</h2>
          </div>
          <div className="grid grid--3">
            {audiences.map((a) => (
              <div className="card" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How it works</h2>
          </div>
          <ol className="steps steps--4">
            {steps.map((s, i) => (
              <li className="card" key={s.title}>
                <span className="card__num">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MotPromo
        title="Plan ahead with a Property MOT"
        text="Not sure what your property needs? Our Property MOT identifies urgent issues and advisories in one visit, with a RAG photo report and itemised quotations, so you can plan maintenance with confidence."
      />

      <CtaBand
        title="Ready to plan your maintenance?"
        text="One point of contact for every trade, from quotation to completion."
        showCall={false}
      />
    </>
  );
}
