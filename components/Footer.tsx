import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src="/logo-light.png"
              alt="JS Property Maintenance logo"
              width={429}
              height={234}
              loading="lazy"
            />
            <p>
              Planned and reactive property maintenance across Teesside and the
              North East. One call, every trade.
            </p>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              <li><Link href="/#property-mot">Property MOT</Link></li>
              <li><Link href="/planned-maintenance/">Planned maintenance</Link></li>
              <li><Link href="/reactive-repairs/">Reactive repairs</Link></li>
              <li><Link href="/managed-maintenance/">Managed maintenance</Link></li>
            </ul>
          </div>

          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/work-with-us/">Work with us</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3>Get in touch</h3>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link href="/request-a-quote/">Request a quote</Link></li>
              <li className="muted">Covering Teesside and the North East</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="footer__legal">
            <Link href="/privacy/">Privacy policy</Link>
            <Link href="/cookies/">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
