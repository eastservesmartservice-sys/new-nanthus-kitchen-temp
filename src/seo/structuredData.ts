const BASE_URL = "https://newnanthuskitchen.com";

// ─── Restaurant (global, injected on every page) ───────────────────────────

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "New Nanthu's Kitchen",
  alternateName: "New Nanthus Kitchen",
  url: BASE_URL,
  logo: `${BASE_URL}/optimized/new_nanthus_kitchen_logo-512.png`,
  image: `${BASE_URL}/optimized/pittu_landing_page-1280.jpg`,
  description:
    "Authentic Sri Lankan cuisine from Jaffna served fresh in Scarborough and Markham, Toronto. 50+ dishes including Kothu Roti, Biryani, Banana Leaf Rice, seafood and catering.",
  servesCuisine: ["Sri Lankan", "Tamil", "Jaffna", "South Asian"],
  priceRange: "$$",
  hasMenu: `${BASE_URL}/menu`,
  email: "newnanthuskitchen@gmail.com",
  sameAs: [
    "https://www.facebook.com/share/1HHiP73yE2/?mibextid=wwXIfr",
    "https://www.instagram.com/newnanthuskitchen",
  ],
  containsPlace: [
    {
      "@type": "Restaurant",
      name: "New Nanthu's Kitchen — Scarborough",
      url: `${BASE_URL}/contact`,
      image: `${BASE_URL}/optimized/scarborough-1280.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "80 Nashdene Rd",
        addressLocality: "Scarborough",
        addressRegion: "ON",
        postalCode: "M1V 5E4",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.8154,
        longitude: -79.2695,
      },
      telephone: "+14162991999",
      servesCuisine: ["Sri Lankan", "Tamil", "Jaffna"],
      priceRange: "$$",
      hasMap: "https://maps.app.goo.gl/BhDAhF9jiPi9HLia9",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
    },
    {
      "@type": "Restaurant",
      name: "New Nanthu's Kitchen — Markham",
      url: `${BASE_URL}/contact`,
      image: `${BASE_URL}/optimized/markham-1280.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "72-30 Karachi Dr",
        addressLocality: "Markham",
        addressRegion: "ON",
        postalCode: "L3S 0B6",
        addressCountry: "CA",
      },
      telephone: "+12895545999",
      servesCuisine: ["Sri Lankan", "Tamil", "Jaffna"],
      priceRange: "$$",
      hasMap: "https://maps.app.goo.gl/ck2Lnqn9AhWs6EbV8",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "11:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "10:00",
          closes: "23:00",
        },
      ],
    },
  ],
};

// ─── BreadcrumbList per page ───────────────────────────────────────────────

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };
}

// ─── WebSite (sitelinks searchbox signal) ─────────────────────────────────

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "New Nanthu's Kitchen",
  url: BASE_URL,
};

// ─── Menu page — FoodMenu schema ──────────────────────────────────────────

export const menuPageSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "New Nanthu's Kitchen Menu",
  url: `${BASE_URL}/menu`,
  description:
    "50+ authentic Sri Lankan dishes including Kothu Roti, Biryani, Banana Leaf Rice, Jaffna Curries, Seafood and international favourites.",
  inLanguage: "en",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Kothu & Rice Dishes",
      description: "Traditional Sri Lankan kothu roti and rice-based dishes.",
    },
    {
      "@type": "MenuSection",
      name: "Biryani",
      description: "Aromatic rice dishes slow-cooked with authentic spices.",
    },
    {
      "@type": "MenuSection",
      name: "Curries",
      description: "Jaffna-style curries with bold, fresh spices.",
    },
    {
      "@type": "MenuSection",
      name: "Seafood",
      description: "Fresh seafood cooked in traditional Sri Lankan style.",
    },
    {
      "@type": "MenuSection",
      name: "International Favourites",
      description: "Shawarma, Butter Chicken, and more crowd pleasers.",
    },
  ],
};

// ─── Catering page — FAQPage schema ───────────────────────────────────────

export const cateringFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you offer Sri Lankan catering for weddings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. New Nanthu's Kitchen provides full catering for weddings and large celebrations, including traditional banana leaf service, large-format Jaffna curries, and custom packages tailored to your event.",
      },
    },
    {
      "@type": "Question",
      name: "Do you cater corporate events and office lunches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We provide corporate meals with flexible portions, customisable menus, and on-time service. Pickup or arranged service available.",
      },
    },
    {
      "@type": "Question",
      name: "Do you cater cultural events with authentic Sri Lankan food?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We specialise in authentic Jaffna-style menus for Tamil and Sri Lankan cultural events, featuring traditional recipes, seasonal dishes, and festive service.",
      },
    },
    {
      "@type": "Question",
      name: "How do I enquire about catering services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit our Contact page at newnanthuskitchen.com/contact or email newnanthuskitchen@gmail.com. We typically respond within 24 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Where is New Nanthu's Kitchen located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We have two locations in the Greater Toronto Area: 80 Nashdene Rd, Scarborough, ON M1V 5E4 and 72-30 Karachi Dr, Markham, ON L3S 0B6.",
      },
    },
  ],
};

// ─── Contact page — LocalBusiness schema ──────────────────────────────────

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "New Nanthu's Kitchen Locations",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "LocalBusiness",
        name: "New Nanthu's Kitchen — Scarborough",
        address: {
          "@type": "PostalAddress",
          streetAddress: "80 Nashdene Rd",
          addressLocality: "Scarborough",
          addressRegion: "ON",
          postalCode: "M1V 5E4",
          addressCountry: "CA",
        },
        telephone: "+14162991999",
        email: "newnanthuskitchen@gmail.com",
        url: BASE_URL,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "LocalBusiness",
        name: "New Nanthu's Kitchen — Markham",
        address: {
          "@type": "PostalAddress",
          streetAddress: "72-30 Karachi Dr",
          addressLocality: "Markham",
          addressRegion: "ON",
          postalCode: "L3S 0B6",
          addressCountry: "CA",
        },
        telephone: "+12895545999",
        email: "newnanthuskitchen@gmail.com",
        url: BASE_URL,
      },
    },
  ],
};
