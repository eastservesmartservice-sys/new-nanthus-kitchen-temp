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
  loaded: boolean;
}

let galleryCache: GalleryImage[] | null = null;

export function useGallery() {
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<GalleryState>(() => ({
    images: galleryCache ?? [],
    error: null,
    loaded: !!galleryCache,
  }));

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

        galleryCache = result;
        setState({ images: result, error: null, loaded: true });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") {
          setState((current) => ({
            images: current.images,
            error: current.images.length ? null : e.message,
            loaded: true,
          }));
        }
      });

    return () => controller.abort();
  }, [tick]);

  const images = galleryCache ?? state.images;
  const error = state.error;

  return {
    images,
    loading: !state.loaded && images.length === 0 && !error,
    error,
  };
}
