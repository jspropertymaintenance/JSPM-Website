"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  HMO_DEFAULT_ROOMS,
  MOT_FORM_NAME,
  addons,
  money,
  partnerServices,
  propertyPrice,
  propertyTypes,
  visitTypes,
  type AddonId,
  type PartnerId,
  type PropertyId,
  type VisitId,
} from "@/lib/mot";
import { site } from "@/lib/site";
import { CameraIcon, CheckIcon, DropletIcon, HomeIcon, ShieldIcon, WrenchIcon, ZapIcon } from "./Icons";

const included = [
  {
    Icon: ShieldIcon,
    title: "Safety and compliance check",
    text: "Smoke and CO alarms tested, certificates checked, escape routes inspected.",
  },
  {
    Icon: HomeIcon,
    title: "Room-by-room condition check",
    text: "Walls, ceilings, windows, doors, floors and fittings, inspected throughout.",
  },
  {
    Icon: DropletIcon,
    title: "Water temperature log and drain treatment",
    text: "Hot and cold temperatures recorded at every outlet, and all drains treated to prevent blockages.",
  },
  {
    Icon: ZapIcon,
    title: "Heating, plumbing and electrics",
    text: "Visual checks for leaks, boiler warning signs and electrical hazards.",
  },
  {
    Icon: CameraIcon,
    title: "RAG photo report within 24-48 hours",
    text: "Every issue rated red, amber or green, with photo evidence.",
  },
  {
    Icon: WrenchIcon,
    title: "Remedial works quoted",
    text: "Itemised quotations for any remedial works, carried out by our vetted trade partners.",
  },
];

const clientTypes = ["Landlord", "Letting agent", "Serviced accommodation operator"];
const reportRecipients = ["Agency", "Landlord directly"];

type Details = {
  clientType: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  door: string;
  street: string;
  town: string;
  postcode: string;
  dates: string;
  access: string;
  agencyName: string;
  reportTo: string;
};

const emptyDetails: Details = {
  clientType: "",
  name: "",
  company: "",
  mobile: "",
  email: "",
  door: "",
  street: "",
  town: "",
  postcode: "",
  dates: "",
  access: "",
  agencyName: "",
  reportTo: "",
};

type Status = "idle" | "sending" | "sent" | "error";

const toggle = <T,>(list: T[], id: T) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export default function PropertyMot() {
  const [visit, setVisit] = useState<VisitId | "">("");
  const [property, setProperty] = useState<PropertyId | "">("");
  const [roomsInput, setRoomsInput] = useState(String(HMO_DEFAULT_ROOMS));
  const [chosenAddons, setChosenAddons] = useState<AddonId[]>([]);
  const [chosenPartners, setChosenPartners] = useState<PartnerId[]>([]);
  const [regular, setRegular] = useState(false);
  const [d, setD] = useState<Details>(emptyDetails);
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (key: keyof Details) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setD((prev) => ({ ...prev, [key]: e.target.value }));

  // --- Calculation -------------------------------------------------------
  const rooms = Number(roomsInput);
  const roomsValid = Number.isInteger(rooms) && rooms >= 1;
  const isHmo = property === "hmo";
  const isAgent = d.clientType === "Letting agent";

  const basePrice = property ? propertyPrice(property, roomsValid ? rooms : 0) : 0;
  const addonLines = addons.filter((a) => chosenAddons.includes(a.id));
  const partnerLines = partnerServices.filter((s) => chosenPartners.includes(s.id));
  const guidePrice = basePrice + addonLines.reduce((sum, a) => sum + a.price, 0);
  const guideIsFrom = addonLines.some((a) => a.from);
  const partnerSubtotal = partnerLines.reduce((sum, s) => sum + s.price, 0);

  const visitLabel = visitTypes.find((v) => v.id === visit)?.short;
  const propertyLabel = propertyTypes.find((t) => t.id === property)?.label;
  const propertySummary = isHmo
    ? `HMO (${roomsValid ? rooms : "?"} lettable room${rooms === 1 ? "" : "s"})`
    : propertyLabel;
  const selectionLine = [visitLabel, propertySummary].filter(Boolean).join(" – ");
  const guideText = property ? `${guideIsFrom ? "from " : ""}${money(guidePrice)}` : "£–";

  // --- Validation --------------------------------------------------------
  const missing: string[] = [];
  if (!visit) missing.push("visit type");
  if (!property) missing.push("property type");
  if (isHmo && !roomsValid) missing.push("number of lettable rooms");
  if (!d.clientType) missing.push("I am a");
  if (!d.name.trim()) missing.push("name");
  if (d.mobile.replace(/\D/g, "").length < 10) missing.push("mobile number");
  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) missing.push("email");
  if (!d.door.trim()) missing.push("door number");
  if (!d.street.trim()) missing.push("street");
  if (!d.town.trim()) missing.push("town");
  if (!d.postcode.trim()) missing.push("postcode");
  const ready = missing.length === 0;

  // --- Submission --------------------------------------------------------
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");

    const postcode = d.postcode.trim().toUpperCase();
    const addonText = addonLines.map((a) => `${a.label} (${a.priceText})`).join("; ") || "None";
    const partnerText = partnerLines.map((s) => `${s.label} (${s.priceText})`).join("; ") || "None";
    const address = `${d.door.trim()} ${d.street.trim()}, ${d.town.trim()}, ${postcode}`;

    const summary = [
      `Visit type: ${visitTypes.find((v) => v.id === visit)?.label}`,
      `Property type: ${propertyLabel}`,
      ...(isHmo ? [`HMO lettable rooms: ${rooms}`] : []),
      `Add-ons: ${addonText}`,
      `Partner services: ${partnerText}`,
      `Regular checks: ${regular ? "Yes" : "No"}`,
      `Property MOT guide price: ${guideText}`,
      `Partner services from subtotal: ${partnerLines.length ? `from ${money(partnerSubtotal)}` : "None"}`,
      "",
      `I am a: ${d.clientType}`,
      `Name: ${d.name.trim()}`,
      `Company: ${d.company.trim() || "-"}`,
      `Mobile: ${d.mobile.trim()}`,
      `Email: ${d.email.trim()}`,
      `Property address: ${address}`,
      `Preferred dates: ${d.dates.trim() || "-"}`,
      `Access notes: ${d.access.trim() || "-"}`,
      ...(isAgent
        ? [`Agency name: ${d.agencyName.trim() || "-"}`, `Report and invoice to: ${d.reportTo || "-"}`]
        : []),
    ].join("\n");

    const fields: Record<string, string> = {
      "form-name": MOT_FORM_NAME,
      "bot-field": (e.currentTarget.elements.namedItem("bot-field") as HTMLInputElement).value,
      subject: `New Property MOT request – ${postcode}`,
      visit_type: visitTypes.find((v) => v.id === visit)?.label ?? "",
      property_type: propertyLabel ?? "",
      hmo_rooms: isHmo ? String(rooms) : "-",
      addons: addonText,
      partner_services: partnerText,
      regular_checks: regular ? "Yes" : "No",
      guide_price: guideText,
      partner_from_subtotal: partnerLines.length ? `from ${money(partnerSubtotal)}` : "None",
      client_type: d.clientType,
      name: d.name.trim(),
      company: d.company.trim(),
      mobile: d.mobile.trim(),
      email: d.email.trim(),
      door_number: d.door.trim(),
      street: d.street.trim(),
      town: d.town.trim(),
      postcode,
      preferred_dates: d.dates.trim(),
      access_notes: d.access.trim(),
      agency_name: isAgent ? d.agencyName.trim() : "",
      report_and_invoice_to: isAgent ? d.reportTo : "",
      summary,
    };

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields).toString(),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section section--line mot" id="property-mot">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">Our main service</span>
            <h2>Property MOT</h2>
          </div>
          <p className="lead">
            A property condition and safety check, with a RAG report identifying urgent
            issues and advisories to keep your property well maintained.
          </p>
        </div>

        <h3 className="mot__subhead">What&apos;s included</h3>
        <div className="grid grid--3">
          {included.map(({ Icon, title, text }) => (
            <div className="card" key={title}>
              <span className="card__icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="mot__quote-head">
          <h3 className="mot__subhead">Instant quote</h3>
          <p className="muted">
            Choose your property and any extras for an instant guide price. No obligation.
          </p>
        </div>

        {status === "sent" ? (
          <div className="form" role="status">
            <div className="form__success">
              <CheckIcon />
              <h3>Thanks, your request has been sent.</h3>
              <p className="form__note">
                We&apos;ll be in touch shortly with your full quote and to book your
                Property MOT.
              </p>
            </div>
          </div>
        ) : (
          <form className="mot__layout" name={MOT_FORM_NAME} onSubmit={onSubmit} noValidate>
            <p className="hidden">
              <label>
                Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="form mot__steps">
              <fieldset className="mot__step">
                <legend>
                  <span>Step 1</span> Visit type
                </legend>
                <div className="mot__options mot__options--2">
                  {visitTypes.map((v) => (
                    <label className="mot__option" key={v.id}>
                      <input
                        type="radio"
                        name="mot_visit"
                        checked={visit === v.id}
                        onChange={() => setVisit(v.id)}
                      />
                      <span className="mot__option-label">{v.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mot__step">
                <legend>
                  <span>Step 2</span> Property type
                </legend>
                <div className="mot__options mot__options--2">
                  {propertyTypes.map((t) => (
                    <label className="mot__option" key={t.id}>
                      <input
                        type="radio"
                        name="mot_property"
                        checked={property === t.id}
                        onChange={() => setProperty(t.id)}
                      />
                      <span className="mot__option-label">{t.label}</span>
                      <span className="mot__option-price">{t.priceText}</span>
                    </label>
                  ))}
                </div>
                {isHmo && (
                  <div className="field mot__rooms">
                    <label htmlFor="mot-rooms">Number of lettable rooms</label>
                    <input
                      id="mot-rooms"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      value={roomsInput}
                      onChange={(e) => setRoomsInput(e.target.value)}
                    />
                  </div>
                )}
              </fieldset>

              <fieldset className="mot__step">
                <legend>
                  <span>Step 3</span> Anything to add? <em>(optional)</em>
                </legend>
                <div className="mot__options">
                  {addons.map((a) => (
                    <label className="mot__option" key={a.id}>
                      <input
                        type="checkbox"
                        checked={chosenAddons.includes(a.id)}
                        onChange={() => setChosenAddons((l) => toggle(l, a.id))}
                      />
                      <span className="mot__option-label">
                        {a.label}
                        {"note" in a && <small>{a.note}</small>}
                      </span>
                      <span className="mot__option-price">{a.priceText}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mot__step">
                <legend>
                  <span>Step 4</span> Additional services from our trade partners{" "}
                  <em>(optional)</em>
                </legend>
                <p className="form__note">
                  Not included in the MOT price. Shown as a separate &ldquo;from&rdquo; total,
                  confirmed with your full quote.
                </p>
                <div className="mot__options">
                  {partnerServices.map((s) => (
                    <label className="mot__option" key={s.id}>
                      <input
                        type="checkbox"
                        checked={chosenPartners.includes(s.id)}
                        onChange={() => setChosenPartners((l) => toggle(l, s.id))}
                      />
                      <span className="mot__option-label">{s.label}</span>
                      <span className="mot__option-price">{s.priceText}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mot__step">
                <legend>
                  <span>Step 5</span> Regular checks
                </legend>
                <label className="mot__option">
                  <input type="checkbox" checked={regular} onChange={() => setRegular((r) => !r)} />
                  <span className="mot__option-label">
                    I&apos;m interested in regular checks. Tell me about your maintenance plans.
                  </span>
                </label>
              </fieldset>

              <fieldset className="mot__step">
                <legend>
                  <span>Step 6</span> Your details
                </legend>
                <div className="field">
                  <label htmlFor="mot-client">I am a</label>
                  <select id="mot-client" value={d.clientType} onChange={set("clientType")} required>
                    <option value="" disabled>
                      Please choose
                    </option>
                    {clientTypes.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {isAgent && (
                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="mot-agency">
                        Agency name <span className="req">(optional)</span>
                      </label>
                      <input id="mot-agency" value={d.agencyName} onChange={set("agencyName")} autoComplete="organization" />
                    </div>
                    <div className="field">
                      <label htmlFor="mot-report-to">
                        Who should receive the report and invoice?
                      </label>
                      <select id="mot-report-to" value={d.reportTo} onChange={set("reportTo")}>
                        <option value="" disabled>
                          Please choose
                        </option>
                        {reportRecipients.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="mot-name">Name</label>
                    <input id="mot-name" value={d.name} onChange={set("name")} autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="mot-company">
                      Company name <span className="req">(optional)</span>
                    </label>
                    <input id="mot-company" value={d.company} onChange={set("company")} autoComplete="organization" />
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="mot-mobile">Mobile number</label>
                    <input id="mot-mobile" type="tel" value={d.mobile} onChange={set("mobile")} autoComplete="tel" required />
                  </div>
                  <div className="field">
                    <label htmlFor="mot-email">Email</label>
                    <input id="mot-email" type="email" value={d.email} onChange={set("email")} autoComplete="email" required />
                  </div>
                </div>
                <p className="mot__group-label">Property address</p>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="mot-door">Door number</label>
                    <input id="mot-door" value={d.door} onChange={set("door")} required />
                  </div>
                  <div className="field">
                    <label htmlFor="mot-street">Street</label>
                    <input id="mot-street" value={d.street} onChange={set("street")} autoComplete="address-line1" required />
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="mot-town">Town</label>
                    <input id="mot-town" value={d.town} onChange={set("town")} autoComplete="address-level2" required />
                  </div>
                  <div className="field">
                    <label htmlFor="mot-postcode">Postcode</label>
                    <input id="mot-postcode" value={d.postcode} onChange={set("postcode")} autoComplete="postal-code" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="mot-dates">
                    Preferred dates <span className="req">(optional)</span>
                  </label>
                  <input id="mot-dates" value={d.dates} onChange={set("dates")} />
                </div>
                <div className="field">
                  <label htmlFor="mot-access">
                    Access notes <span className="req">(optional)</span>
                  </label>
                  <textarea
                    id="mot-access"
                    value={d.access}
                    onChange={set("access")}
                    placeholder="e.g. keys, tenant present, gate codes"
                  />
                </div>
              </fieldset>
            </div>

            <aside className="mot__panel" aria-live="polite">
              <p className="mot__panel-label">Your Property MOT guide price</p>
              <p className="mot__price">{guideText}</p>
              <p className="mot__selection">
                {selectionLine || "Choose a visit and property type to see your price."}
              </p>

              {addonLines.length > 0 && (
                <ul className="mot__lines">
                  {addonLines.map((a) => (
                    <li key={a.id}>
                      <span>{"short" in a ? a.short : a.label}</span>
                      <span>{a.priceText}</span>
                    </li>
                  ))}
                </ul>
              )}

              {partnerLines.length > 0 && (
                <div className="mot__partners">
                  <p className="mot__panel-label">Partner services</p>
                  <ul className="mot__lines">
                    {partnerLines.map((s) => (
                      <li key={s.id}>
                        <span>{s.label}</span>
                        <span>{s.priceText}</span>
                      </li>
                    ))}
                    <li className="mot__subtotal">
                      <span>Subtotal</span>
                      <span>from {money(partnerSubtotal)}</span>
                    </li>
                  </ul>
                </div>
              )}

              {regular && (
                <p className="mot__regular">We&apos;ll include details of our maintenance plans.</p>
              )}

              <ul className="mot__trust">
                {["Fully insured", "Report within 24-48 hours", "Vetted trade partners"].map((t) => (
                  <li key={t}>
                    <CheckIcon /> {t}
                  </li>
                ))}
              </ul>

              {status === "error" && (
                <p className="mot__error" role="alert">
                  Sorry, something went wrong sending your request. Please try again or call
                  us on <a href={site.phoneHref}>{site.phone}</a>.
                </p>
              )}

              <button
                type="submit"
                className="btn btn--solid mot__submit"
                disabled={!ready || status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Request my Property MOT"}
              </button>
              {!ready && <p className="mot__missing">Still needed: {missing.join(", ")}.</p>}

              <p className="mot__small">
                Guide price. Your full quote is confirmed before booking. Properties outside
                Teesside (e.g. Durham, Sunderland, Newcastle) incur a minimum £30 travel
                charge, added to your confirmed quote. The Property MOT is a visual
                inspection, not a structural survey, and does not cover anything hidden or
                inaccessible.
              </p>
            </aside>
          </form>
        )}
      </div>
    </section>
  );
}
