// Browser helpers for the subcontractor application uploads.

const CHUNK_BYTES = 3 * 1024 * 1024; // must match netlify/lib/applications.mts
const COMPRESS_OVER = 1.5 * 1024 * 1024;
const MAX_DIMENSION = 2400;

const EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "heic", "heif"];

export const extensionOf = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";
export const isAllowed = (file: File) => EXTENSIONS.includes(extensionOf(file.name));
export const isImage = (file: File) => ["jpg", "jpeg", "png", "heic", "heif"].includes(extensionOf(file.name));

export function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)}MB` : `${Math.ceil(bytes / 1024)}KB`;
}

// Re-encode large photos as JPEG at a sensible size before upload. Anything the
// browser can't decode (e.g. HEIC outside Safari) is uploaded unchanged.
export async function compressImage(file: File): Promise<File> {
  if (!isImage(file) || file.size <= COMPRESS_OVER) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

// Uploads a file in chunks and returns its private download link.
export async function uploadFile(appId: string, fileId: string, file: File): Promise<string> {
  const parts = Math.ceil(file.size / CHUNK_BYTES);
  let url = "";
  for (let part = 0; part < parts; part++) {
    const params = new URLSearchParams({
      app: appId,
      file: fileId,
      name: file.name,
      part: String(part),
      parts: String(parts),
      size: String(file.size),
    });
    const res = await fetch(`/api/subcontractor/upload?${params}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: file.slice(part * CHUNK_BYTES, (part + 1) * CHUNK_BYTES),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
    if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);
    if (data.url) url = data.url;
  }
  if (!url) throw new Error("Upload failed");
  return url;
}
