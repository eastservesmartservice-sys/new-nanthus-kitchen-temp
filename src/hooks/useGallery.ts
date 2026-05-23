import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import type { ApiMenuCategory, ApiSpecial } from "../types/api";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiFetch<ApiSpecial[]>("/specials/current"),
      apiFetch<ApiMenuCategory[]>("/menu/categories"),
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

        setImages(result);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { images, loading, error };
}
