import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy | JS Property Maintenance",
  description:
    "How JS Property Maintenance collects, uses, shares and protects your personal information, how long we keep it, and your rights.",
  path: "/privacy/",
});

const LAST_UPDATED = "25.11.2026";
const ADDRESS = "Brooklime Avenue, Stockton-on-Tees, TS18 3RS";

const contents = [
  { id: "who-we-are", title: "Who we are" },
  { id: "information-we-collect", title: "The information we collect" },
  { id: "how-we-use-it", title: "How we use your information, and our legal reasons" },
  { id: "who-we-share-it-with", title: "Who we share your information with" },
  { id: "outside-the-uk", title: "Information stored outside the UK" },
  { id: "how-long-we-keep-it", title: "How long we keep your information" },
  { id: "keeping-it-safe", title: "Keeping your information safe" },
  { id: "your-rights", title: "Your rights" },
  { id: "changes", title: "Changes to this policy" },
];

const uses = [
  ["Replying to enquiries and giving quotes", "Taking steps at your request before a contract"],
  [
    "Booking and carrying out inspections and work, writing reports, invoicing and taking payment",
    "Performing our contract with you",
  ],
  [
    "Contacting tenants to arrange access, and recording their comments in reports",
    "Our legitimate interest in carrying out the work our client has asked for",
  ],
  [
    "Taking photos as evidence of the property's condition and the work done",
    "Our legitimate interest in providing accurate reports and protecting ourselves and our clients if there is a dispute",
  ],
  [
    "Checking and onboarding tradespeople (insurance, qualifications, right to work)",
    "Our legitimate interest in making sure the trades we use are qualified, insured and legally able to work",
  ],
  ["Paying tradespeople and making CIS deductions", "Performing our contract, and complying with tax law"],
  ["Keeping financial and tax records", "Complying with the law"],
  ["Sending you updates or offers by email", "Your consent, which you can withdraw at any time"],
  [
    "Using photos of our work in our marketing",
    "Your permission, with addresses, people and personal belongings removed",
  ],
];

const retention = [
  ["Enquiries that don't go ahead", "12 months"],
  ["Client records, quotes, invoices and payment records", "6 years after the last job (required for tax records)"],
  [
    "Property MOT reports, job photos and certificates you send us",
    "6 years after the visit (in case of claims or disputes)",
  ],
  ["Tenants' contact details", "Deleted once the job is complete"],
  ["Tradespeople we work with, including CIS records", "6 years after we last work together"],
  ["Copies of right to work documents", "2 years after we last work together"],
  ["Trade applications that don't go ahead", "6 months"],
  ["Email marketing list", "Until you unsubscribe"],
];

function Table({ head, rows }: { head: [string, string]; rows: string[][] }) {
  return (
    <table className="policy-table">
      <thead>
        <tr>
          <th scope="col">{head[0]}</th>
          <th scope="col">{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([a, b]) => (
          <tr key={a}>
            <td data-label={head[0]}>{a}</td>
            <td data-label={head[1]}>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Section({ n, children }: { n: number; children: React.ReactNode }) {
  const { id, title } = contents[n - 1];
  return (
    <section id={id} className="policy__section">
      <h2>
        <span className="policy__num">{n}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

export default function Privacy() {
  const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy">
        Last updated: {LAST_UPDATED}
      </PageHero>

      <section className="section">
        <div className="container policy">
          <nav className="policy__toc" aria-label="Contents">
            <details open>
              <summary>Contents</summary>
              <ol>
                {contents.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`}>{c.title}</a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>

          <div className="policy__body">
            <p className="policy__intro">
              This policy explains what personal information JS Property Maintenance collects,
              why we collect it, who we share it with, how long we keep it, and your rights. We
              keep it simple and only collect what we need to run our business.
            </p>

            <Section n={1}>
              <p>
                JS Property Maintenance (&ldquo;JSPM&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
                We provide property inspection, maintenance and repair services across Teesside
                and the North East.
              </p>
              <p>
                We are the &ldquo;controller&rdquo; of your personal information, which means we
                decide how it is used.
              </p>
              <dl className="policy__contact">
                <div>
                  <dt>Address</dt>
                  <dd>{ADDRESS}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </dd>
                </div>
              </dl>
            </Section>

            <Section n={2}>
              <h3>
                If you are a client or make an enquiry (landlords, letting agents, property
                managers, serviced accommodation operators and homeowners):
              </h3>
              <ul>
                <li>Your name, company name, phone number, email and address</li>
                <li>
                  Property addresses and details, such as property type, access arrangements and
                  key safe codes
                </li>
                <li>Details of the work you ask about, quotes, bookings and invoices</li>
                <li>
                  Documents you send us, such as gas safety certificates, EICRs, EPCs, fire risk
                  assessments and HMO licences
                </li>
                <li>
                  Payment details, which are handled securely by our payment provider (we do not
                  store your card details)
                </li>
              </ul>

              <h3>If you are a tenant or occupier of a property we visit:</h3>
              <ul>
                <li>
                  Your name and contact details, if the landlord or agent gives them to us to
                  arrange access
                </li>
                <li>
                  Comments you make during a visit, and photos of the property taken during
                  inspections and works
                </li>
              </ul>
              <p className="policy__note">
                We do not take photos of people. If someone appears in a photo by accident, we
                remove or blur them.
              </p>

              <h3>If you are a tradesperson who works with us or applies to join our network:</h3>
              <ul>
                <li>Your name, business name, contact details, trade, areas covered and rates</li>
                <li>Your UTR number and CIS status</li>
                <li>
                  Copies of your insurance, qualifications and registrations (for example Gas Safe
                  or NICEIC)
                </li>
                <li>Proof of your right to work in the UK, such as a passport or driving licence</li>
                <li>Photos of your previous work, and your website or social media links</li>
              </ul>

              <h3>If you visit our website:</h3>
              <p>
                We do not currently use cookies on this website. See our{" "}
                <Link href="/cookies/">Cookies page</Link>.
              </p>
            </Section>

            <Section n={3}>
              <p>
                The law requires us to have a valid reason (a &ldquo;lawful basis&rdquo;) for each
                use of your information.
              </p>
              <Table head={["What we use it for", "Our lawful basis"]} rows={uses} />
            </Section>

            <Section n={4}>
              <p>We never sell your information. We only share it where needed:</p>
              <ul>
                <li>
                  <strong>Tradespeople and partners</strong> carrying out work or certificates at
                  your property. They receive only what they need for the job, such as the
                  address, access details and the scope of work. They do not receive
                  clients&apos; contact details.
                </li>
                <li>
                  <strong>The services we use to run the business:</strong>
                  <ul>
                    <li>Netlify (website hosting and website forms)</li>
                    <li>Powered Now (job management, quotes, reports and invoices)</li>
                    <li>Google Workspace (email and secure file storage)</li>
                    <li>WhatsApp (messages with clients, tenants and trades)</li>
                  </ul>
                </li>
                <li>
                  <strong>Our accountant, HMRC, our insurers and legal advisers</strong>, where
                  needed to run the business or meet our legal duties.
                </li>
                <li>
                  <strong>The landlord or letting agent who booked the work</strong>, for reports
                  and photos of their property.
                </li>
              </ul>
            </Section>

            <Section n={5}>
              <p>
                Some of the services we use (for example Netlify and Google) may store information
                outside the UK, including in the United States. Where this happens, they protect it
                with safeguards approved under UK data protection law, such as the UK International
                Data Transfer Addendum or the UK–US Data Bridge.
              </p>
            </Section>

            <Section n={6}>
              <Table head={["Information", "How long we keep it"]} rows={retention} />
            </Section>

            <Section n={7}>
              <p>
                We store information in secure, password-protected systems, limit access to those
                who need it, and only share what is needed for each job. Key safe and access codes
                are kept confidential.
              </p>
            </Section>

            <Section n={8}>
              <p>You have the right to:</p>
              <ul>
                <li>ask for a copy of the information we hold about you</li>
                <li>ask us to correct anything that is wrong</li>
                <li>ask us to delete your information</li>
                <li>ask us to restrict how we use it, or object to us using it</li>
                <li>ask us to send your information to you or another organisation</li>
                <li>withdraw your consent at any time, where we rely on it</li>
              </ul>
              <p>
                To use any of these rights, email {email}. We will reply within one month. Some
                information, such as invoices, we must keep by law even if you ask us to delete
                it.
              </p>
              <div className="policy__callout">
                <h3>Complaints</h3>
                <p>
                  If you are unhappy with how we have handled your information, please contact us
                  first so we can put it right. You can also complain to the Information
                  Commissioner&apos;s Office (ICO) at{" "}
                  <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                    ico.org.uk
                  </a>{" "}
                  or on <a href="tel:+443031231113">0303 123 1113</a>.
                </p>
              </div>
            </Section>

            <Section n={9}>
              <p>
                We may update this policy from time to time. The date at the top shows when it was
                last changed.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
