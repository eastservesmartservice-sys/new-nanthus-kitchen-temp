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

export const heroImage = "/pittu_landing_page.png";

export const pageImages = {
  menu: "/menu_banner.png",
  specials: "/specials_banner.png",
  order: "/order_banner.png",
  catering: "/catering_banner.png",
  contact: "/contact_banner.jpg",
  gallery: "/gallery_banner.png",
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
    image: "/scarborough.png",
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
    image: "/markham.png",
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
