import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import { onRealtime } from "../lib/realtime";
import type { ApiGalleryGrouped } from "../types/api";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  category: string;
  mediaType: "image" | "video";
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

  // Re-fetch when gallery items change via WebSocket
  useEffect(() => {
    const off = onRealtime("gallery:update", () => {
      galleryCache = null;
      setTick((t) => t + 1);
    });
    return off;
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    apiFetch<ApiGalleryGrouped[]>("/gallery/public/grouped", {
      signal: controller.signal,
    })
      .then((grouped) => {
        const result: GalleryImage[] = [];

        for (const group of grouped) {
          const sectionName = group.category?.name ?? "General";
          for (const item of group.items) {
            result.push({
              id: item.id,
              src: getImageUrl(item.mediaUrl),
              alt: item.title,
              description: item.description ?? "",
              category: sectionName,
              mediaType: item.mediaType,
            });
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
