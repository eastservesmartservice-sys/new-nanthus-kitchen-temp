import { Helmet } from "react-helmet-async";
import { seoConfig, defaultSEO } from "./seoConfig";

interface SEOHeadProps {
  /** Route path key — must match a key in seoConfig (e.g. "/menu") */
  page: string;
  /** Optional JSON-LD structured data objects to inject as <script type="application/ld+json"> */
  schemas?: object[];
}

export default function SEOHead({ page, schemas = [] }: SEOHeadProps) {
  const seo = seoConfig[page] ?? defaultSEO;

  return (
    <Helmet>
      {/* ── Primary meta ─────────────────────────────────────────── */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      {/* ── Open Graph ───────────────────────────────────────────── */}
      <meta property="og:type" content={seo.ogType ?? "website"} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="New Nanthu's Kitchen" />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      {/* Width hint only — banner images are all 1280px wide */}
      {seo.ogImage && <meta property="og:image:width" content="1280" />}

      {/* ── Twitter Card ─────────────────────────────────────────── */}
      {/* twitter:site omitted — no Twitter/X account for this restaurant */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}

      {/* ── JSON-LD structured data ───────────────────────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
