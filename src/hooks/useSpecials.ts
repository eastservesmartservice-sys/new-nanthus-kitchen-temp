import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import type { ApiSpecial } from "../types/api";

export interface Special {
  id: string;
  title: string;
  description: string;
  type: string;
  dayOfWeek: string | null;
  imageUrl: string;
  imageUrls: string[];
}

function mapSpecial(raw: ApiSpecial): Special {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description ?? "",
    type: raw.type,
    dayOfWeek: raw.dayOfWeek,
    imageUrl: getImageUrl(raw.imageUrls?.[0]),
    imageUrls: (raw.imageUrls ?? []).map(getImageUrl),
  };
}

export function useSpecials() {
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<ApiSpecial[]>("/specials/current")
      .then((data) => setSpecials(data.sort((a, b) => a.sortOrder - b.sortOrder).map(mapSpecial)))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { specials, loading, error };
}
