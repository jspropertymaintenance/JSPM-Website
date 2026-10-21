import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { ArrowIcon, CalendarIcon, PhoneIcon, ShieldIcon, SlidersIcon, UserIcon } from "@/components/Icons";
import { advantages, audiences, site, trades } from "@/lib/site";

const advantageIcons = [CalendarIcon, SlidersIcon, ShieldIcon, UserIcon];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Teesside &amp; the North East</span>
          <h1>JS Property Maintenance</h1>
          <p className="lead">
            One local team covering every trade. Planned, reactive and managed
            maintenance for landlords, letting agents, serviced accommodation
            and homeowners.
          </p>
          <div className="btn-row">
            <Link href="/request-a-quote/" className="btn btn--solid">
              Request a quote <ArrowIcon />
            </Link>
            <a href={site.phoneHref} className="btn btn--ghost">
              <PhoneIcon /> Call {site.phone}
            </a>
          </div>

          <div className="facts">
            <div>
              <strong>Every trade</strong>
              <span>One point of contact</span>
            </div>
            <div>
              <strong>Planned &amp; reactive</strong>
              <span>Routine upkeep and urgent repairs</span>
            </div>
            <div>
              <strong>Vetted trades</strong>
              <span>Checked for quality and reliability</span>
            </div>
            <div>
              <strong>Mon to Fri</strong>
              <span>8:00am to 4:00pm</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Services</span>
              <h2>One team for every trade</h2>
            </div>
            <p className="lead">
              One-off repairs, upgrades or full renovations. We make maintenance
              simple, stress-free and reliable.
            </p>
          </div>
          <div className="grid grid--3">
            {trades.map((t, i) => (
              <div className="card" key={t.title}>
                <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: "2.5rem" }}>
            <Link href="/services/" className="btn btn--solid">
              Explore all services <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
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

      <section className="section section--paper">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Who we work with</span>
              <h2>Maintenance shaped around how you operate</h2>
            </div>
            <p className="lead">
              Flexible support that fits your schedule, your properties and the way
              you work.
            </p>
          </div>
          <ul className="list-rows">
            {audiences.map((a, i) => (
              <li key={a.title}>
                <span className="list-rows__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Where we cover</span>
            <h2>Local to Teesside</h2>
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

      <section className="section section--line">
        <div className="container">
          <div className="cta-band">
            <div>
              <span className="cta-band__big">10%</span>
              <h2>Know someone who needs us?</h2>
              <p>
                Refer a landlord, agent or neighbour. If they accept a quote, you earn
                10% commission. There&apos;s no limit on referrals.
              </p>
            </div>
            <div className="btn-row">
              <Link href="/referrals/" className="btn btn--solid">
                Refer someone
              </Link>
              <Link href="/referrals/#how-it-works" className="btn btn--ghost">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
