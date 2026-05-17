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
  hours: string;
  orderLink: string;
  mapLink: string;
  image: string;
  accent: "tomato" | "teal";
}

export interface MenuItem {
  name: string;
  price: string;
  popular?: boolean;
}

export interface MenuCategory {
  category: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  alt: string;
  orientation: "wide" | "tall" | "square";
}

export interface SpecialItem {
  label: string;
  title: string;
  description: string;
  price: string;
  availability: string;
  image: string;
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

export const locations: LocationInfo[] = [
  {
    id: "scarborough",
    name: "Scarborough",
    address: "80 Nashdene Rd",
    city: "Scarborough, ON M1V 5E4",
    phones: ["(416) 299-1999", "(416) 388-4791"],
    hours: "Daily 11:00 AM - 9:30 PM",
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=548c1a41-011d-488a-8876-d7815c9181d7&facebook=true",
    mapLink: "https://maps.google.com/?q=80+Nashdene+Rd,+Scarborough,+ON",
    image:
      "https://images.unsplash.com/photo-1498644421673-1ec1b3bdb5b5?w=1200&q=84&auto=format&fit=crop",
    accent: "tomato",
  },
  {
    id: "markham",
    name: "Markham",
    address: "72-30 Karachi Dr",
    city: "Markham, ON L3S 0B6",
    phones: ["(289) 554-5999"],
    hours: "Daily 11:00 AM - 9:30 PM",
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=d171d5c5-0412-4013-b588-c52b5513f592&facebook=true",
    mapLink: "https://maps.google.com/?q=72-30+Karachi+Dr,+Markham,+ON",
    image:
      "https://images.unsplash.com/photo-1514516870926-49ced6c7fdfd?w=1200&q=84&auto=format&fit=crop",
    accent: "teal",
  },
];

export const heroImage = "/pittu_landing_page.png";

export const pageImages = {
  menu: "https://images.unsplash.com/photo-1473093295043-6c0a7800bb07?w=1600&q=84&auto=format&fit=crop",
  specials:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=84&auto=format&fit=crop",
  order:
    "https://images.unsplash.com/photo-1495714393975-3fb6c1c661af?w=1600&q=84&auto=format&fit=crop",
  catering:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=84&auto=format&fit=crop",
  contact:
    "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=1600&q=84&auto=format&fit=crop",
  gallery:
    "https://images.unsplash.com/photo-1492160547594-83d12dbf0f68?w=1600&q=84&auto=format&fit=crop",
};

export const menuCategories: MenuCategory[] = [
  {
    category: "Kothu",
    items: [
      { name: "Chicken Kothu", price: "$12 | NS $14", popular: true },
      { name: "Mutton Kothu", price: "$12 | NS $15" },
      { name: "Beef Kothu", price: "$12 | NS $15" },
      { name: "Veggie Kothu", price: "$10" },
      { name: "Egg Kothu", price: "$10" },
      { name: "Dolphin Kothu", price: "$14 | NS $16" },
      { name: "Seafood Kothu", price: "$14 | NS $16" },
      { name: "Fish Kothu", price: "$14 | NS $16" },
      { name: "Cheese Kothu", price: "$15", popular: true },
    ],
  },
  {
    category: "Grilled",
    subtitle: "Includes rice, veggie, fries, or salad",
    items: [
      { name: "Chicken Breast Skewer", price: "$15" },
      { name: "Chicken Dark Skewer", price: "$15" },
      { name: "Lamb Skewer", price: "$16" },
      { name: "Lamb Chop (4pc)", price: "$18", popular: true },
      { name: "Chicken Shawarma", price: "$15" },
      { name: "Beef Shawarma", price: "$15" },
      { name: "Beef Skewers", price: "$16" },
    ],
  },
  {
    category: "Chicken Dishes",
    items: [
      { name: "Chicken Devil", price: "$15", popular: true },
      { name: "Chicken 65", price: "$15", popular: true },
      { name: "Chili Chicken", price: "$15" },
      { name: "Tandoori Leg", price: "$4" },
      { name: "Butter Chicken", price: "$16", popular: true },
      { name: "Chicken Curry", price: "M $9 | L $15" },
      { name: "Chicken + Mix Veg", price: "$15" },
      { name: "Chicken Tikka Masala", price: "$15" },
      { name: "Jaffna Style Kozhi Pukkai", price: "$12" },
    ],
  },
  {
    category: "Seafood Dishes",
    items: [
      { name: "Mix Seafood Devil", price: "$18", popular: true },
      { name: "Shrimp Devil", price: "$17" },
      { name: "Squid Devil", price: "$17" },
      { name: "Chili With Shrimp & Calamari", price: "$18" },
      { name: "Fried Calamari", price: "$16" },
    ],
  },
  {
    category: "Beef Dishes",
    items: [
      { name: "Beef Devil", price: "$16", popular: true },
      { name: "Chili Beef", price: "$16" },
      { name: "Beef Pepper Fried", price: "$15" },
      { name: "Garlic Beef + Veg", price: "$15" },
    ],
  },
  {
    category: "Lamb Dishes",
    items: [
      {
        name: "Lamb Curry (Jaffna Style)",
        price: "M $10 | L $16",
        popular: true,
      },
    ],
  },
  {
    category: "Biryani",
    items: [
      { name: "Chicken Biryani", price: "$15", popular: true },
      { name: "Mutton Biryani", price: "$16" },
      { name: "Fish Biryani", price: "$17" },
      { name: "Seafood Biryani", price: "$17" },
      { name: "Veggie Biryani", price: "$14" },
    ],
  },
  {
    category: "Fried Rice",
    items: [
      { name: "Chicken Fried Rice", price: "$15" },
      { name: "Beef Fried Rice", price: "$16" },
      { name: "Seafood Fried Rice", price: "$17" },
      { name: "Veggie Fried Rice", price: "$13" },
      { name: "Shawarma Fried Rice", price: "$15", popular: true },
      { name: "Nasi Goreng Fried Rice", price: "$15" },
    ],
  },
  {
    category: "Noodles",
    items: [
      { name: "Chicken Noodles", price: "$15" },
      { name: "Beef Noodles", price: "$16" },
      { name: "Seafood Noodles", price: "$17" },
      { name: "Veggie Noodles", price: "$12" },
      { name: "Nanthu's Special Noodles", price: "$20", popular: true },
      { name: "Chicken & Shrimp Noodles", price: "$17" },
      { name: "Seafood & Chicken Noodles", price: "$18" },
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "Chicken & Shrimp Pasta", price: "$17" },
      { name: "Chicken Pasta", price: "$15" },
      { name: "Chicken, Shrimp, Sausage Pasta", price: "$18", popular: true },
      { name: "Seafood Pasta", price: "$17" },
      { name: "Shrimp & Sausage Pasta", price: "$17" },
      { name: "Veggie Pasta", price: "$13" },
    ],
  },
  {
    category: "Poutines",
    items: [
      { name: "Chicken Shawarma Poutine", price: "$14", popular: true },
      { name: "Beef Shawarma Poutine", price: "$15" },
      { name: "Jaffna Style Poutine", price: "$14" },
    ],
  },
  {
    category: "Short Eats",
    items: [
      { name: "Mutton Rolls", price: "$1.75", popular: true },
      { name: "Chicken Rolls", price: "$1.75", popular: true },
      { name: "Veggie Rolls", price: "$1.50" },
      { name: "Paruthurai Vadai", price: "$0.75" },
      { name: "Fish Cutlet", price: "$1" },
      { name: "Chicken Samosa", price: "$1" },
      { name: "Mutton Samosa", price: "$1" },
      { name: "Veg Samosa (3)", price: "$2" },
      { name: "Spring Rolls (3)", price: "$1" },
      { name: "Laddu", price: "$5" },
      { name: "Cake Box", price: "$7 | $13" },
    ],
  },
  {
    category: "Jaffna Specialties",
    items: [
      { name: "Banana Leaf - Chicken", price: "$16", popular: true },
      { name: "Banana Leaf - Veggie", price: "$14" },
      { name: "Banana Leaf - Mutton", price: "$17" },
      { name: "Banana Leaf - Any Seafood", price: "$17" },
      { name: "Banana Leaf - All Seafood", price: "$25" },
      { name: "Lamprais", price: "$17", popular: true },
      { name: "Veggie Puttu", price: "$10" },
      { name: "Seafood Puttu", price: "$14" },
      { name: "Veggie Idiyappam", price: "$10" },
      { name: "Seafood Idiyappam", price: "$14" },
      { name: "Roti", price: "$1.50" },
      { name: "Lemon Rice", price: "$12" },
      { name: "Seafood Combo", price: "$25" },
      { name: "Jaffna Style Kool", price: "$12", popular: true },
    ],
  },
  {
    category: "Sandwiches",
    items: [
      { name: "Chicken Shawarma with Pop", price: "$10" },
      { name: "Beef Shawarma with Pop", price: "$12" },
      { name: "Falafel Sandwich", price: "$8" },
      { name: "Chicken Shawarma Wrap", price: "$13", popular: true },
      { name: "Beef Shawarma Wrap", price: "$15" },
    ],
  },
  {
    category: "Kids Menu",
    items: [
      { name: "Chicken Fingers & Fries (3pc)", price: "$10" },
      { name: "Kids Chicken Pasta", price: "$10" },
      { name: "Kids Chicken Shawarma", price: "$8.99" },
      { name: "Kids Beef Shawarma", price: "$8.99" },
      { name: "Fish & Chips (2pc)", price: "$12" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Tea", price: "$1.75" },
      { name: "Water", price: "$1.50" },
      { name: "Soft Drinks", price: "$2" },
      { name: "Mango Can", price: "$2.50" },
      { name: "Pineapple", price: "$2.50" },
      { name: "Apple Juice", price: "$2.50" },
      { name: "Orange Juice", price: "$2.50" },
      { name: "Necto", price: "$2.75" },
    ],
  },
];

export const specials: SpecialItem[] = [
  {
    label: "Kitchen special",
    title: "Pittu",
    description:
      "Steamed cylinders of ground rice and fresh coconut — a house specialty served with curry, sambol, or coconut milk.",
    price: "$10",
    availability: "Available daily",
    image:
      "https://images.unsplash.com/photo-1496346651079-6ca5cb67f42f?w=900&q=84&auto=format&fit=crop",
  },
  {
    label: "Weekend kitchen pot",
    title: "Chicken Soup",
    description:
      "A slow simmered weekend broth with layered spice, herbs, and a warming finish.",
    price: "Market price",
    availability: "Saturday and Sunday",
    image:
      "https://images.unsplash.com/photo-1498644421673-1ec1b3bdb5b5?w=900&q=84&auto=format&fit=crop",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Banana leaf rice",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1473093295043-6c0a7800bb07?w=1200&q=84&auto=format&fit=crop",
    alt: "Banana leaf rice",
    orientation: "wide",
  },
  {
    id: 2,
    title: "Pittu",
    category: "Jaffna Specialties",
    image:
      "https://images.unsplash.com/photo-1498644421673-1ec1b3bdb5b5?w=1200&q=84&auto=format&fit=crop",
    alt: "Freshly steamed pittu with coconut",
    orientation: "tall",
  },
  {
    id: 3,
    title: "Chicken biryani",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=84&auto=format&fit=crop",
    alt: "Chicken biryani with herbs",
    orientation: "square",
  },
  {
    id: 4,
    title: "Grilled skewers",
    category: "Grill",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=84&auto=format&fit=crop",
    alt: "Grilled skewers",
    orientation: "tall",
  },
  {
    id: 5,
    title: "Seafood platter",
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=84&auto=format&fit=crop",
    alt: "Seafood platter",
    orientation: "square",
  },
  {
    id: 6,
    title: "Butter chicken",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=84&auto=format&fit=crop",
    alt: "Butter chicken bowl",
    orientation: "wide",
  },
  {
    id: 7,
    title: "Fresh samosas",
    category: "Short eats",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=84&auto=format&fit=crop",
    alt: "Fresh samosas",
    orientation: "tall",
  },
  {
    id: 8,
    title: "Dining table",
    category: "Dining",
    image:
      "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=1200&q=84&auto=format&fit=crop",
    alt: "Dining table with food",
    orientation: "wide",
  },
  {
    id: 9,
    title: "Special noodles",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=84&auto=format&fit=crop",
    alt: "Noodle dish",
    orientation: "square",
  },
  {
    id: 10,
    title: "Fried rice",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1514516870926-49ced6c7fdfd?w=1200&q=84&auto=format&fit=crop",
    alt: "Fried rice",
    orientation: "square",
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
