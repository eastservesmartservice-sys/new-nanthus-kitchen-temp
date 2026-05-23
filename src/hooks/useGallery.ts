import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import { onRealtime } from "../lib/realtime";
import type { ApiMenuCategory, ApiSpecial } from "../types/api";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface GalleryState {
  images: GalleryImage[];
  error: string | null;
  requestKey: number | null;
}

export function useGallery() {
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<GalleryState>({
    images: [],
    error: null,
    requestKey: null,
  });

  useEffect(() => {
    const offMenu = onRealtime("menu:update", () => setTick((t) => t + 1));
    const offSpecial = onRealtime("special:update", () => setTick((t) => t + 1));
    return () => { offMenu(); offSpecial(); };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      apiFetch<ApiSpecial[]>("/specials/current", { signal: controller.signal }),
      apiFetch<ApiMenuCategory[]>("/menu/categories", { signal: controller.signal }),
    ])
      .then(([specials, categories]) => {
        const result: GalleryImage[] = [];

        for (const special of specials) {
          for (const url of special.imageUrls ?? []) {
            result.push({
              id: `special-${special.id}-${result.length}`,
              src: getImageUrl(url),
              alt: special.title,
              category: "Specials",
            });
          }
        }

        for (const cat of categories) {
          for (const item of cat.items ?? []) {
            for (const url of item.imageUrls ?? []) {
              result.push({
                id: `menu-${item.id}-${result.length}`,
                src: getImageUrl(url),
                alt: item.name,
                category: cat.name,
              });
            }
          }
        }

        setState({ images: result, error: null, requestKey: tick });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") {
          setState({ images: [], error: e.message, requestKey: tick });
        }
      });

    return () => controller.abort();
  }, [tick]);

  const isCurrent = state.requestKey === tick;

  return {
    images: isCurrent ? state.images : [],
    loading: !isCurrent,
    error: isCurrent ? state.error : null,
  };
}
