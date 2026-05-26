export interface ApiMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  priceScarborough: number | null;
  priceMarkham: number | null;
  locationAvailability: string; // 'both' | 'scarborough' | 'markham'
  allergens: string[] | null;
  dietaryInfo: string[] | null;
  isAvailable: boolean;
  imageUrls: string[] | null;
  sortOrder: number;
  categoryId: string;
  hasMeasurements: boolean;
  measurements: ApiMenuItemMeasurement[];
}

export interface ApiMenuItemMeasurement {
  id: string;
  label: string;
  price: number;
}

export interface ApiMenuCategory {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  items: ApiMenuItem[];
}

export interface ApiSpecial {
  id: string;
  title: string;
  description: string | null;
  type: string;
  dayOfWeek: string | null;
  specialCategory: string | null;
  isActive: boolean;
  imageUrls: string[] | null;
  sortOrder: number;
  displayStartDate: string | null;
  displayEndDate: string | null;
}

export interface ApiOpeningHours {
  id: string;
  location: string;
  dayOfWeek: string;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
}

// ── Gallery (admin-managed) ───────────────────────────────────────────────────

export interface ApiGallerySection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ApiGalleryItem {
  id: string;
  title: string;
  description: string | null;
  categoryId: string | null;
  category: ApiGallerySection | null;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnailUrl: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ApiGalleryGrouped {
  category: ApiGallerySection | null;
  items: ApiGalleryItem[];
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
