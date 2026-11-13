import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import MotPromo from "@/components/MotPromo";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Reactive Property Repairs for Landlords & Letting Agents | Teesside | JS Property Maintenance",
  description:
    "Fast, multi-trade response to leaks, faults and urgent repairs for landlords, letting agents and serviced accommodation across Teesside and the North East.",
  path: "/reactive-repairs/",
});

const covered = [
  {
    title: "Leaks and water damage",
    text: "Leaking pipes, taps, toilets, showers, and making good any resulting damage.",
  },
  {
    title: "Plumbing and drainage faults",
    text: "Blocked sinks, toilets and drains, faulty cisterns and loss of water supply.",
  },
  {
    title: "Heating and hot water",
    text: "No heating or hot water, boiler faults and radiator issues, attended by our Gas Safe registered partners.",
  },
  {
    title: "Electrical faults",
    text: "Power loss, tripping circuits and faulty sockets or lighting, attended by our qualified electricians.",
  },
  {
    title: "Doors, windows and security",
    text: "Broken locks, damaged doors and windows, and securing the property after a break-in.",
  },
  {
    title: "Damage and property remedials",
    text: "Storm damage, accidental damage, ceiling and wall repairs, and making good.",
  },
];

const priorities = [
  {
    title: "Emergency",
    examples: "Major leak, no heating in winter, unsafe electrics, property insecure",
    response: "Make safe within 24 hours",
  },
  {
    title: "Urgent",
    examples: "Partial loss of a service, minor leak, faulty locks",
    response: "Within 48–72 hours",
  },
  {
    title: "Routine",
    examples: "Non-urgent faults and repairs",
    response: "Scheduled within 5–10 working days",
  },
];

const agentPoints = [
  "Works orders accepted by email, with your reference on every job and invoice",
  "Work carried out within agreed authorisation limits, with quotations for anything above them",
  "Tenant liaison to arrange access, with you kept informed throughout",
  "Before and after photo evidence on completion",
  "Invoices to the agency or directly to the landlord, as you prefer",
];

const steps = [
  {
    title: "Report the repair",
    text: "Call us or send the details, photos and access arrangements.",
  },
  { title: "Triage", text: "We confirm the priority and arrange attendance." },
  {
    title: "Make safe or repair",
    text: "We resolve the issue, or make it safe and provide a quotation for the permanent repair.",
  },
  {
    title: "Completion report",
    text: "You receive confirmation of the work with photo evidence.",
  },
];

export default function ReactiveRepairs() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Reactive repairs"
        actions={
          <>
            <Link href="/request-a-quote/" className="btn btn--solid">
              Request a repair <ArrowIcon />
            </Link>
            <a href={site.phoneHref} className="btn btn--ghost">
              <PhoneIcon /> Call {site.phone}
            </a>
          </>
        }
      >
        A fast, multi-trade response to faults, breakdowns and urgent repairs, with clear
        communication from report to completion.
      </PageHero>

      <section className="section">
        <div className="container split split--top">
          <h2>What are reactive repairs?</h2>
          <p className="lead">
            Reactive repairs are unplanned works carried out in response to a fault, damage
            or a tenant report. We assess each job by urgency, make the property safe where
            needed, and carry out a permanent repair or provide a clear quotation, keeping
            you and your tenants informed throughout.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Reactive repairs</span>
            <h2>What we cover</h2>
          </div>
          <div className="grid grid--3">
            {covered.map((c, i) => (
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
            <h2>How we prioritise</h2>
          </div>
          <div className="grid grid--3">
            {priorities.map((p) => (
              <div className="card priority" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.examples}</p>
                <p className="priority__response">
                  <span>Response</span>
                  {p.response}
                </p>
              </div>
            ))}
          </div>
          <p className="note muted">
            Response times are targets and may vary with parts availability and access.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container split split--top">
          <div>
            <h2>Working with letting agents</h2>
            <p className="lead">
              We fit into your existing processes, so reactive repairs run smoothly across
              your portfolio:
            </p>
          </div>
          <ul className="tick-list">
            {agentPoints.map((t) => (
              <li key={t}>
                <CheckIcon /> {t}
              </li>
            ))}
          </ul>
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
        title="Prevent repairs before they happen"
        text="Many reactive repairs start as small issues that go unnoticed. A Property MOT spots them early, with a RAG photo report and quotations, so you can fix problems before they become emergencies."
      />

      <CtaBand
        title="Need a repair?"
        text="Report it today and we'll take it from there."
        buttonLabel="Request a repair"
      />
    </>
  );
}
