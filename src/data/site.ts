import type { ReactNode } from "react";

export interface NavLink {
  key: string;
  path: string;
}

export interface LocationInfo {
  id: "scarborough" | "markham";
  name: string;
  address: string;
  city: string;
  phones: string[];
  hours: string[];
  orderLink: string;
  mapLink: string;
  image: string;
  imageSrcSet: string;
  imageSizes: string;
  accent: "tomato" | "teal";
}

export interface FeatureCard {
  title: string;
  description: string;
  path?: string;
  image?: string;
  icon?: ReactNode;
}

export const navLinks: NavLink[] = [
  { key: "home", path: "/" },
  { key: "menu", path: "/menu" },
  { key: "specials", path: "/specials" },
  { key: "gallery", path: "/gallery" },
  { key: "order", path: "/order" },
  { key: "catering", path: "/catering" },
  { key: "contact", path: "/contact" },
];

export const contactEmail = "newnanthuskitchen@gmail.com";

export const socials = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/share/1HHiP73yE2/?mibextid=wwXIfr",
  },
  { label: "Instagram", url: "https://www.instagram.com/newnanthuskitchen" },
];

export interface StaticImage {
  src: string;
  srcSet: string;
  sizes: string;
}

const jpgImage = (
  name: string,
  widths: number[],
  fallbackWidth: number,
  sizes = "100vw",
): StaticImage => ({
  src: `/optimized/${name}-${fallbackWidth}.jpg`,
  srcSet: widths.map((width) => `/optimized/${name}-${width}.jpg ${width}w`).join(", "),
  sizes,
});

export const logoImage = "/optimized/new_nanthus_kitchen_logo-256.png";
export const logoImageSrcSet = [
  "/optimized/new_nanthus_kitchen_logo-96.png 96w",
  "/optimized/new_nanthus_kitchen_logo-192.png 192w",
  "/optimized/new_nanthus_kitchen_logo-256.png 256w",
  "/optimized/new_nanthus_kitchen_logo-512.png 512w",
].join(", ");

export const heroImageSet = jpgImage("pittu_landing_page", [768, 1280, 1536], 1536);
export const heroImage = heroImageSet.src;
export const homeFeatureImageSet = jpgImage(
  "home_feature",
  [768, 1280, 1536],
  1280,
  "(max-width: 900px) 100vw, 42vw",
);

export const pageImageSets = {
  menu: jpgImage("menu_banner", [768, 1280, 1717], 1717),
  specials: jpgImage("specials_banner", [768, 1280, 1701], 1701),
  order: jpgImage("order_banner", [768, 1280, 1536], 1536),
  catering: jpgImage("catering_banner", [768, 1280, 1720], 1720),
  contact: jpgImage("contact_banner", [768, 1280, 1717], 1717),
  gallery: jpgImage("gallery_banner", [768, 1280, 1717], 1717),
};

export const pageImages = {
  menu: pageImageSets.menu.src,
  specials: pageImageSets.specials.src,
  order: pageImageSets.order.src,
  catering: pageImageSets.catering.src,
  contact: pageImageSets.contact.src,
  gallery: pageImageSets.gallery.src,
};

const locationImageSizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 640px";
const locationImageSets = {
  scarborough: jpgImage("scarborough", [768, 1280, 1693], 1280, locationImageSizes),
  markham: jpgImage("markham", [768, 1280, 1720], 1280, locationImageSizes),
};

export const locations: LocationInfo[] = [
  {
    id: "scarborough",
    name: "Scarborough",
    address: "80 Nashdene Rd",
    city: "Scarborough, ON M1V 5E4",
    phones: ["(416) 299-1999", "(416) 388-4791"],
    hours: ["Sun – Thu: 8 AM – 10 PM", "Fri – Sat: 10 AM – 10 PM"],
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=548c1a41-011d-488a-8876-d7815c9181d7&facebook=true",
    mapLink: "https://maps.app.goo.gl/BhDAhF9jiPi9HLia9",
    image: locationImageSets.scarborough.src,
    imageSrcSet: locationImageSets.scarborough.srcSet,
    imageSizes: locationImageSets.scarborough.sizes,
    accent: "tomato",
  },
  {
    id: "markham",
    name: "Markham",
    address: "72-30 Karachi Dr",
    city: "Markham, ON L3S 0B6",
    phones: ["(289) 554-5999"],
    hours: ["Mon – Fri: 11 AM – 11 PM", "Sat – Sun: 10 AM – 11 PM"],
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=d171d5c5-0412-4013-b588-c52b5513f592&facebook=true",
    mapLink: "https://maps.app.goo.gl/ck2Lnqn9AhWs6EbV8",
    image: locationImageSets.markham.src,
    imageSrcSet: locationImageSets.markham.srcSet,
    imageSizes: locationImageSets.markham.sizes,
    accent: "teal",
  },
];

export const cateringServices = [
  {
    title: "Corporate meals",
    description:
      "Timed lunch trays, meeting meals, and office portions that are easy to serve.",
    details: [
      "Flexible portions",
      "Pickup or arranged service",
      "Menu guidance",
    ],
  },
  {
    title: "Weddings and milestones",
    description:
      "Traditional Sri Lankan spreads for larger family gatherings and celebrations.",
    details: ["Banana leaf options", "Large format curries", "Custom packages"],
  },
  {
    title: "Cultural events",
    description:
      "Jaffna style menus built around familiar dishes, short eats, and festive service.",
    details: ["Traditional recipes", "Seasonal dishes", "Community events"],
  },
];
