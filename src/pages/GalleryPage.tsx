import React, { useState, useRef, useEffect } from "react";
import {
  Box, Container, Typography, IconButton, Dialog,
  useMediaQuery, useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PageBanner from "../components/PageBanner";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { tokens } from "../theme";

// ── Types ─────────────────────────────────────────────────────────────────────
type Orientation = "landscape" | "portrait" | "square";
type MediaType   = "image" | "video";

interface GalleryItem {
  id:          number;
  type:        MediaType;
  src:         string;        // YouTube embed URL or mp4 path (for lightbox)
  thumb?:      string;        // poster image shown before hover
  previewSrc?: string;        // short mp4 clip that autoplays muted on hover
  alt:         string;
  orientation: Orientation;
  caption?:    string;
}

// ── Aspect ratio per orientation ──────────────────────────────────────────────
const aspectMap: Record<Orientation, string> = {
  landscape: "16/9",
  portrait:  "3/4",
  square:    "1/1",
};

// ── Gallery data — replace src values with your actual assets ────────────────
// For videos: use YouTube embed URLs (https://www.youtube.com/embed/VIDEO_ID)
//             or direct .mp4 file paths (e.g. /videos/kitchen.mp4)
const galleryItems: GalleryItem[] = [
  {
    id: 1, type: "image", orientation: "landscape",
    src:  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=85",
    alt:  "gallery.alts.bananaLeafRice",
    caption: "gallery.captions.bananaLeafRice",
  },
  {
    id: 2, type: "image", orientation: "portrait",
    src:  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=85",
    alt:  "gallery.alts.kothuRoti",
    caption: "gallery.captions.kothuRoti",
  },
  {
    id: 3, type: "video", orientation: "landscape",
    src:        "https://www.youtube.com/embed/b1RivKCRMRQ",
    thumb:      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    previewSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    alt:   "gallery.alts.kitchenAction",
    caption: "gallery.captions.kitchenAction",
  },
  {
    id: 4, type: "image", orientation: "square",
    src:  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=85",
    alt:  "gallery.alts.biryani",
    caption: "gallery.captions.biryani",
  },
  {
    id: 5, type: "image", orientation: "portrait",
    src:  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=85",
    alt:  "gallery.alts.lambSkewer",
    caption: "gallery.captions.lambSkewer",
  },
  {
    id: 6, type: "video", orientation: "portrait",
    src:        "https://www.youtube.com/embed/P3ALwKeSEYs",
    thumb:      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    previewSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    alt:   "gallery.alts.cateringEvent",
    caption: "gallery.captions.cateringEvent",
  },
  {
    id: 7, type: "image", orientation: "square",
    src:  "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=85",
    alt:  "gallery.alts.seafoodPlatter",
    caption: "gallery.captions.seafoodPlatter",
  },
  {
    id: 8, type: "image", orientation: "landscape",
    src:  "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1200&q=85",
    alt:  "gallery.alts.butterChicken",
    caption: "gallery.captions.butterChicken",
  },
  {
    id: 9, type: "video", orientation: "square",
    src:        "https://www.youtube.com/embed/LX2bSZdBRmo",
    thumb:      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    previewSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    alt:   "gallery.alts.streetFood",
    caption: "gallery.captions.streetFood",
  },
  {
    id: 10, type: "image", orientation: "portrait",
    src:  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=85",
    alt:  "gallery.alts.samosas",
    caption: "gallery.captions.samosas",
  },
  {
    id: 11, type: "image", orientation: "square",
    src:  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=85",
    alt:  "gallery.alts.ambiance",
    caption: "gallery.captions.ambiance",
  },
  {
    id: 12, type: "video", orientation: "landscape",
    src:        "https://www.youtube.com/embed/6stlCkUDG_s",
    thumb:      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80",
    previewSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    alt:   "gallery.alts.foodPlating",
    caption: "gallery.captions.foodPlating",
  },
  {
    id: 13, type: "image", orientation: "landscape",
    src:  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=85",
    alt:  "gallery.alts.noodles",
    caption: "gallery.captions.noodles",
  },
  {
    id: 14, type: "image", orientation: "square",
    src:  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=85",
    alt:  "gallery.alts.friedRice",
    caption: "gallery.captions.friedRice",
  },
  {
    id: 15, type: "video", orientation: "portrait",
    src:        "https://www.youtube.com/embed/YQ-CnKtUBwc",
    thumb:      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
    previewSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    alt:   "gallery.alts.chefPreparing",
    caption: "gallery.captions.chefPreparing",
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  item:    GalleryItem;
  onClose: () => void;
  onPrev:  () => void;
  onNext:  () => void;
  t:       TFunction;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext, t }) => (
  <Dialog
    open
    fullScreen
    onClose={onClose}
    PaperProps={{
      sx: {
        bgcolor:        "rgba(10,8,5,0.97)",
        backdropFilter: "blur(20px)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      },
    }}
  >
    <IconButton
      onClick={onClose}
      aria-label={t("gallery.close")}
      sx={{
        position: "fixed", top: 20, right: 20, zIndex: 10,
        color:    tokens.colors.dark.textPrimary,
        bgcolor:  "rgba(255,255,255,0.06)",
        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
      }}
    >
      <CloseIcon />
    </IconButton>

    <IconButton
      onClick={onPrev}
      aria-label={t("gallery.previous")}
      sx={{
        position: "fixed", left: { xs: 8, md: 24 }, top: "50%",
        transform: "translateY(-50%)", zIndex: 10,
        color:     tokens.colors.dark.textPrimary,
        bgcolor:   "rgba(255,255,255,0.06)",
        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
      }}
    >
      <Box sx={{ fontSize: "1.6rem", lineHeight: 1, px: 0.2 }}>‹</Box>
    </IconButton>

    <IconButton
      onClick={onNext}
      aria-label={t("gallery.next")}
      sx={{
        position: "fixed", right: { xs: 8, md: 24 }, top: "50%",
        transform: "translateY(-50%)", zIndex: 10,
        color:     tokens.colors.dark.textPrimary,
        bgcolor:   "rgba(255,255,255,0.06)",
        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
      }}
    >
      <Box sx={{ fontSize: "1.6rem", lineHeight: 1, px: 0.2 }}>›</Box>
    </IconButton>

    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {item.type === "video" ? (
          item.src.includes("youtube.com") ? (
            <Box
              component="iframe"
              src={`${item.src}?autoplay=1&rel=0`}
              title={item.alt}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              sx={{
                width:        { xs: "90vw", md: "72vw" },
                height:       { xs: "50vw", md: "40.5vw" },
                border:       "none",
                borderRadius: tokens.radius.md,
              }}
            />
          ) : (
            <Box
              component="video"
              src={item.src}
              controls
              autoPlay
              playsInline
              sx={{
                width:        { xs: "90vw", md: "72vw" },
                maxHeight:    "80vh",
                borderRadius: tokens.radius.md,
                display:      "block",
                bgcolor:      "#000",
              }}
            />
          )
        ) : (
          <Box
            component="img"
            src={item.src}
            alt={t(item.alt)}
            sx={{
              maxWidth:     "90vw",
              maxHeight:    "80vh",
              objectFit:    "contain",
              borderRadius: tokens.radius.md,
              display:      "block",
            }}
          />
        )}
        {item.caption && (
          <Typography sx={{
            color:         tokens.colors.dark.textTertiary,
            fontSize:      "0.8rem",
            mt:            2,
            letterSpacing: "0.08em",
            textAlign:     "center",
          }}>
            {t(item.caption)}
          </Typography>
        )}
      </motion.div>
    </AnimatePresence>
  </Dialog>
);

// ── Gallery card ──────────────────────────────────────────────────────────────
interface CardProps {
  item:    GalleryItem;
  index:   number;
  onClick: () => void;
  t:       TFunction;
}

const GalleryCard: React.FC<CardProps> = ({ item, index, onClick, t }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (hovered) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [hovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ breakInside: "avoid", marginBottom: "12px", display: "block" }}
    >
      <Box
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          position:    "relative",
          width:       "100%",
          aspectRatio: aspectMap[item.orientation],
          borderRadius: tokens.radius.md,
          overflow:    "hidden",
          cursor:      "pointer",
          display:     "block",
          bgcolor:     tokens.colors.bg.card,
          "&:focus-visible": { outline: `2px solid ${tokens.colors.primary.main}`, outlineOffset: 3 },
        }}
        tabIndex={0}
        role="button"
        aria-label={t("gallery.viewImage", { alt: t(item.alt) })}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {/* Poster image — always visible, fades out when preview plays */}
        <Box
          component="img"
          src={item.type === "video" ? item.thumb : item.src}
          alt={t(item.alt)}
          loading="lazy"
          sx={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
            transition: `opacity ${tokens.transitions.normal}, transform ${tokens.transitions.slow}`,
            opacity:    (hovered && item.previewSrc) ? 0 : 1,
            transform:  hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Muted hover-preview video — only for video items with previewSrc */}
        {item.type === "video" && item.previewSrc && (
          <Box
            component="video"
            ref={videoRef}
            src={item.previewSrc}
            muted
            loop
            playsInline
            preload="metadata"
            sx={{
              position:  "absolute",
              inset:     0,
              width:     "100%",
              height:    "100%",
              objectFit: "cover",
              display:   "block",
              opacity:   hovered ? 1 : 0,
              transition: `opacity ${tokens.transitions.normal}`,
            }}
          />
        )}

        {/* Hover gradient overlay */}
        <Box sx={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, rgba(10,8,5,0.78) 0%, rgba(10,8,5,0.08) 50%, transparent 100%)",
          opacity:    hovered ? 1 : 0,
          transition: `opacity ${tokens.transitions.normal}`,
          zIndex:     1,
        }} />

        {/* Video play icon */}
        {item.type === "video" && (
          <Box sx={{
            position:   "absolute",
            top:        "50%",
            left:       "50%",
            transform:  "translate(-50%, -50%)",
            color:      tokens.colors.dark.textPrimary,
            opacity:    hovered ? 0 : 0.75,
            transition: `opacity ${tokens.transitions.normal}`,
            pointerEvents: "none",
            zIndex:     2,
          }}>
            <PlayCircleOutlineIcon sx={{ fontSize: { xs: "3rem", md: "3.8rem" } }} />
          </Box>
        )}

        {/* Caption on hover */}
        {item.caption && (
          <Box sx={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            px:         2,
            py:         1.5,
            opacity:    hovered ? 1 : 0,
            transform:  hovered ? "translateY(0)" : "translateY(6px)",
            transition: `all ${tokens.transitions.normal}`,
            pointerEvents: "none",
            zIndex:     2,
          }}>
            <Typography sx={{
              color:         tokens.colors.dark.textPrimary,
              fontSize:      "0.78rem",
              fontWeight:    500,
              letterSpacing: "0.04em",
            }}>
              {t(item.caption)}
            </Typography>
          </Box>
        )}

        {/* Video badge */}
        {item.type === "video" && (
          <Box sx={{
            position:     "absolute",
            top:          10,
            right:        10,
            px:           1.2,
            py:           0.35,
            bgcolor:      tokens.colors.primary.main,
            borderRadius: tokens.radius.xs,
            pointerEvents: "none",
            zIndex:       2,
          }}>
            <Typography sx={{
              color:         tokens.colors.bg.base,
              fontSize:      "0.58rem",
              fontWeight:    700,
              letterSpacing: "0.1em",
            }}>
              {t("gallery.video")}
            </Typography>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const GalleryPage: React.FC = () => {
  const theme = useTheme();
  const isMd  = useMediaQuery(theme.breakpoints.up("md"));
  const isSm  = useMediaQuery(theme.breakpoints.up("sm"));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const columns = isMd ? 3 : isSm ? 2 : 1;

  // Split items into columns for CSS columns-style flow
  const cols: GalleryItem[][] = Array.from({ length: columns }, () => []);
  galleryItems.forEach((item, i) => cols[i % columns].push(item));

  const openLightbox  = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () =>
    setLightboxIndex((i) => i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length);
  const nextItem = () =>
    setLightboxIndex((i) => i === null ? null : (i + 1) % galleryItems.length);

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prevItem();
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base }}>
      <PageBanner
        eyebrow={t("gallery.eyebrow")}
        title={t("gallery.title")}
        highlight={t("gallery.highlight")}
        subtitle={t("gallery.subtitle")}
        watermark={t("gallery.watermark")}
      />

      <Container
        maxWidth="xl"
        sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3, lg: 8, xl: 10 } }}
      >
        {/* Column masonry — no grid row-span gaps */}
        <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 }, alignItems: "flex-start" }}>
          {cols.map((colItems, colIdx) => (
            <Box key={colIdx} sx={{ flex: 1, minWidth: 0 }}>
              {colItems.map((item) => {
                const globalIndex = galleryItems.findIndex((g) => g.id === item.id);
                return (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={globalIndex}
                    onClick={() => openLightbox(globalIndex)}
                    t={t}
                  />
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Bottom ornament */}
        <Box sx={{ textAlign: "center", pt: { xs: 6, md: 10 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
            <Box sx={{ width: 48, height: "1px", background: `linear-gradient(90deg, transparent, ${tokens.colors.border.medium})` }} />
            <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: tokens.colors.primary.main, opacity: 0.5 }} />
            <Box sx={{ width: 48, height: "1px", background: `linear-gradient(90deg, ${tokens.colors.border.medium}, transparent)` }} />
          </Box>
          <Typography sx={{
            color:         tokens.colors.text.disabled,
            fontSize:      "0.78rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            {t("gallery.followInstagram")}
          </Typography>
        </Box>
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          item={galleryItems[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
          t={t}
        />
      )}
    </Box>
  );
};

export default GalleryPage;
