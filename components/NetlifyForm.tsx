"use client";

import { useState, type FormEvent } from "react";
import type { Field, FormConfig } from "@/lib/forms";
import { site } from "@/lib/site";
import { CheckIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

function Input({ field, formName }: { field: Field; formName: string }) {
  const id = `${formName}-${field.name}`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    autoComplete: field.autoComplete,
  };
  return (
    <div className="field">
      <label htmlFor={id}>
        {field.label} {!field.required && <span className="req">(optional)</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} />
      ) : field.type === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>
            Please choose
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={field.type ?? "text"} />
      )}
    </div>
  );
}

// Group consecutive half-width fields into two-column rows.
function layout(fields: Field[]) {
  const rows: Field[][] = [];
  for (const f of fields) {
    const last = rows[rows.length - 1];
    if (f.half && last && last.length === 1 && last[0].half) last.push(f);
    else rows.push([f]);
  }
  return rows;
}

export default function NetlifyForm({ config }: { config: FormConfig }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      // Netlify Forms picks up submissions posted to the static form
      // definition file in /public.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form" role="status">
        <div className="form__success">
          <CheckIcon />
          <h3>{config.successTitle}</h3>
          <p className="form__note">{config.successText}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="form"
      name={config.name}
      method="POST"
      action="/thank-you/"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={config.name} />
      <p className="hidden">
        <label>
          Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {layout(config.fields).map((row) =>
        row.length === 2 ? (
          <div className="form__row" key={row[0].name}>
            <Input field={row[0]} formName={config.name} />
            <Input field={row[1]} formName={config.name} />
          </div>
        ) : (
          <Input field={row[0]} formName={config.name} key={row[0].name} />
        ),
      )}

      {status === "error" && (
        <p className="form__status" role="alert">
          Sorry, something went wrong sending your form. Please try again or call us
          on <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      )}

      <p className="form__note">
        By submitting this form, you agree that your details may be shared with a
        member of our team to discuss your enquiry.
      </p>

      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : config.submitLabel}
      </button>
    </form>
  );
}
