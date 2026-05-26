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
  loaded: boolean;
}

let specialsCache: Special[] | null = null;

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
  const [state, setState] = useState<SpecialsState>(() => ({
    specials: specialsCache ?? [],
    error: null,
    loaded: !!specialsCache,
  }));

  useEffect(() => onRealtime("special:update", () => setTick((t) => t + 1)), []);

  useEffect(() => {
    const controller = new AbortController();

    apiFetch<ApiSpecial[]>("/specials/current", { signal: controller.signal })
      .then((data) => {
        const specials = [...data].sort((a, b) => a.sortOrder - b.sortOrder).map(mapSpecial);
        specialsCache = specials;
        setState({
          specials,
          error: null,
          loaded: true,
        });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") {
          setState((current) => ({
            specials: current.specials,
            error: current.specials.length ? null : e.message,
            loaded: true,
          }));
        }
      });

    return () => controller.abort();
  }, [tick]);

  const specials = specialsCache ?? state.specials;
  const error = state.error;

  return {
    specials,
    loading: !state.loaded && specials.length === 0 && !error,
    error,
  };
}
