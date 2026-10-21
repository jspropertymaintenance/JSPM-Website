"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            <img src="/logo-light.png" alt="" width={429} height={234} />
            <span className="brand__name">
              JS Property
              <br />
              Maintenance
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/request-a-quote/" className="btn btn--solid header__cta">
            Request a quote
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/request-a-quote/" className="btn btn--solid">
              Request a quote
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
