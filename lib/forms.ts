import { audiences, trades } from "./site";

// Every form here must also be declared in public/__forms.html so Netlify
// registers it at deploy time. Keep the field names in sync.

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  autoComplete?: string;
  half?: boolean;
};

export type FormConfig = {
  name: string;
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successText: string;
};

const tradeOptions = [...trades.map((t) => t.title), "Multiple trades", "Not sure"];

export const quoteForm: FormConfig = {
  name: "quote",
  submitLabel: "Request my quote",
  successTitle: "Thanks, your request is in.",
  successText: "We'll review the details and be in touch shortly with next steps.",
  fields: [
    { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
    { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "postcode", label: "Property postcode", required: true, autoComplete: "postal-code", half: true },
    {
      name: "client_type",
      label: "I am a",
      type: "select",
      options: [...audiences.map((a) => a.title), "Other"],
      required: true,
      half: true,
    },
    { name: "service", label: "Service needed", type: "select", options: tradeOptions, required: true, half: true },
    {
      name: "urgency",
      label: "How soon do you need it?",
      type: "select",
      options: ["Urgent (within 48 hours)", "Within a week", "Within a month", "Flexible / planning ahead"],
      required: true,
    },
    { name: "message", label: "Tell us about the job", type: "textarea", required: true },
  ],
};

export const contactForm: FormConfig = {
  name: "contact",
  submitLabel: "Send message",
  successTitle: "Message sent.",
  successText: "Thanks for getting in touch. We'll reply as soon as we can.",
  fields: [
    { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
};

export const tradeForm: FormConfig = {
  name: "work-with-us",
  submitLabel: "Submit application",
  successTitle: "Application received.",
  successText: "Thanks for your interest. We'll be in touch about the next steps.",
  fields: [
    { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
    { name: "business", label: "Business name", autoComplete: "organization", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", half: true },
    { name: "trade", label: "Primary trade", type: "select", options: trades.map((t) => t.title).concat("Other"), required: true, half: true },
    {
      name: "experience",
      label: "Years of experience",
      type: "select",
      options: ["Under 2 years", "2 to 5 years", "5 to 10 years", "10+ years"],
      required: true,
      half: true,
    },
    { name: "areas", label: "Areas you cover" },
    { name: "message", label: "Tell us about your work, qualifications and insurance", type: "textarea" },
  ],
};

export const referralForm: FormConfig = {
  name: "referral",
  submitLabel: "Send referral",
  successTitle: "Referral received.",
  successText: "Thank you. We'll get in touch with them and keep you posted.",
  fields: [
    { name: "your_name", label: "Your name", required: true, autoComplete: "name", half: true },
    { name: "your_email", label: "Your email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "referral_name", label: "Their name", required: true, half: true },
    { name: "referral_contact", label: "Their phone or email", required: true, half: true },
    { name: "message", label: "What do they need help with?", type: "textarea" },
  ],
};
