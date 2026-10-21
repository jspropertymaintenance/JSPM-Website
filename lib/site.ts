export const site = {
  name: "JS Property Maintenance",
  shortName: "JSPM",
  url: "https://www.jspropertymaintenance.com",
  description:
    "One local team covering every trade: planned, reactive and managed maintenance for landlords, letting agents, serviced accommodation and homeowners across Teesside and the North East.",
  phone: "01642 989867",
  phoneHref: "tel:+441642989867",
  email: "contact@jspm.uk",
  hours: [
    { days: "Monday to Friday", time: "8:00am to 4:00pm" },
    { days: "Saturday and Sunday", time: "Closed" },
  ],
  areas: [
    "Middlesbrough",
    "Stockton-on-Tees",
    "Darlington",
    "Hartlepool",
    "Redcar",
    "Durham",
    "Sunderland",
    "Newcastle",
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/process/", label: "Process" },
  { href: "/services/", label: "Services" },
  { href: "/work-with-us/", label: "Work with us" },
  { href: "/contact/", label: "Contact" },
];

export const audiences = [
  {
    title: "Landlords",
    text: "Compliant properties, happy tenants and maintenance costs you can plan for.",
  },
  {
    title: "Letting and management agents",
    text: "One contractor for every property across a managed portfolio.",
  },
  {
    title: "Serviced accommodation",
    text: "Quick turnarounds that protect your reviews and your occupancy.",
  },
  {
    title: "Developers",
    text: "Dependable trades that keep refurbs and projects on schedule.",
  },
  {
    title: "Homeowners",
    text: "General upkeep and improvements that keep your home safe and working well.",
  },
];

export const advantages = [
  {
    title: "Structured delivery",
    text: "Planned and reactive work follows an organised process: jobs are scheduled, communicated and completed on time.",
  },
  {
    title: "Flexible support",
    text: "Routine upkeep, targeted repairs, compliance checks and end-of-tenancy works, shaped around what you need.",
  },
  {
    title: "Vetted trades",
    text: "A checked network of plumbers, electricians, joiners, plasterers, floor fitters and general maintenance operatives.",
  },
  {
    title: "Single point of contact",
    text: "One contractor coordinates every trade, handles the communication and oversees the whole job.",
  },
];

export const serviceCategories = [
  {
    title: "Planned maintenance",
    text: "Routine upkeep that heads off problems, extends the life of your assets and keeps properties compliant.",
    items: [
      "Scheduled minor repairs",
      "Resealing and cosmetic upkeep",
      "Decorating refreshes",
      "Routine checks and adjustments",
    ],
    status: "available" as const,
  },
  {
    title: "Reactive repairs",
    text: "A fast, multi-trade response to faults, breakdowns and urgent repairs.",
    items: [
      "Plumbing leaks and faults",
      "Electrical issues and EICR remedials",
      "Joinery repairs",
      "Damp and plastering fixes",
    ],
    status: "available" as const,
  },
  {
    title: "Managed maintenance",
    text: "A structured monthly model for landlords, agents and serviced accommodation operators.",
    items: [
      "Monthly retainer plans",
      "Turnkey service",
      "Compliance checks",
      "Full reporting and coordination",
    ],
    status: "soon" as const,
  },
];

export const trades = [
  { title: "Plumbing", text: "Leaks, tap and toilet repairs, bathroom upgrades and installations." },
  { title: "Electrical", text: "Fault finding, socket and lighting repairs, and all EICR remedial work." },
  { title: "Joinery", text: "Doors, locks, kitchen upgrades, skirting and architraves." },
  { title: "Plastering", text: "Damp repairs, re-boarding and full room re-plastering." },
  { title: "Decorating", text: "Interior and exterior: preparation, emulsion and woodwork finishing." },
  { title: "Gardens", text: "Fencing, patios, gates, hedge trimming, grass cutting and exterior upkeep." },
  { title: "Flooring", text: "Supply and fit of laminate, vinyl, LVT and carpet to suit any budget." },
  { title: "General maintenance", text: "Minor repairs, resealing, blinds, taps, handles and fixture adjustments." },
  { title: "Cleaning", text: "Standard and deep cleans, end-of-tenancy refreshes and appliance cleaning." },
];

export const steps = [
  {
    title: "Send us your enquiry",
    text: "Share the job details by phone, WhatsApp or our online form. We confirm the scope, visit if needed and give you a clear price.",
  },
  {
    title: "We get to work",
    text: "Once booked, we assign the right trade and keep you updated throughout: booking confirmation, regular updates and before-and-after photos.",
  },
  {
    title: "Job complete",
    text: "The work is finished, checked and logged. You get a job summary and invoice, with nothing left for you to chase.",
  },
];
