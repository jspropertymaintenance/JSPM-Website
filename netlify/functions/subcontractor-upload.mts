import {
  ALLOWED_TYPES,
  APP_ID,
  CHUNK_BYTES,
  FILE_ID,
  MAX_FILE_BYTES,
  MAX_PARTS,
  downloadUrl,
  isConfigured,
  json,
  store,
  type FileMeta,
} from "../lib/applications.mts";

// Receives one chunk of an uploaded document and stores it privately.
// Files arrive in chunks of up to 3MB, uploaded in order; the response to the
// last chunk includes the private download link for the email.
export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  if (!isConfigured()) {
    console.error("SUBCONTRACTOR_LINK_SECRET is missing or shorter than 32 characters");
    return json(503, { error: "Document uploads aren't available right now" });
  }

  const q = new URL(req.url).searchParams;
  const app = q.get("app") ?? "";
  const file = q.get("file") ?? "";
  const name = (q.get("name") ?? "").slice(0, 200);
  const part = Number(q.get("part"));
  const parts = Number(q.get("parts"));
  const size = Number(q.get("size"));
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const type = ALLOWED_TYPES[ext];

  if (!APP_ID.test(app) || !FILE_ID.test(file) || !name) return json(400, { error: "Invalid upload" });
  if (!type) return json(415, { error: "Only PDF, JPG, PNG and HEIC files are accepted" });
  if (!Number.isInteger(size) || size < 1 || size > MAX_FILE_BYTES)
    return json(413, { error: "Files must be 10MB or smaller" });
  if (!Number.isInteger(parts) || parts !== Math.ceil(size / CHUNK_BYTES) || parts > MAX_PARTS)
    return json(400, { error: "Invalid upload" });
  if (!Number.isInteger(part) || part < 0 || part >= parts) return json(400, { error: "Invalid upload" });

  const body = await req.arrayBuffer();
  const expected = part === parts - 1 ? size - CHUNK_BYTES * (parts - 1) : CHUNK_BYTES;
  if (body.byteLength !== expected) return json(400, { error: "Upload was incomplete, please try again" });

  try {
    const blobs = store();
    await blobs.set(`${app}/${file}/${part}`, body);
    if (part < parts - 1) return json(200, { ok: true });

    const meta: FileMeta = { name, type, size, parts, uploadedAt: new Date().toISOString() };
    await blobs.setJSON(`${app}/${file}/meta`, meta);
    const origin = process.env.URL || new URL(req.url).origin;
    return json(200, { ok: true, url: downloadUrl(origin, app, file) });
  } catch (err) {
    console.error(err);
    return json(500, { error: "Upload failed, please try again" });
  }
};

export const config = { path: "/api/subcontractor/upload" };
