import { useEffect, useState } from "react";
import { apiFetch, getImageUrl } from "../lib/api";
import { onRealtime } from "../lib/realtime";
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

interface MenuState {
  categories: MenuCategory[];
  error: string | null;
  location: LocationId | null;
}

const menuCache = new Map<LocationId, MenuCategory[]>();

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
    items: [...(raw.items ?? [])]
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
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<MenuState>(() => {
    const cached = menuCache.get(location);
    return { categories: cached ?? [], error: null, location: cached ? location : null };
  });

  useEffect(() => onRealtime("menu:update", () => setTick((t) => t + 1)), []);

  useEffect(() => {
    const controller = new AbortController();

    apiFetch<ApiMenuCategory[]>(`/menu/categories?location=${location}`, { signal: controller.signal })
      .then((data) => {
        const categories = [...data]
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((c) => mapCategory(c, location));

        menuCache.set(location, categories);
        setState({ categories, error: null, location });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") {
          setState((current) => ({
            categories: current.location === location ? current.categories : [],
            error: current.location === location && current.categories.length
              ? null
              : "Oops! Something went wrong loading the menu. Please try again or give us a call.",
            location,
          }));
        }
      });

    return () => controller.abort();
  }, [location, tick]);

  const cached = menuCache.get(location);
  const isCurrent = state.location === location;
  const categories = cached ?? (isCurrent ? state.categories : []);
  const error = isCurrent ? state.error : null;

  return {
    categories,
    loading: categories.length === 0 && !error,
    error,
  };
}
