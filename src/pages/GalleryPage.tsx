import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PageBanner from "../components/PageBanner";
import { pageImageSets, pageImages } from "../data/site";
import { useGallery } from "../hooks/useGallery";
import { tokens } from "../theme";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { images, loading, error } = useGallery();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((item) => item.category)))],
    [images],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((item) => item.category === activeCategory),
    [activeCategory, images],
  );

  const selected = lightboxIndex === null ? undefined : filtered[lightboxIndex];

  const closeLightbox = () => setLightboxIndex(null);

  const moveLightbox = useCallback(
    (direction: -1 | 1) => {
      setLightboxIndex((current) => {
        if (current === null || filtered.length === 0) return current;
        return (current + direction + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") moveLightbox(1);
      else if (e.key === "ArrowLeft") moveLightbox(-1);
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, moveLightbox]);

  // Reset to "All" if active category disappears after data reload
  useEffect(() => {
    if (activeCategory !== "All" && !categories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [categories, activeCategory]);

  return (
    <Box>
      <PageBanner
        eyebrow="Gallery"
        title="Food,"
        highlight="counter, moments"
        subtitle="A visual look at the dishes, tables, and pickup kitchen."
        image={pageImages.gallery}
        imageSrcSet={pageImageSets.gallery.srcSet}
        imageWebpSrcSet={pageImageSets.gallery.webpSrcSet}
        imageSizes={pageImageSets.gallery.sizes}
        imageAlt="Kitchen plating"
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        {/* ── Filter pills ────────────────────────────────────────────── */}
        <Stack
          direction="row"
          gap={1}
          role="group"
          aria-label="Filter gallery by category"
          sx={{
            mb: 5,
            overflowX: { xs: "auto", sm: "visible" },
            flexWrap: { xs: "nowrap", sm: "wrap" },
            pb: { xs: 0.5, sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {categories.map((category) => {
            const active = activeCategory === category;
            const count =
              category === "All"
                ? images.length
                : images.filter((i) => i.category === category).length;
            return (
              <Button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                size="small"
                aria-pressed={active}
                sx={{
                  borderRadius: "999px",
                  px: 2,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  bgcolor: active ? tokens.colors.primary.main : tokens.colors.bg.card,
                  color: active ? tokens.colors.text.primary : tokens.colors.text.secondary,
                  border: `1px solid ${active ? tokens.colors.primary.main : tokens.colors.line.subtle}`,
                  "&:hover": {
                    bgcolor: active ? tokens.colors.primary.light : tokens.colors.bg.warm,
                    borderColor: active
                      ? tokens.colors.primary.light
                      : tokens.colors.line.medium,
                    color: tokens.colors.text.primary,
                  },
                }}
              >
                {category}
                <Box
                  component="span"
                  sx={{
                    ml: 0.75,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    opacity: active ? 0.75 : 0.55,
                  }}
                >
                  {count}
                </Box>
              </Button>
            );
          })}
        </Stack>

        {/* ── Loading ──────────────────────────────────────────────────── */}
        {loading && (
          <Box sx={{ display: "grid", placeItems: "center", py: 10 }}>
            <CircularProgress sx={{ color: tokens.colors.primary.main }} />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ color: tokens.colors.text.secondary }}>
              Gallery unavailable right now. Please try again shortly.
            </Typography>
          </Box>
        )}

        {!loading && !error && filtered.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ color: tokens.colors.text.secondary }}>
              No items yet — check back soon.
            </Typography>
          </Box>
        )}

        {/* ── Masonry grid ─────────────────────────────────────────────── */}
        {!loading && filtered.length > 0 && (
          <Box sx={{ columns: { xs: 1, sm: 2, lg: 3 }, columnGap: 2.5 }}>
            {filtered.map((item, index) => (
              <Box
                key={item.id}
                component="button"
                onClick={() => setLightboxIndex(index)}
                sx={{
                  width: "100%",
                  display: "block",
                  mb: 2.5,
                  p: 0,
                  border: "none",
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  breakInside: "avoid",
                  bgcolor: tokens.colors.bg.card,
                  cursor: "pointer",
                  textAlign: "left",
                  position: "relative",
                  "&:hover .gallery-media": { transform: "scale(1.06)" },
                  "&:hover .gallery-overlay": { opacity: 1 },
                  "&:hover .gallery-info": { transform: "translateY(0)", opacity: 1 },
                }}
              >
                {/* Media thumbnail */}
                <Box sx={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                  {item.mediaType === "video" ? (
                    <>
                      <Box
                        component="video"
                        src={item.src}
                        className="gallery-media"
                        muted
                        preload="metadata"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.6s ease",
                        }}
                      />
                      {/* Play icon overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <PlayCircleOutlineIcon
                          sx={{
                            fontSize: 56,
                            color: "rgba(255,255,255,0.85)",
                            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                          }}
                        />
                      </Box>
                    </>
                  ) : (
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="gallery-media image-cover"
                      sx={{ transition: "transform 0.6s ease" }}
                    />
                  )}

                  {/* Hover gradient overlay */}
                  <Box
                    className="gallery-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 30%, rgba(23,27,23,0.88) 100%)",
                      opacity: { xs: 1, sm: 0 },
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  {/* Title + category on hover */}
                  <Stack
                    className="gallery-info"
                    gap={0.3}
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      transform: { xs: "translateY(0)", sm: "translateY(8px)" },
                      opacity: { xs: 1, sm: 0 },
                      transition: "transform 0.4s ease, opacity 0.4s ease",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: tokens.colors.dark.textPrimary,
                        fontSize: "0.92rem",
                      }}
                    >
                      {item.alt}
                    </Typography>
                    <Typography
                      sx={{
                        color: tokens.colors.primary.main,
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.category}
                    </Typography>
                  </Stack>
                </Box>

                {/* Card footer */}
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
                  <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {item.alt}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.78rem" }}>
                    {item.category}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <Dialog
        open={!!selected}
        onClose={closeLightbox}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            bgcolor: "#0a0d0a",
            color: tokens.colors.dark.textPrimary,
            borderRadius: isMobile ? 0 : tokens.radius.xl,
            overflow: "hidden",
            border: isMobile ? "none" : `1px solid ${tokens.colors.dark.borderSubtle}`,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {selected && (
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Lightbox header */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 1.5, md: 2 },
                borderBottom: `1px solid ${tokens.colors.dark.borderSubtle}`,
                flexShrink: 0,
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", md: "1rem" } }}
                >
                  {selected.alt}
                </Typography>
                <Typography
                  sx={{
                    color: tokens.colors.primary.main,
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {selected.category}
                </Typography>
              </Box>
              <IconButton
                onClick={closeLightbox}
                aria-label="Close gallery"
                sx={{
                  color: tokens.colors.dark.textPrimary,
                  minWidth: 44,
                  minHeight: 44,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            {/* Media area */}
            <Box
              sx={{
                flex: 1,
                display: "grid",
                placeItems: "center",
                bgcolor: "#0a0d0a",
                overflow: "hidden",
                minHeight: 0,
              }}
            >
              {selected.mediaType === "video" ? (
                <Box
                  component="video"
                  src={selected.src}
                  controls
                  autoPlay
                  sx={{
                    maxHeight: isMobile ? "calc(100vh - 128px)" : "72vh",
                    width: "100%",
                    display: "block",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={selected.src}
                  alt={selected.alt}
                  loading="eager"
                  decoding="async"
                  sx={{
                    maxHeight: isMobile ? "calc(100vh - 128px)" : "72vh",
                    width: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </Box>

            {/* Description (if any) */}
            {selected.description && (
              <Box
                sx={{
                  px: { xs: 2, md: 3 },
                  pt: 1,
                  borderTop: `1px solid ${tokens.colors.dark.borderSubtle}`,
                }}
              >
                <Typography
                  sx={{
                    color: tokens.colors.dark.textSecondary,
                    fontSize: "0.82rem",
                    py: 1,
                  }}
                >
                  {selected.description}
                </Typography>
              </Box>
            )}

            {/* Lightbox navigation */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 2 },
                borderTop: `1px solid ${tokens.colors.dark.borderSubtle}`,
                flexShrink: 0,
              }}
            >
              <IconButton
                onClick={() => moveLightbox(-1)}
                aria-label="Previous"
                sx={{
                  color: tokens.colors.dark.textSecondary,
                  minWidth: 52,
                  minHeight: 52,
                  display: { xs: "flex", sm: "none" },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Button
                onClick={() => moveLightbox(-1)}
                startIcon={<ArrowBackIcon />}
                aria-label="Previous"
                sx={{
                  color: tokens.colors.dark.textSecondary,
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": { color: tokens.colors.dark.textPrimary },
                }}
              >
                Previous
              </Button>

              <Typography
                sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.8rem" }}
                aria-live="polite"
                aria-atomic="true"
              >
                {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filtered.length}
              </Typography>

              <IconButton
                onClick={() => moveLightbox(1)}
                aria-label="Next"
                sx={{
                  color: tokens.colors.dark.textSecondary,
                  minWidth: 52,
                  minHeight: 52,
                  display: { xs: "flex", sm: "none" },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
              <Button
                onClick={() => moveLightbox(1)}
                endIcon={<ArrowForwardIcon />}
                aria-label="Next"
                sx={{
                  color: tokens.colors.dark.textSecondary,
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": { color: tokens.colors.dark.textPrimary },
                }}
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
