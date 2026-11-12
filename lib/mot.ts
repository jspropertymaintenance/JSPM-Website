// ===================================================================
// PROPERTY MOT PRICES (£)
// Change prices here; the quote form and panel update automatically.
// ===================================================================
export const MOT_PRICES = {
  // Step 2: property type (added to the MOT guide price)
  property: {
    flat: 65, // Flat or 1-bed
    house23: 80, // 2–3 bed house
    house4: 110, // 4+ bed house
    hmoBase: 100, // HMO base price...
    hmoPerRoom: 15, // ...plus this per lettable room
  },
  // Step 3: add-ons (added to the MOT guide price)
  addons: {
    loft: 20, // Loft inspection
    keys: 20, // Key collection and return
    keySafe: 35, // Key safe fitting, "from" price, excluding the key safe unit
  },
  // Step 4: partner services ("from" prices, NOT added to the MOT price)
  partners: {
    gasSafety: 75, // Gas safety certificate
    gasBoiler: 110, // Gas safety certificate + boiler service
    eicr: 125, // EICR (electrical safety report)
    roof: 130, // Roof and gutter inspection
    alarms: 100, // Smoke and CO alarm check or upgrade, per alarm
  },
};

export const HMO_DEFAULT_ROOMS = 5;

// Netlify registers this form and its fields from public/__forms.html, so keep
// that file in sync when adding a field.
export const MOT_FORM_NAME = "property-mot";

const p = MOT_PRICES;

export const visitTypes = [
  { id: "mid", label: "Mid-tenancy check", short: "Mid-tenancy check" },
  { id: "eot", label: "End of tenancy (void)", short: "End of tenancy" },
] as const;

export const propertyTypes = [
  { id: "flat", label: "Flat or 1-bed", priceText: `£${p.property.flat}` },
  { id: "house23", label: "2–3 bed house", priceText: `£${p.property.house23}` },
  { id: "house4", label: "4+ bed house", priceText: `£${p.property.house4}` },
  {
    id: "hmo",
    label: "HMO",
    priceText: `£${p.property.hmoBase} + £${p.property.hmoPerRoom} per lettable room`,
  },
] as const;

export const addons = [
  { id: "loft", label: "Loft inspection", price: p.addons.loft, priceText: `+ £${p.addons.loft}`, from: false },
  {
    id: "keys",
    label: "Key collection and return (from a letting agent's office)",
    short: "Key collection and return",
    price: p.addons.keys,
    priceText: `+ £${p.addons.keys}`,
    from: false,
  },
  {
    id: "keySafe",
    label: "Key safe fitting",
    note: "Excluding key safe unit",
    price: p.addons.keySafe,
    priceText: `from £${p.addons.keySafe}`,
    from: true,
  },
] as const;

export const partnerServices = [
  { id: "gasSafety", label: "Gas safety certificate", price: p.partners.gasSafety, priceText: `from £${p.partners.gasSafety}` },
  {
    id: "gasBoiler",
    label: "Gas safety certificate + boiler service",
    price: p.partners.gasBoiler,
    priceText: `from £${p.partners.gasBoiler}`,
  },
  { id: "eicr", label: "EICR (electrical safety report)", price: p.partners.eicr, priceText: `from £${p.partners.eicr}` },
  { id: "roof", label: "Roof and gutter inspection", price: p.partners.roof, priceText: `from £${p.partners.roof}` },
  {
    id: "alarms",
    label: "Smoke and CO alarm check or upgrade",
    price: p.partners.alarms,
    priceText: `from £${p.partners.alarms} per alarm`,
  },
] as const;

export type VisitId = (typeof visitTypes)[number]["id"];
export type PropertyId = (typeof propertyTypes)[number]["id"];
export type AddonId = (typeof addons)[number]["id"];
export type PartnerId = (typeof partnerServices)[number]["id"];

export function propertyPrice(property: PropertyId, rooms: number): number {
  if (property === "hmo") return p.property.hmoBase + p.property.hmoPerRoom * rooms;
  return p.property[property];
}

export const money = (n: number) => `£${n.toLocaleString("en-GB")}`;
