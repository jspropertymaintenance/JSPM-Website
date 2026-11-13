import { APP_ID, FILE_ID, isConfigured, json, store, verify, type FileMeta } from "../lib/applications.mts";

// Serves a stored document, but only for a link with a valid signature. The
// links are sent to the business email with each application.
export default async (req: Request) => {
  const q = new URL(req.url).searchParams;
  const app = q.get("a") ?? "";
  const file = q.get("f") ?? "";
  const signature = q.get("s") ?? "";

  if (!isConfigured()) return json(503, { error: "Downloads aren't available right now" });
  if (!APP_ID.test(app) || !FILE_ID.test(file) || !verify(app, file, signature))
    return json(404, { error: "File not found" });

  const blobs = store();
  const meta = (await blobs.get(`${app}/${file}/meta`, { type: "json" })) as FileMeta | null;
  if (!meta) return json(404, { error: "File not found" });

  let part = 0;
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (part >= meta.parts) return controller.close();
      const chunk = await blobs.get(`${app}/${file}/${part++}`, { type: "arrayBuffer" });
      if (!chunk) return controller.error(new Error("Missing file part"));
      controller.enqueue(new Uint8Array(chunk));
    },
  });

  const filename = meta.name.replace(/[^\w.\- ]+/g, "_");
  return new Response(body, {
    headers: {
      "Content-Type": meta.type,
      "Content-Length": String(meta.size),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
};

export const config = { path: "/api/subcontractor/file" };
