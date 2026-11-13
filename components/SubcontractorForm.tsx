"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ACCEPT,
  APPLICATION_FORM_NAME,
  MAX_FILE_MB,
  REVIEW_TIME,
  areaOptions,
  availabilityOptions,
  businessTypes,
  cisOptions,
  declarations,
  fileFields,
  sections,
  teamSizes,
  tradeOptions,
  yesNo,
  type FileField,
} from "@/lib/subcontractor";
import { compressImage, formatSize, isAllowed, isImage, uploadFile } from "@/lib/uploads";
import { site } from "@/lib/site";
import { CheckIcon } from "./Icons";

type Picked = { id: string; file: File };
type Errors = Record<string, string>;
type Status =
  | { phase: "editing" }
  | { phase: "uploading"; done: number; total: number; current: string }
  | { phase: "sending" }
  | { phase: "sent" }
  | { phase: "error"; message: string };

const MULTI = ["trades", "areas", "availability"] as const;
type MultiField = (typeof MULTI)[number];

const emptyFiles = Object.fromEntries(Object.keys(fileFields).map((k) => [k, []])) as unknown as Record<
  FileField,
  Picked[]
>;

const today = () => new Date().toISOString().slice(0, 10);
const digits = (s: string) => s.replace(/\D/g, "");
const isMoney = (s: string) => /^\d+(\.\d{1,2})?$/.test(s.trim().replace(/^£/, ""));

export default function SubcontractorForm() {
  const top = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Record<string, string>>({});
  const [multi, setMulti] = useState<Record<MultiField, string[]>>({ trades: [], areas: [], availability: [] });
  const [decl, setDecl] = useState<boolean[]>(declarations.map(() => false));
  const [files, setFiles] = useState<Record<FileField, Picked[]>>(emptyFiles);
  const [preparing, setPreparing] = useState<FileField | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ phase: "editing" });

  const val = (name: string) => v[name] ?? "";
  const set = (name: string, value: string) => setV((prev) => ({ ...prev, [name]: value }));
  const onText = (name: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    set(name, e.target.value);
  const toggleMulti = (name: MultiField, option: string) =>
    setMulti((prev) => ({
      ...prev,
      [name]: prev[name].includes(option) ? prev[name].filter((o) => o !== option) : [...prev[name], option],
    }));

  const isLtd = val("business_type") === "Limited company";
  const employs = val("employs_staff") === "Yes";
  const vatYes = val("vat_registered") === "Yes";
  const dbsYes = val("dbs") === "Yes";
  const otherTrade = multi.trades.includes("Other");

  // --- Files --------------------------------------------------------------
  async function addFiles(field: FileField, list: FileList | null) {
    if (!list?.length) return;
    const { max } = fileFields[field];
    const imagesOnly = field === "work_photos";
    const problems: string[] = [];
    const accepted: Picked[] = [];
    setPreparing(field);
    for (const original of Array.from(list)) {
      if (imagesOnly ? !isImage(original) : !isAllowed(original)) {
        problems.push(`${original.name}: please upload ${imagesOnly ? "a JPG, PNG or HEIC photo" : "a PDF, JPG, PNG or HEIC file"}.`);
        continue;
      }
      const file = await compressImage(original);
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        problems.push(`${original.name} is ${formatSize(file.size)}. Files must be ${MAX_FILE_MB}MB or smaller.`);
        continue;
      }
      accepted.push({ id: crypto.randomUUID(), file });
    }
    setPreparing(null);
    setFiles((prev) => {
      const combined = max === 1 ? accepted.slice(-1) : [...prev[field], ...accepted];
      if (combined.length > max) problems.push(`You can upload up to ${max} files here.`);
      return { ...prev, [field]: combined.slice(0, max) };
    });
    setErrors((prev) => {
      const next = { ...prev };
      if (problems.length) next[field] = problems.join(" ");
      else delete next[field];
      return next;
    });
  }
  const removeFile = (field: FileField, id: string) =>
    setFiles((prev) => ({ ...prev, [field]: prev[field].filter((f) => f.id !== id) }));

  // --- Validation ---------------------------------------------------------
  function validate(section: number): Errors {
    const e: Errors = {};
    const need = (name: string, message = "This field is required.") => {
      if (!val(name).trim()) e[name] = message;
    };
    const needDate = (name: string) => {
      if (!val(name)) e[name] = "Enter the expiry date.";
      else if (val(name) < today()) e[name] = "This certificate has expired. Please provide a current one.";
    };
    const needFile = (field: FileField, message = "Please upload a file.") => {
      if (!files[field].length) e[field] = message;
    };

    switch (section) {
      case 0:
        need("business_name");
        need("business_type", "Choose your business type.");
        need("contact_name");
        if (digits(val("mobile")).length < 10) e.mobile = "Enter a valid mobile number.";
        if (!/^\S+@\S+\.\S+$/.test(val("email").trim())) e.email = "Enter a valid email address.";
        need("business_address");
        if (!/^\d{1,3}$/.test(val("years_trading").trim())) e.years_trading = "Enter the number of years, e.g. 5.";
        break;
      case 1:
        if (!multi.trades.length) e.trades = "Tick at least one trade.";
        if (otherTrade) need("trades_other", "Tell us which other trade you provide.");
        if (!multi.areas.length) e.areas = "Tick at least one area.";
        if (!multi.availability.length) e.availability = "Tick at least one option.";
        need("team_size", "Choose your team size.");
        need("own_van_tools", "Choose Yes or No.");
        break;
      case 2:
        if (!isMoney(val("day_rate"))) e.day_rate = "Enter your day rate in pounds, e.g. 180.";
        if (val("hourly_rate").trim() && !isMoney(val("hourly_rate"))) e.hourly_rate = "Enter an amount in pounds, e.g. 25.";
        need("callout_charge", "Enter your call-out charge, or \"None\".");
        break;
      case 3:
        need("pl_insurer");
        need("pl_cover", "Enter the cover amount, e.g. £2m.");
        needDate("pl_expiry");
        needFile("pl_certificate", "Please upload your public liability certificate.");
        need("employs_staff", "Choose Yes or No.");
        if (employs) {
          needDate("el_expiry");
          needFile("el_certificate", "Please upload your employers' liability certificate.");
        }
        break;
      case 4:
        if (digits(val("utr")).length !== 10) e.utr = "Enter your 10-digit UTR number.";
        need("cis_status", "Choose your CIS status.");
        need("vat_registered", "Choose Yes or No.");
        if (vatYes) need("vat_number", "Enter your VAT number.");
        break;
      case 5:
        needFile("id_documents", "Please upload photo ID and proof of right to work.");
        break;
      case 6:
        needFile("qualifications", "Please upload at least one certificate or qualification.");
        break;
      case 7:
        if (dbsYes) needFile("dbs_certificate", "Please upload your DBS certificate.");
        break;
      case 8:
        if (decl.some((d) => !d)) e.declarations = "Please tick all four declarations to submit.";
        break;
    }
    return e;
  }

  function showErrors(e: Errors) {
    setErrors(e);
    requestAnimationFrame(() => {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true'], .apply__group--invalid input");
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function goTo(next: number) {
    setErrors({});
    setStep(next);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function next() {
    const e = validate(step);
    if (Object.keys(e).length) return showErrors(e);
    goTo(step + 1);
  }

  // --- Submission ---------------------------------------------------------
  async function submit() {
    for (let s = 0; s < sections.length; s++) {
      const e = validate(s);
      if (Object.keys(e).length) {
        if (s !== step) setStep(s);
        return showErrors(e);
      }
    }

    const included = (Object.keys(fileFields) as FileField[]).filter(
      (f) => (f !== "el_certificate" || employs) && (f !== "dbs_certificate" || dbsYes),
    );
    const queue = included.flatMap((field) => files[field].map((p) => ({ field, ...p })));
    const appId = crypto.randomUUID();
    const links: Record<string, string[]> = {};

    try {
      for (let i = 0; i < queue.length; i++) {
        const { field, file } = queue[i];
        setStatus({ phase: "uploading", done: i, total: queue.length, current: file.name });
        const url = await uploadFile(appId, `${field}-${i + 1}`, file);
        (links[field] ??= []).push(`${file.name} (${formatSize(file.size)}): ${url}`);
      }

      setStatus({ phase: "sending" });
      const trades = multi.trades.map((t) => (t === "Other" ? `Other (${val("trades_other").trim()})` : t));
      const yesNoOr = (name: string) => val(name) || "Not answered";
      const refs = [1, 2]
        .map((n) => [val(`ref${n}_name`), val(`ref${n}_company`), val(`ref${n}_phone`)].map((x) => x.trim()))
        .filter((r) => r.some(Boolean))
        .map((r) => r.map((x) => x || "-").join(", "));

      const documents = included
        .filter((f) => links[f])
        .map((f) => `${fileFields[f].label}:\n${links[f].map((l) => `- ${l}`).join("\n")}`)
        .join("\n\n");

      const summary = [
        "1. BUSINESS DETAILS",
        `Business name: ${val("business_name")}`,
        `Business type: ${val("business_type")}`,
        ...(isLtd ? [`Company number: ${val("company_number") || "-"}`] : []),
        `Contact name: ${val("contact_name")}`,
        `Mobile: ${val("mobile")}`,
        `Email: ${val("email")}`,
        `Business address: ${val("business_address")}`,
        `Years trading: ${val("years_trading")}`,
        `Website or social media: ${val("website") || "-"}`,
        "",
        "2. TRADES AND COVERAGE",
        `Trades: ${trades.join(", ")}`,
        `Areas: ${multi.areas.join(", ")}`,
        `Availability: ${multi.availability.join(", ")}`,
        `Team size: ${val("team_size")}`,
        `Own van and tools: ${val("own_van_tools")}`,
        "",
        "3. RATES",
        `Day rate: £${val("day_rate").replace(/^£/, "")}`,
        `Hourly rate: ${val("hourly_rate") ? `£${val("hourly_rate").replace(/^£/, "")}` : "-"}`,
        `Call-out charge: ${val("callout_charge")}`,
        `Out-of-hours or emergency rate: ${val("emergency_rate") || "-"}`,
        `Other rate notes: ${val("rates_notes") || "-"}`,
        "",
        "4. INSURANCE",
        `Public liability insurer: ${val("pl_insurer")}`,
        `Public liability cover: ${val("pl_cover")}`,
        `Public liability expiry: ${val("pl_expiry")}`,
        `Employs anyone: ${val("employs_staff")}`,
        ...(employs ? [`Employers' liability expiry: ${val("el_expiry")}`] : []),
        "",
        "5. TAX AND CIS",
        `UTR: ${val("utr")}`,
        `CIS status: ${val("cis_status")}`,
        `VAT registered: ${val("vat_registered")}${vatYes ? ` (${val("vat_number")})` : ""}`,
        "",
        "6. RIGHT TO WORK",
        `Share code: ${val("share_code") || "-"}`,
        "",
        "8. OPTIONAL EXTRAS",
        `DBS certificate: ${yesNoOr("dbs")}`,
        `Can provide RAMS: ${yesNoOr("rams")}`,
        `References: ${refs.length ? refs.join(" | ") : "-"}`,
        "",
        "9. DECLARATION",
        "All four declarations confirmed.",
        "",
        "DOCUMENTS (private download links)",
        documents || "-",
      ].join("\n");

      const fields: Record<string, string> = {
        "form-name": APPLICATION_FORM_NAME,
        "bot-field": val("bot-field"),
        subject: `New subcontractor application – ${trades.join(", ")} – ${val("business_name").trim()}`,
        ...Object.fromEntries(
          [
            "business_name", "business_type", "company_number", "contact_name", "mobile", "email",
            "business_address", "years_trading", "website", "team_size", "own_van_tools",
            "day_rate", "hourly_rate", "callout_charge", "emergency_rate", "rates_notes",
            "pl_insurer", "pl_cover", "pl_expiry", "employs_staff", "el_expiry",
            "utr", "cis_status", "vat_registered", "vat_number", "share_code", "dbs", "rams",
          ].map((k) => [k, val(k).trim()]),
        ),
        trades: trades.join(", "),
        areas: multi.areas.join(", "),
        availability: multi.availability.join(", "),
        references: refs.join(" | "),
        declarations: "All four declarations confirmed",
        documents,
        summary,
      };

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields).toString(),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus({ phase: "sent" });
      requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (err) {
      setStatus({
        phase: "error",
        message: err instanceof Error && err.message && !err.message.startsWith("Status")
          ? err.message
          : "Something went wrong sending your application.",
      });
    }
  }

  // --- Field components ---------------------------------------------------
  const errorFor = (name: string) =>
    errors[name] ? (
      <p className="apply__error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const Text = ({
    name,
    label,
    required,
    type = "text",
    hint,
    inputMode,
    autoComplete,
    textarea,
  }: {
    name: string;
    label: string;
    required?: boolean;
    type?: string;
    hint?: string;
    inputMode?: "numeric" | "decimal" | "tel" | "email" | "text";
    autoComplete?: string;
    textarea?: boolean;
  }) => {
    const common = {
      id: `sc-${name}`,
      value: val(name),
      onChange: onText(name),
      "aria-invalid": errors[name] ? (true as const) : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
      autoComplete,
    };
    return (
      <div className="field">
        <label htmlFor={`sc-${name}`}>
          {label} {required ? <span className="req" aria-hidden="true">*</span> : <span className="req">(optional)</span>}
        </label>
        {hint && <span className="apply__hint">{hint}</span>}
        {textarea ? <textarea {...common} /> : <input {...common} type={type} inputMode={inputMode} />}
        {errorFor(name)}
      </div>
    );
  };

  const Radios = ({ name, label, options, required = true }: { name: string; label: string; options: readonly string[]; required?: boolean }) => (
    <fieldset className={`apply__group${errors[name] ? " apply__group--invalid" : ""}`}>
      <legend>
        {label} {required ? <span className="req" aria-hidden="true">*</span> : <span className="req">(optional)</span>}
      </legend>
      <div className={`mot__options${options.length <= 3 ? " mot__options--2" : ""}`}>
        {options.map((o) => (
          <label className="mot__option" key={o}>
            <input type="radio" name={`sc-${name}`} checked={val(name) === o} onChange={() => set(name, o)} />
            <span className="mot__option-label">{o}</span>
          </label>
        ))}
      </div>
      {errorFor(name)}
    </fieldset>
  );

  const Checks = ({ name, label, options }: { name: MultiField; label: string; options: readonly string[] }) => (
    <fieldset className={`apply__group${errors[name] ? " apply__group--invalid" : ""}`}>
      <legend>
        {label} <span className="req" aria-hidden="true">*</span> <em>(tick all that apply)</em>
      </legend>
      <div className="mot__options mot__options--2">
        {options.map((o) => (
          <label className="mot__option" key={o}>
            <input type="checkbox" checked={multi[name].includes(o)} onChange={() => toggleMulti(name, o)} />
            <span className="mot__option-label">{o}</span>
          </label>
        ))}
      </div>
      {errorFor(name)}
    </fieldset>
  );

  const Upload = ({ field, required, children, imagesOnly }: { field: FileField; required?: boolean; children?: ReactNode; imagesOnly?: boolean }) => {
    const { label, max } = fileFields[field];
    const list = files[field];
    return (
      <div className={`field apply__upload${errors[field] ? " apply__group--invalid" : ""}`}>
        <span className="apply__label">
          {label} {required ? <span className="req" aria-hidden="true">*</span> : <span className="req">(optional)</span>}
        </span>
        {children}
        <div className="upload">
          <label className="btn btn--ghost upload__btn">
            {max > 1 ? "Choose files" : "Choose file"}
            <input
              className="sr-only"
              type="file"
              accept={imagesOnly ? ".jpg,.jpeg,.png,.heic,.heif,image/*" : ACCEPT}
              multiple={max > 1}
              onChange={(e) => {
                addFiles(field, e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          <label className="btn btn--ghost upload__btn upload__camera">
            Take a photo
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                addFiles(field, e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          <span className="apply__hint">
            {imagesOnly ? "JPG, PNG or HEIC" : "PDF, JPG, PNG or HEIC"}, up to {MAX_FILE_MB}MB each
            {max > 1 ? ` (up to ${max} files)` : ""}
          </span>
        </div>
        {preparing === field && <p className="apply__hint">Preparing files…</p>}
        {list.length > 0 && (
          <ul className="upload__list">
            {list.map((p) => (
              <li key={p.id}>
                <span className="upload__name">{p.file.name}</span>
                <span className="upload__size">{formatSize(p.file.size)}</span>
                <button type="button" onClick={() => removeFile(field, p.id)} aria-label={`Remove ${p.file.name}`}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {errorFor(field)}
      </div>
    );
  };

  // --- Render -------------------------------------------------------------
  if (status.phase === "sent") {
    return (
      <div className="form" role="status" ref={top}>
        <div className="form__success">
          <CheckIcon />
          <h3>Thanks for applying.</h3>
          <p className="form__note">
            We&apos;ll review your application and be in touch within {REVIEW_TIME}.
          </p>
        </div>
      </div>
    );
  }

  const busy = status.phase === "uploading" || status.phase === "sending";
  const last = step === sections.length - 1;

  return (
    <div className="form apply" ref={top}>
      <div className="apply__progress">
        <p>
          <strong>Section {step + 1} of {sections.length}</strong>
          <span>{sections[step]}</span>
        </p>
        <ol aria-hidden="true">
          {sections.map((s, i) => (
            <li key={s} className={i <= step ? "is-done" : undefined} />
          ))}
        </ol>
      </div>

      <form
        name={APPLICATION_FORM_NAME}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (busy) return;
          if (last) submit();
          else next();
        }}
      >
        <p className="hidden">
          <label>
            Leave this field empty:{" "}
            <input name="bot-field" tabIndex={-1} autoComplete="off" value={val("bot-field")} onChange={onText("bot-field")} />
          </label>
        </p>

        <h2 className="apply__title">
          {step + 1}. {sections[step]}
        </h2>
        <p className="apply__hint">Fields marked * are required.</p>

        <div className="apply__fields">
          {step === 0 && (
            <>
              {Text({ name: "business_name", label: "Business name", required: true, autoComplete: "organization" })}
              {Radios({ name: "business_type", label: "Business type", options: businessTypes })}
              {isLtd && Text({ name: "company_number", label: "Company number" })}
              <div className="form__row">
                {Text({ name: "contact_name", label: "Contact name", required: true, autoComplete: "name" })}
                {Text({ name: "mobile", label: "Mobile number", required: true, type: "tel", inputMode: "tel", autoComplete: "tel" })}
              </div>
              {Text({ name: "email", label: "Email", required: true, type: "email", inputMode: "email", autoComplete: "email" })}
              {Text({ name: "business_address", label: "Business address and postcode", required: true, textarea: true, autoComplete: "street-address" })}
              <div className="form__row">
                {Text({ name: "years_trading", label: "Years trading", required: true, inputMode: "numeric" })}
                {Text({ name: "website", label: "Website or social media", autoComplete: "url" })}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              {Checks({ name: "trades", label: "Trades you provide", options: tradeOptions })}
              {otherTrade && Text({ name: "trades_other", label: "Other trade", required: true })}
              {Checks({ name: "areas", label: "Areas you cover", options: areaOptions })}
              {Checks({ name: "availability", label: "Availability", options: availabilityOptions })}
              {Radios({ name: "team_size", label: "Team size", options: teamSizes })}
              {Radios({ name: "own_van_tools", label: "Own van and tools?", options: yesNo })}
            </>
          )}

          {step === 2 && (
            <>
              <div className="form__row">
                {Text({ name: "day_rate", label: "Day rate (£)", required: true, inputMode: "decimal" })}
                {Text({ name: "hourly_rate", label: "Hourly rate (£)", inputMode: "decimal" })}
              </div>
              <div className="form__row">
                {Text({ name: "callout_charge", label: "Call-out charge (£, or \"None\")", required: true })}
                {Text({ name: "emergency_rate", label: "Out-of-hours or emergency rate (£)" })}
              </div>
              {Text({ name: "rates_notes", label: "Anything else about your rates, e.g. materials", textarea: true })}
            </>
          )}

          {step === 3 && (
            <>
              <p className="apply__label">Public liability insurance</p>
              <div className="form__row">
                {Text({ name: "pl_insurer", label: "Insurer", required: true })}
                {Text({ name: "pl_cover", label: "Cover amount", required: true, hint: "e.g. £2m" })}
              </div>
              {Text({ name: "pl_expiry", label: "Expiry date", required: true, type: "date" })}
              {Upload({ field: "pl_certificate", required: true })}
              {Radios({ name: "employs_staff", label: "Do you employ anyone?", options: yesNo })}
              {employs && (
                <>
                  <p className="apply__label">Employers&apos; liability insurance</p>
                  {Text({ name: "el_expiry", label: "Expiry date", required: true, type: "date" })}
                  {Upload({ field: "el_certificate", required: true })}
                </>
              )}
            </>
          )}

          {step === 4 && (
            <>
              {Text({ name: "utr", label: "UTR number", required: true, inputMode: "numeric", hint: "Your 10-digit Unique Taxpayer Reference" })}
              {Radios({ name: "cis_status", label: "CIS status", options: cisOptions })}
              {Radios({ name: "vat_registered", label: "VAT registered?", options: yesNo })}
              {vatYes && Text({ name: "vat_number", label: "VAT number", required: true })}
            </>
          )}

          {step === 5 && (
            <>
              {Upload({
                field: "id_documents",
                required: true,
                children: (
                  <span className="apply__hint">
                    Upload photo ID and proof of right to work in the UK, e.g. passport, or a Home
                    Office share code.
                  </span>
                ),
              })}
              {Text({ name: "share_code", label: "Home Office share code", hint: "If you're proving your right to work with a share code" })}
            </>
          )}

          {step === 6 &&
            Upload({
              field: "qualifications",
              required: true,
              children: (
                <div className="apply__notice">
                  <p>
                    Please upload valid accreditation and compliance certificates relevant to the
                    services you provide.
                  </p>
                  <ul>
                    <li>
                      <strong>Gas works (natural gas / LPG):</strong> you must hold current Gas Safe
                      Register certification covering the applicable categories.
                    </li>
                    <li>
                      <strong>Oil boilers and oil-fired appliances:</strong> you must hold a valid
                      OFTEC registration for the relevant scope of works.
                    </li>
                    <li>
                      <strong>Electrical works:</strong> you must be registered with a recognised UK
                      electrical competent person scheme, such as NICEIC, NAPIT, ECA or ELECSA,
                      appropriate to the work undertaken.
                    </li>
                    <li>
                      <strong>Fire alarms and emergency lighting:</strong> evidence of third-party
                      certification or scheme membership (e.g. BAFE, NICEIC Fire, FIA) may be
                      required, depending on the scope of works.
                    </li>
                    <li>
                      <strong>Other trades:</strong> relevant trade qualifications (e.g. NVQ, City
                      &amp; Guilds) or a CSCS card.
                    </li>
                  </ul>
                  <p>
                    All documents must be in date, legible, and issued in the name of the person or
                    company carrying out the works.
                  </p>
                </div>
              ),
            })}

          {step === 7 && (
            <>
              {Radios({ name: "dbs", label: "Do you hold a DBS certificate?", options: yesNo, required: false })}
              {dbsYes && Upload({ field: "dbs_certificate", required: true })}
              {Radios({ name: "rams", label: "Can you provide risk assessments and method statements (RAMS)?", options: yesNo, required: false })}
              {[1, 2].map((n) => (
                <fieldset className="apply__group" key={n}>
                  <legend>
                    Reference {n} <span className="req">(optional)</span>
                  </legend>
                  <div className="apply__ref">
                    {Text({ name: `ref${n}_name`, label: "Name" })}
                    {Text({ name: `ref${n}_company`, label: "Company" })}
                    {Text({ name: `ref${n}_phone`, label: "Phone", type: "tel", inputMode: "tel" })}
                  </div>
                </fieldset>
              ))}
              {Upload({ field: "work_photos", imagesOnly: true })}
            </>
          )}

          {step === 8 && (
            <fieldset className={`apply__group${errors.declarations ? " apply__group--invalid" : ""}`}>
              <legend>
                Please confirm <span className="req" aria-hidden="true">*</span>
              </legend>
              <div className="mot__options">
                {declarations.map((d, i) => (
                  <label className="mot__option" key={d}>
                    <input
                      type="checkbox"
                      checked={decl[i]}
                      onChange={() => setDecl((prev) => prev.map((x, j) => (j === i ? !x : x)))}
                    />
                    <span className="mot__option-label">
                      {i === declarations.length - 1 ? (
                        <>
                          {d.replace("privacy policy", "")}
                          <Link href="/privacy/" target="_blank">
                            privacy policy
                          </Link>
                        </>
                      ) : (
                        d
                      )}
                    </span>
                  </label>
                ))}
              </div>
              {errorFor("declarations")}
            </fieldset>
          )}
        </div>

        {status.phase === "uploading" && (
          <p className="form__status" role="status">
            Uploading documents ({status.done + 1} of {status.total}): {status.current}
          </p>
        )}
        {status.phase === "sending" && (
          <p className="form__status" role="status">
            Sending your application…
          </p>
        )}
        {status.phase === "error" && (
          <p className="form__status" role="alert">
            {status.message} Please try again, or call us on <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        )}
        {Object.keys(errors).length > 0 && (
          <p className="apply__error" role="alert">
            Please fix the highlighted fields to continue.
          </p>
        )}

        <div className="apply__nav">
          {step > 0 && (
            <button type="button" className="btn btn--ghost" onClick={() => goTo(step - 1)} disabled={busy}>
              Back
            </button>
          )}
          <button type="submit" className="btn" disabled={busy || preparing !== null}>
            {last ? (busy ? "Sending…" : "Submit application") : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
