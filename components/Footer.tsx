import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/logo-light.png" alt={site.name} width={429} height={234} />
            <p>
              Planned and reactive property maintenance across Teesside and the
              North East. One call, every trade.
            </p>
          </div>

          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/process/">Process</Link></li>
              <li><Link href="/services/">Services</Link></li>
              <li><Link href="/work-with-us/">Work with us</Link></li>
              <li><Link href="/referrals/">Referrals</Link></li>
              <li><Link href="/request-a-quote/">Request a quote</Link></li>
            </ul>
          </div>

          <div>
            <h3>Legal</h3>
            <ul>
              <li><Link href="/privacy/">Privacy</Link></li>
              <li><Link href="/cookies/">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3>Get in touch</h3>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              {site.hours.map((h) => (
                <li key={h.days} className="muted">
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Serving Teesside and the North East</span>
        </div>
      </div>
    </footer>
  );
}
