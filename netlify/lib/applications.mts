import { createHmac, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

// Subcontractor documents are kept in a private Netlify Blobs store. Nothing in
// it has a public URL: files are only read back through the download function,
// and only with a link signed using SUBCONTRACTOR_LINK_SECRET.

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const CHUNK_BYTES = 3 * 1024 * 1024; // keeps each request under the function payload limit
export const MAX_PARTS = Math.ceil(MAX_FILE_BYTES / CHUNK_BYTES);

export const ALLOWED_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  heic: "image/heic",
  heif: "image/heif",
};

export const APP_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const FILE_ID = /^[a-z0-9_-]{1,40}$/;

export type FileMeta = { name: string; type: string; size: number; parts: number; uploadedAt: string };

export const store = () => getStore({ name: "subcontractor-applications", consistency: "strong" });

export const isConfigured = () => (process.env.SUBCONTRACTOR_LINK_SECRET ?? "").length >= 32;

function secret(): string {
  const value = process.env.SUBCONTRACTOR_LINK_SECRET;
  if (!value || value.length < 32) throw new Error("SUBCONTRACTOR_LINK_SECRET is not set");
  return value;
}

export const sign = (app: string, file: string) =>
  createHmac("sha256", secret()).update(`${app}/${file}`).digest("base64url");

export function verify(app: string, file: string, signature: string): boolean {
  const expected = Buffer.from(sign(app, file));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function downloadUrl(origin: string, app: string, file: string): string {
  const params = new URLSearchParams({ a: app, f: file, s: sign(app, file) });
  return `${origin}/api/subcontractor/file?${params}`;
}

export const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
