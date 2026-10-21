import { site } from "@/lib/site";
import { ClockIcon, MailIcon, PhoneIcon } from "./Icons";

export default function ContactDetails() {
  return (
    <ul className="contact-list">
      <li>
        <a className="contact-item" href={site.phoneHref}>
          <PhoneIcon />
          <span>
            <small>Call us</small>
            <strong>{site.phone}</strong>
          </span>
        </a>
      </li>
      <li>
        <a className="contact-item" href={`mailto:${site.email}`}>
          <MailIcon />
          <span>
            <small>Email us</small>
            <strong>{site.email}</strong>
          </span>
        </a>
      </li>
      <li>
        <div className="contact-item">
          <ClockIcon />
          <span>
            <small>Opening hours</small>
            {site.hours.map((h) => (
              <span key={h.days} style={{ display: "block" }}>
                <strong style={{ fontSize: "1rem" }}>{h.days}:</strong> {h.time}
              </span>
            ))}
          </span>
        </div>
      </li>
    </ul>
  );
}
