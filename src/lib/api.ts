const BASE = (import.meta.env.VITE_API_URL as string) ?? "http://localhost:3000/api";

// Strip trailing slash
const API = BASE.replace(/\/$/, "");

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `API ${path} → ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// Backend image URLs are relative (/uploads/...). Prepend the host (no /api part).
const HOST = API.replace(/\/api$/, "");
export function getImageUrl(relativePath: string | null | undefined): string {
  if (!relativePath) return "";
  if (relativePath.startsWith("http")) return relativePath;
  return `${HOST}${relativePath}`;
}
