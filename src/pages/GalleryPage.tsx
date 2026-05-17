import { useMemo, useState } from "react";
import { Box, Button, Container, Dialog, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import PageBanner from "../components/PageBanner";
import { galleryItems, pageImages } from "../data/site";
import { tokens } from "../theme";

const aspectRatio = {
  wide: "4 / 3",
  tall: "3 / 4",
  square: "1 / 1",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const categories = useMemo(() => ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))], []);
  const filtered = useMemo(
    () => (activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)),
    [activeCategory],
  );
  const selected = lightboxIndex === null ? undefined : filtered[lightboxIndex];

  const closeLightbox = () => setLightboxIndex(null);
  const moveLightbox = (direction: -1 | 1) => {
    setLightboxIndex((current) => {
      if (current === null || filtered.length === 0) return current;
      return (current + direction + filtered.length) % filtered.length;
    });
  };

  return (
    <Box>
      <PageBanner
        eyebrow="Gallery"
        title="Food,"
        highlight="counter, moments"
        subtitle="A visual look at the dishes, tables, and pickup kitchen."
        image={pageImages.gallery}
        imageAlt="Kitchen plating"
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        {/* ── Filter pills ──────────────────────────────────────────── */}
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 5 }}>
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <Button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                size="small"
                sx={{
                  borderRadius: "999px",
                  px: 2,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  bgcolor: active ? tokens.colors.text.primary : tokens.colors.bg.card,
                  color: active ? tokens.colors.text.inverse : tokens.colors.text.secondary,
                  border: `1px solid ${active ? tokens.colors.text.primary : tokens.colors.line.subtle}`,
                  "&:hover": {
                    bgcolor: active ? tokens.colors.text.primary : tokens.colors.bg.warm,
                    borderColor: active ? tokens.colors.text.primary : tokens.colors.line.medium,
                    color: active ? tokens.colors.text.inverse : tokens.colors.text.primary,
                  },
                }}
              >
                {category}
              </Button>
            );
          })}
        </Stack>

        {/* ── Masonry grid ──────────────────────────────────────────── */}
        <Box
          sx={{
            columns: { xs: 1, sm: 2, lg: 3 },
            columnGap: "20px",
          }}
        >
          {filtered.map((item, index) => (
            <Box
              key={item.id}
              component="button"
              onClick={() => setLightboxIndex(index)}
              sx={{
                width: "100%",
                display: "block",
                mb: "20px",
                p: 0,
                border: "none",
                borderRadius: tokens.radius.xl,
                overflow: "hidden",
                breakInside: "avoid",
                bgcolor: tokens.colors.bg.card,
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                "&:hover .gallery-img": { transform: "scale(1.06)" },
                "&:hover .gallery-overlay": { opacity: 1 },
                "&:hover .gallery-info": { transform: "translateY(0)", opacity: 1 },
              }}
            >
              <Box sx={{ aspectRatio: aspectRatio[item.orientation], overflow: "hidden", position: "relative" }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.alt}
                  className="gallery-img image-cover"
                  sx={{ transition: "transform 0.6s ease" }}
                />
                <Box
                  className="gallery-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 30%, rgba(23,27,23,0.88) 100%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  }}
                />
                <Stack
                  className="gallery-info"
                  gap={0.3}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    transform: "translateY(8px)",
                    opacity: 0,
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: tokens.colors.dark.textPrimary, fontSize: "0.92rem" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.primary.main, fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {item.category}
                  </Typography>
                </Stack>
              </Box>
              <Stack
                gap={0.5}
                sx={{
                  p: 1.8,
                  border: `1px solid ${tokens.colors.line.subtle}`,
                  borderTop: "none",
                  borderBottomLeftRadius: tokens.radius.xl,
                  borderBottomRightRadius: tokens.radius.xl,
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{item.title}</Typography>
                <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.78rem" }}>{item.category}</Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      <Dialog
        open={!!selected}
        onClose={closeLightbox}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0a0d0a",
            color: tokens.colors.dark.textPrimary,
            borderRadius: tokens.radius.xl,
            overflow: "hidden",
            border: `1px solid ${tokens.colors.dark.borderSubtle}`,
          },
        }}
      >
        {selected && (
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 3, py: 2, borderBottom: `1px solid ${tokens.colors.dark.borderSubtle}` }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{selected.title}</Typography>
                <Typography sx={{ color: tokens.colors.primary.main, fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {selected.category}
                </Typography>
              </Box>
              <IconButton onClick={closeLightbox} aria-label="Close gallery image" sx={{ color: tokens.colors.dark.textPrimary }}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Box sx={{ maxHeight: "72vh", display: "grid", placeItems: "center", bgcolor: "#0a0d0a" }}>
              <Box
                component="img"
                src={selected.image}
                alt={selected.alt}
                sx={{ maxHeight: "72vh", width: "100%", objectFit: "contain", display: "block" }}
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: 3, py: 2, borderTop: `1px solid ${tokens.colors.dark.borderSubtle}` }}
            >
              <Button
                onClick={() => moveLightbox(-1)}
                startIcon={<ArrowBackIcon />}
                sx={{ color: tokens.colors.dark.textSecondary, "&:hover": { color: tokens.colors.dark.textPrimary } }}
              >
                Previous
              </Button>
              <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.8rem" }}>
                {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filtered.length}
              </Typography>
              <Button
                onClick={() => moveLightbox(1)}
                endIcon={<ArrowForwardIcon />}
                sx={{ color: tokens.colors.dark.textSecondary, "&:hover": { color: tokens.colors.dark.textPrimary } }}
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
