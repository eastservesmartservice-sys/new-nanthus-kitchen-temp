const BASE_URL = "https://newnanthuskitchen.com";
const OG_DEFAULT_IMAGE = `${BASE_URL}/optimized/pittu_landing_page-1280.jpg`;

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
}

export const seoConfig: Record<string, PageSEO> = {
  "/": {
    title: "New Nanthu's Kitchen | Authentic Sri Lankan Cuisine in Toronto",
    description:
      "Authentic Sri Lankan cuisine from Jaffna, served fresh in Scarborough & Markham. 50+ dishes — Kothu Roti, Biryani, Banana Leaf Rice, seafood & catering. Order pickup today.",
    canonical: `${BASE_URL}/`,
    ogImage: OG_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/menu": {
    title: "Our Menu | Sri Lankan Kothu, Biryani & Jaffna Curries — New Nanthu's Kitchen",
    description:
      "Browse 50+ authentic Sri Lankan dishes: Kothu Roti, Chicken Biryani, Jaffna Curry, Banana Leaf Rice, Seafood, Shawarma & more. Pickup in Scarborough or Markham.",
    canonical: `${BASE_URL}/menu`,
    ogImage: `${BASE_URL}/optimized/menu_banner-1280.jpg`,
    ogType: "website",
  },
  "/specials": {
    title: "Today's Specials | Daily Sri Lankan Lunch Boxes — New Nanthu's Kitchen",
    description:
      "Fresh daily specials from New Nanthu's Kitchen. Everyday $10 lunch boxes, weekend Sri Lankan Chicken Soup & chef's picks — made from scratch every morning.",
    canonical: `${BASE_URL}/specials`,
    ogImage: `${BASE_URL}/optimized/specials_banner-1280.jpg`,
    ogType: "website",
  },
  "/order": {
    title: "Order Pickup | Sri Lankan Food Ready in 20–30 Min — New Nanthu's Kitchen",
    description:
      "Order authentic Sri Lankan food for pickup from Scarborough or Markham. 50+ dishes ready in 20–30 minutes. 10% off your first order.",
    canonical: `${BASE_URL}/order`,
    ogImage: `${BASE_URL}/optimized/order_banner-1280.jpg`,
    ogType: "website",
  },
  "/catering": {
    title: "Sri Lankan Catering Services | Weddings, Corporate & Events — New Nanthu's Kitchen",
    description:
      "Authentic Sri Lankan catering for weddings, corporate events & cultural celebrations in Toronto. Banana leaf service, large-format Jaffna curries & custom menus.",
    canonical: `${BASE_URL}/catering`,
    ogImage: `${BASE_URL}/optimized/catering_banner-1280.jpg`,
    ogType: "website",
  },
  "/contact": {
    title: "Contact Us | Scarborough & Markham Locations — New Nanthu's Kitchen",
    description:
      "Get in touch with New Nanthu's Kitchen. Two locations: 80 Nashdene Rd, Scarborough & 72-30 Karachi Dr, Markham. Call (416) 299-1999 or send a message.",
    canonical: `${BASE_URL}/contact`,
    ogImage: `${BASE_URL}/optimized/contact_banner-1280.jpg`,
    ogType: "website",
  },
  "/gallery": {
    title: "Photo Gallery | Sri Lankan Food & Restaurant — New Nanthu's Kitchen",
    description:
      "Explore photos of our authentic Sri Lankan dishes — Kothu Roti, Banana Leaf Rice, Biryani, catering events & more from New Nanthu's Kitchen.",
    canonical: `${BASE_URL}/gallery`,
    ogImage: `${BASE_URL}/optimized/gallery_banner-1280.jpg`,
    ogType: "website",
  },
};

export const defaultSEO = seoConfig["/"];
