import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import type { ApiMenuCategory } from "../types/api";

export type LocationId = "scarborough" | "markham";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string | null;
  imageUrl: string;
  isAvailable: boolean;
  dietaryInfo: string[];
  hasMeasurements: boolean;
  measurements: { label: string; price: string }[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

function effectivePrice(
  item: { price: number | null; priceScarborough: number | null; priceMarkham: number | null },
  location: LocationId,
): number | null {
  if (location === "scarborough") return item.priceScarborough ?? item.price;
  return item.priceMarkham ?? item.price;
}

function formatPrice(price: number | null | undefined): string | null {
  if (price == null) return null;
  return `$${Number(price).toFixed(2)}`;
}

function mapCategory(raw: ApiMenuCategory, location: LocationId): MenuCategory {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    items: (raw.items ?? [])
      .filter((i) => i.isAvailable)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description ?? "",
        price: formatPrice(effectivePrice(i, location)),
        imageUrl: getImageUrl(i.imageUrls?.[0]),
        isAvailable: i.isAvailable,
        dietaryInfo: i.dietaryInfo ?? [],
        hasMeasurements: i.hasMeasurements,
        measurements: (i.measurements ?? []).map((m) => ({
          label: m.label,
          price: formatPrice(m.price) ?? "",
        })),
      })),
  };
}

export function useMenu(location: LocationId) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch<ApiMenuCategory[]>(`/menu/categories?location=${location}`)
      .then((data) => {
        setCategories(
          data
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((c) => mapCategory(c, location)),
        );
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [location]);

  return { categories, loading, error };
}
