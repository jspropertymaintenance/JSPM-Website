import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export default function CtaBand({
  title = "Ready to get started?",
  text = "Tell us about the job and we'll come back with a clear price and next steps. Urgent? Give us a call.",
  buttonLabel = "Request a quote",
  showCall = true,
}: {
  title?: string;
  text?: string;
  buttonLabel?: string;
  showCall?: boolean;
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
              {buttonLabel}
            </Link>
            {showCall && (
              <a href={site.phoneHref} className="btn btn--ghost">
                <PhoneIcon /> {site.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
