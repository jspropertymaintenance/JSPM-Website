import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { CalendarIcon, ShieldIcon, SlidersIcon, UserIcon } from "@/components/Icons";
import { advantages, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description: "A simple, organised maintenance process: enquiry, booking and completion, with clear communication at every step.",
};

const icons = [CalendarIcon, SlidersIcon, ShieldIcon, UserIcon];

export default function Process() {
  return (
    <>
      <PageHero eyebrow="Process" title="How it works">
        A simple, organised process built for property professionals who need clear
        communication and reliable delivery.
      </PageHero>

      <section className="section">
        <div className="container">
          <ol className="steps">
            {steps.map((s, i) => (
              <li className="card" key={s.title}>
                <span className="card__num">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: "2.5rem" }}>
            <Link href="/contact/" className="btn btn--solid">
              Contact us
            </Link>
          </div>
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
              const Icon = icons[i];
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

      <CtaBand />
    </>
  );
}
