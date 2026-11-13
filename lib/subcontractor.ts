import { site } from "./site";

// Subcontractor application (Work with us page). Netlify registers the form
// and its fields from public/__forms.html, so keep that file in sync.
export const APPLICATION_FORM_NAME = "subcontractor-application";
export const REVIEW_TIME = "5 working days";

export const MAX_FILE_MB = 10;
export const MAX_WORK_PHOTOS = 10;
export const ACCEPT = ".pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/jpeg,image/png,image/heic,image/heif";

export const sections = [
  "Business details",
  "Trades and coverage",
  "Rates",
  "Insurance",
  "Tax and CIS",
  "Right to work and ID",
  "Qualifications",
  "Optional extras",
  "Declaration",
];

export const businessTypes = ["Sole trader", "Limited company", "Partnership"];
export const tradeOptions = [
  "Plastering",
  "Decorating",
  "Flooring",
  "Joinery",
  "Plumbing",
  "Gas and heating",
  "Electrical",
  "Roofing and guttering",
  "Gardens and grounds",
  "General maintenance",
  "Other",
];
export const areaOptions = site.areas;
export const availabilityOptions = ["Full-time", "Part-time", "Weekends", "Emergency call-outs"];
export const teamSizes = ["Just me", "2–5", "6+"];
export const cisOptions = ["Registered for gross payment", "Registered (net)", "Not registered"];
export const yesNo = ["Yes", "No"];

export const declarations = [
  "The information and documents I've provided are accurate and up to date",
  "I will inform JS Property Maintenance if my insurance, registrations or CIS status change",
  "I understand that submitting this form doesn't guarantee work, and successful applicants will be asked to sign a subcontractor agreement before receiving jobs",
  "I consent to JS Property Maintenance storing my details and documents to assess my application, in line with its privacy policy",
];

// Document upload fields: `max` files each.
export const fileFields = {
  pl_certificate: { label: "Public liability insurance certificate", max: 1 },
  el_certificate: { label: "Employers' liability insurance certificate", max: 1 },
  id_documents: { label: "Photo ID and proof of right to work", max: 5 },
  qualifications: { label: "Qualifications, registrations and accreditations", max: 15 },
  dbs_certificate: { label: "DBS certificate", max: 1 },
  work_photos: { label: "Examples of work", max: MAX_WORK_PHOTOS },
} as const;

export type FileField = keyof typeof fileFields;
