import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { CheckIcon } from "@/components/Icons";
import { serviceCategories, trades } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Planned maintenance, reactive repairs and managed maintenance, plus plumbing, electrical, joinery, plastering, decorating, gardens, flooring and cleaning.",
};

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Everything your property needs">
        Planned upkeep, fast reactive repairs and, soon, fully managed maintenance,
        all delivered by one coordinated team.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {serviceCategories.map((c) => (
              <div className="card card--feature" key={c.title}>
                {c.status === "soon" && <span className="badge">Coming soon</span>}
                <h3 style={{ fontSize: "1.6rem" }}>{c.title}</h3>
                <p>{c.text}</p>
                <ul>
                  {c.items.map((item) => (
                    <li key={item}>
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
                {c.status === "available" ? (
                  <Link href="/request-a-quote/" className="btn btn--ghost">
                    Get a quote
                  </Link>
                ) : (
                  <Link href="/contact/" className="btn btn--ghost">
                    Register interest
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">By trade</span>
              <h2>One team for every trade</h2>
            </div>
            <p className="lead">
              Vetted, experienced trades coordinated through a single point of
              contact.
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
        </div>
      </section>

      <CtaBand />
    </>
  );
}
