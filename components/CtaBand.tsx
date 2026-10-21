import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export default function CtaBand({
  title = "Ready to get it sorted?",
  text = "Tell us about the job and we'll come back with a clear price and next steps. Urgent? Give us a call.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <Link href="/request-a-quote/" className="btn btn--solid">
              Request a quote
            </Link>
            <a href={site.phoneHref} className="btn btn--ghost">
              <PhoneIcon /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
