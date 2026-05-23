import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import { onRealtime } from "../lib/realtime";
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

interface SpecialsState {
  specials: Special[];
  error: string | null;
  requestKey: number | null;
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
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<SpecialsState>({
    specials: [],
    error: null,
    requestKey: null,
  });

  useEffect(() => onRealtime("special:update", () => setTick((t) => t + 1)), []);

  useEffect(() => {
    const controller = new AbortController();

    apiFetch<ApiSpecial[]>("/specials/current", { signal: controller.signal })
      .then((data) => {
        setState({
          specials: [...data].sort((a, b) => a.sortOrder - b.sortOrder).map(mapSpecial),
          error: null,
          requestKey: tick,
        });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") {
          setState({ specials: [], error: e.message, requestKey: tick });
        }
      });

    return () => controller.abort();
  }, [tick]);

  const isCurrent = state.requestKey === tick;

  return {
    specials: isCurrent ? state.specials : [],
    loading: !isCurrent,
    error: isCurrent ? state.error : null,
  };
}
