const BASE = import.meta.env.VITE_API_URL as string;
if (!BASE) throw new Error("VITE_API_URL environment variable is not set");

// Strip trailing slash.
const API = BASE.replace(/\/$/, "");

async function parseJsonResponse<T>(res: Response): Promise<T> {
  if (res.status === 204) return undefined as T;

  const text = await res.text();
  if (!text) return undefined as T;

  return JSON.parse(text) as T;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, init);
  if (!res.ok) throw new Error(`API ${path} -> ${res.status}`);
  return parseJsonResponse<T>(res);
}

export async function apiPost<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await parseJsonResponse<{ message?: string }>(res).catch(() => ({}) as { message?: string });
    throw new Error(err.message ?? `API ${path} -> ${res.status}`);
  }

  return parseJsonResponse<T>(res);
}

// Backend image URLs are relative (/uploads/...). Prepend the host (no /api part).
const HOST = API.replace(/\/api$/, "");
export function getImageUrl(relativePath: string | null | undefined): string {
  if (!relativePath) return "";
  if (relativePath.startsWith("http")) return relativePath;
  return `${HOST}${relativePath}`;
}
