import React, { useState, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Box, Container, Typography, Button, useMediaQuery, useTheme,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

const ThreeBackground = lazy(() => import("../components/ThreeBackground"));
import LocationSelectionModal from "../components/LocationSelectionModal";
import { tokens } from "../theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarIcon from "@mui/icons-material/Star";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import GroupsIcon from "@mui/icons-material/Groups";

// ── Marquee ticker ───────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "Kothu", "Biryani", "Banana Leaf", "Jaffna Curry", "Lamprais",
  "Chicken 65", "Shawarma", "Butter Chicken", "Seafood Kool", "Idiyappam",
];

const Ticker: React.FC = () => {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box
      aria-hidden="true"
      sx={{
        bgcolor:  tokens.colors.primary.main,
        overflow: "hidden",
        py:       { xs: 1.4, md: 1.8 },
        zIndex:   2,
        position: "relative",
      }}
    >
      <Box>
        <Box className="marquee-track" sx={{ display: "flex", alignItems: "center" }}>
          {repeated.map((item, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Typography
                component="span"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "0.78rem", md: "0.88rem" },
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color:         tokens.colors.bg.base,
                  whiteSpace:    "nowrap",
                  px:            { xs: 2.5, md: 3.5 },
                }}
              >
                {item}
              </Typography>
              <Box component="span" sx={{ width: 4, height: 4, bgcolor: `${tokens.colors.bg.base}70`, borderRadius: "50%", flexShrink: 0 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// ── Section Cards ────────────────────────────────────────────────────────────
const sectionCards = [
  {
    icon:        <RestaurantMenuIcon sx={{ fontSize: "1.5rem" }} />,
    title:       "Full Menu",
    desc:        "50+ dishes from Kothu to Biryani, Jaffna curries to international favourites.",
    path:        "/menu",
    cta:         "Browse Menu",
  },
  {
    icon:        <StarIcon sx={{ fontSize: "1.5rem" }} />,
    title:       "Today's Specials",
    desc:        "Everyday lunch boxes & weekend soup — made fresh every morning.",
    path:        "/specials",
    cta:         "See Specials",
  },
  {
    icon:        <GroupsIcon sx={{ fontSize: "1.5rem" }} />,
    title:       "Catering",
    desc:        "Corporate events, weddings & parties catered with authentic Sri Lankan flavour.",
    path:        "/catering",
    cta:         "Enquire Now",
  },
];

// ── Animation variants ───────────────────────────────────────────────────────
const heroContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const heroItem: Variants = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// ── Page ─────────────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY       = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : 40]);
  const heroImgY    = useTransform(scrollY, [0, 800], [0, isMobile ? 0 : 80]);

  return (
    <Box>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <Box
        component="section"
        ref={heroRef}
        aria-label="Welcome"
        sx={{
          minHeight: "100vh",
          display:   "flex",
          flexDirection: "column",
          position:  "relative",
          overflow:  "hidden",
          bgcolor:   tokens.colors.dark.bg,
        }}
      >
        <Suspense fallback={null}><ThreeBackground /></Suspense>

        {/* Warm radial glow — right side */}
        <Box aria-hidden="true" sx={{
          position:   "absolute",
          top: "50%", right: "-10%",
          transform:  "translateY(-50%)",
          width:      "60vw", height: "80vh",
          background: "radial-gradient(ellipse at center, rgba(184,134,11,0.09) 0%, transparent 65%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Corner accent lines */}
        <Box aria-hidden="true" sx={{
          position: "absolute", top: 24, left: 24,
          width: 60, height: 60,
          borderTop: `1px solid ${tokens.colors.primary.main}`,
          borderLeft: `1px solid ${tokens.colors.primary.main}`,
          opacity: 0.25, zIndex: 2,
        }} />
        <Box aria-hidden="true" sx={{
          position: "absolute", bottom: 80, right: 24,
          width: 60, height: 60,
          borderBottom: `1px solid ${tokens.colors.primary.main}`,
          borderRight:  `1px solid ${tokens.colors.primary.main}`,
          opacity: 0.25, zIndex: 2,
        }} />

        {/* ── Split content ── */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 10 }}>
          <Container maxWidth="xl" sx={{
            pt: { xs: "80px", md: "88px", lg: "92px", xl: "100px" },
            pb: { xs: 8, md: 6 },
            px: { xs: 3, sm: 4, lg: 8, xl: 10 },
          }}>
            <Box sx={{
              display:             "grid",
              gridTemplateColumns: { xs: "1fr", md: "54% 46%" },
              gap:                 { xs: 0, md: 6, lg: 10, xl: 12 },
              alignItems:          "center",
            }}>

              {/* LEFT — Typography */}
              <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="visible"
                style={{ opacity: heroOpacity, y: heroY }}
              >
                {/* Eyebrow */}
                <motion.div variants={heroItem}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 3, md: 4, lg: 5 } }}>
                    <Box sx={{ width: { xs: 28, lg: 40 }, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.7 }} />
                    <Typography variant="overline" sx={{
                      color:         tokens.colors.primary.main,
                      letterSpacing: "0.3em",
                      fontSize:      { xs: "0.62rem", md: "0.65rem", lg: "0.72rem" },
                    }}>
                      Authentic Sri Lankan Cuisine
                    </Typography>
                  </Box>
                </motion.div>

                {/* Display headline */}
                <motion.div variants={heroItem}>
                  <Box component="h1" sx={{ m: 0 }}>
                    {/* "NEW" — ghost outline */}
                    <Typography component="span" sx={{
                      display:          "block",
                      fontFamily:       tokens.fonts.display,
                      fontSize:         { xs: "3.8rem", sm: "5rem", md: "6.2rem", lg: "7.5rem", xl: "9rem" },
                      fontWeight:       400,
                      lineHeight:       0.85,
                      letterSpacing:    "-0.04em",
                      textTransform:    "uppercase",
                      color:            "transparent",
                      WebkitTextStroke: { xs: "1px rgba(245,240,228,0.3)", lg: "1.5px rgba(245,240,228,0.35)" },
                      userSelect:       "none",
                    }}>
                      New
                    </Typography>
                    {/* "NANTHU'S" — gold filled */}
                    <Typography component="span" sx={{
                      display:       "block",
                      fontFamily:    tokens.fonts.display,
                      fontSize:      { xs: "3.8rem", sm: "5rem", md: "6.2rem", lg: "7.5rem", xl: "9rem" },
                      fontWeight:    400,
                      lineHeight:    0.85,
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase",
                      color:         tokens.colors.primary.main,
                      textShadow:    "0 0 120px rgba(184,134,11,0.35)",
                    }}>
                      Nanthu's
                    </Typography>
                    {/* "KITCHEN" — white */}
                    <Typography component="span" sx={{
                      display:       "block",
                      fontFamily:    tokens.fonts.display,
                      fontSize:      { xs: "3.8rem", sm: "5rem", md: "6.2rem", lg: "7.5rem", xl: "9rem" },
                      fontWeight:    400,
                      lineHeight:    0.85,
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase",
                      color:         tokens.colors.dark.textPrimary,
                    }}>
                      Kitchen
                    </Typography>
                  </Box>
                </motion.div>

                {/* Gold ornament divider */}
                <motion.div variants={heroItem}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: { xs: 3.5, md: 4, lg: 5 } }}>
                    <Box sx={{ width: { xs: 48, lg: 64 }, height: "1px", background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)` }} />
                    <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: tokens.colors.primary.main, opacity: 0.7 }} />
                    <Box sx={{ width: 24, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.3 }} />
                  </Box>
                </motion.div>

                {/* Tagline */}
                <motion.div variants={heroItem}>
                  <Typography sx={{
                    color:      tokens.colors.dark.textSecondary,
                    fontSize:   { xs: "0.9rem", md: "1rem", lg: "1.1rem", xl: "1.2rem" },
                    lineHeight: 1.85,
                    maxWidth:   { xs: 360, md: 460, lg: 520, xl: 580 },
                    mb:         { xs: 4, md: 5, lg: 6 },
                  }}>
                    From the kitchens of Jaffna to the heart of the GTA —
                    bold spices, fresh ingredients, and generations of flavour.
                  </Typography>
                </motion.div>

                {/* CTA buttons */}
                <motion.div variants={heroItem}>
                  <Box sx={{ display: "flex", gap: { xs: 2, lg: 2.5 }, flexWrap: "wrap", mb: { xs: 4, md: 5, lg: 6 } }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => setLocationModalOpen(true)}
                      sx={{
                        px:         { xs: 3.5, md: 4.5, lg: 5.5 },
                        py:         { xs: 1.5, md: 1.7, lg: 2 },
                        fontWeight: 700,
                        color:      tokens.colors.bg.base,
                        fontSize:   { xs: "0.82rem", lg: "0.9rem" },
                        letterSpacing: "0.06em",
                      }}
                    >
                      Order Now
                    </Button>
                    <Button
                      component={Link}
                      to="/menu"
                      variant="outlined"
                      size="large"
                      sx={{
                        px:          { xs: 3.5, md: 4.5, lg: 5.5 },
                        py:          { xs: 1.5, md: 1.7, lg: 2 },
                        color:       tokens.colors.dark.textPrimary,
                        borderColor: "rgba(245,240,228,0.18)",
                        fontSize:    { xs: "0.82rem", lg: "0.9rem" },
                        letterSpacing: "0.06em",
                        "&:hover":   { borderColor: tokens.colors.primary.main, bgcolor: "rgba(184,134,11,0.07)" },
                      }}
                    >
                      View Menu
                    </Button>
                  </Box>
                </motion.div>

                {/* Location pills */}
                <motion.div variants={heroItem}>
                  <Box sx={{ display: "flex", gap: { xs: 1.5, lg: 2 }, flexWrap: "wrap" }}>
                    {[
                      { label: "Markham", flag: "📍" },
                      { label: "Scarborough", flag: "📍" },
                    ].map(({ label, flag }) => (
                      <Box key={label} sx={{
                        display:      "flex",
                        alignItems:   "center",
                        gap:          0.8,
                        px:           { xs: 2, lg: 2.5 },
                        py:           { xs: 0.9, lg: 1.1 },
                        border:       `1px solid rgba(245,240,228,0.12)`,
                        borderRadius: "100px",
                        bgcolor:      "rgba(245,240,228,0.05)",
                      }}>
                        <Typography sx={{ fontSize: { xs: "0.75rem", lg: "0.82rem" } }}>{flag}</Typography>
                        <Typography sx={{
                          color:         tokens.colors.dark.textTertiary,
                          fontSize:      { xs: "0.72rem", lg: "0.78rem" },
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}>
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </motion.div>

              {/* RIGHT — Image composition */}
              <motion.div
                initial={{ opacity: 0, x: 48, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: heroImgY }}
              >
                <Box sx={{
                  position: "relative",
                  height:   { md: 540, lg: 660, xl: 780 },
                  display:  { xs: "none", md: "block" },
                  pr:       { md: 3, lg: 5, xl: 6 },
                }}>
                  {/* Background decorative box */}
                  <Box sx={{
                    position:     "absolute",
                    top: 24, right: 0,
                    bottom: 0, left: 24,
                    borderRadius: tokens.radius.lg,
                    border:       `1px solid rgba(184,134,11,0.12)`,
                    bgcolor:      "rgba(184,134,11,0.04)",
                  }} />

                  {/* Main image */}
                  <Box sx={{
                    position:     "absolute",
                    top: 0, right: 24,
                    bottom: 24, left: 0,
                    borderRadius: tokens.radius.lg,
                    overflow:     "hidden",
                    border:       `1px solid rgba(245,240,228,0.08)`,
                    boxShadow:    "0 32px 80px rgba(0,0,0,0.5)",
                  }}>
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=85"
                      alt="Sri Lankan cuisine"
                      sx={{
                        width:      "100%",
                        height:     "100%",
                        objectFit:  "cover",
                        objectPosition: "center",
                        filter:     "contrast(1.08) saturate(1.1) brightness(0.88)",
                        transition: "transform 8s ease",
                      }}
                    />
                    {/* Cinematic overlay */}
                    <Box sx={{
                      position:   "absolute",
                      inset:      0,
                      background: "linear-gradient(160deg, rgba(184,134,11,0.06) 0%, rgba(13,11,8,0.35) 100%)",
                    }} />
                  </Box>

                  {/* Floating badge — 10% off */}
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                    style={{ position: "absolute", bottom: 64, left: -8, zIndex: 3 }}
                  >
                    <Box sx={{
                      bgcolor:      tokens.colors.primary.main,
                      borderRadius: tokens.radius.md,
                      px:           2.5, py: 2,
                      textAlign:    "center",
                      boxShadow:    "0 12px 40px rgba(184,134,11,0.4)",
                    }}>
                      <Typography sx={{
                        color:      tokens.colors.bg.base,
                        fontFamily: tokens.fonts.display,
                        fontSize:   { md: "2rem", lg: "2.4rem", xl: "2.8rem" },
                        lineHeight: 1,
                        fontWeight: 400,
                      }}>
                        10%
                      </Typography>
                      <Typography variant="caption" sx={{
                        color:         tokens.colors.bg.base,
                        opacity:       0.85,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontSize:      "0.52rem",
                        display:       "block",
                        mt:            0.3,
                      }}>
                        First Order
                      </Typography>
                    </Box>
                  </motion.div>

                  {/* Floating tag — dishes */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    style={{ position: "absolute", top: 32, right: 8, zIndex: 3 }}
                  >
                    <Box sx={{
                      bgcolor:        "rgba(13,11,8,0.82)",
                      backdropFilter: "blur(16px)",
                      border:         `1px solid rgba(184,134,11,0.2)`,
                      borderRadius:   tokens.radius.sm,
                      px: 2, py: 1.2,
                      display:        "flex",
                      alignItems:     "center",
                      gap:            1,
                    }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: tokens.colors.primary.main }} />
                      <Typography sx={{
                        color:         tokens.colors.primary.light ?? tokens.colors.primary.main,
                        fontSize:      "0.7rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight:    600,
                      }}>
                        50+ Dishes
                      </Typography>
                    </Box>
                  </motion.div>

                  {/* Floating tag — fresh daily */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    style={{ position: "absolute", bottom: 32, right: 8, zIndex: 3 }}
                  >
                    <Box sx={{
                      bgcolor:        "rgba(13,11,8,0.82)",
                      backdropFilter: "blur(16px)",
                      border:         `1px solid rgba(245,240,228,0.08)`,
                      borderRadius:   tokens.radius.sm,
                      px: 2, py: 1.2,
                      display:        "flex",
                      alignItems:     "center",
                      gap:            1,
                    }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4CAF50" }} />
                      <Typography sx={{
                        color:         tokens.colors.dark.textSecondary,
                        fontSize:      "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}>
                        Fresh Daily
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>

            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{
          position:       "relative",
          zIndex:         10,
          borderTop:      `1px solid ${tokens.colors.dark.borderSubtle}`,
          bgcolor:        "rgba(13,11,8,0.6)",
          backdropFilter: "blur(24px)",
        }}>
          <Container maxWidth="xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ display: "flex" }}>
                {[
                  { v: "2",   l: "Locations" },
                  { v: "50+", l: "Dishes" },
                  { v: "GTA", l: "Serving" },
                  { v: "10%", l: "First Order" },
                ].map((s, i) => (
                  <Box
                    key={s.l}
                    sx={{
                      flex:        1,
                      px:          { xs: 1.5, md: 3, lg: 4 },
                      py:          { xs: 2, md: 2.5, lg: 3 },
                      textAlign:   "center",
                      borderRight: i < 3 ? `1px solid ${tokens.colors.dark.borderSubtle}` : "none",
                    }}
                  >
                    <Typography sx={{
                      color:      tokens.colors.primary.main,
                      fontFamily: tokens.fonts.display,
                      fontSize:   { xs: "1.1rem", sm: "1.4rem", md: "1.7rem", lg: "2rem", xl: "2.4rem" },
                      lineHeight: 1,
                      mb:         0.4,
                    }}>
                      {s.v}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color:         tokens.colors.dark.textTertiary,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontSize:      { xs: "0.46rem", sm: "0.54rem", md: "0.58rem", lg: "0.64rem" },
                    }}>
                      {s.l}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>

      {/* ── TICKER ───────────────────────────────────────────── */}
      <Ticker />

      {/* ── SECTION CARDS ────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="What we offer"
        sx={{ bgcolor: tokens.colors.bg.surface, py: { xs: 10, md: 14 } }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 1.5 }}>
              <Box sx={{ width: 28, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
              <Typography variant="overline" sx={{ color: tokens.colors.primary.main }}>Explore</Typography>
              <Box sx={{ width: 28, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
            </Box>
            <Typography
              component="h2"
              sx={{
                fontFamily: tokens.fonts.display, fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 400, textTransform: "uppercase", color: tokens.colors.text.primary,
                letterSpacing: "-0.01em", lineHeight: 0.95,
              }}
            >
              What We Offer
            </Typography>
          </Box>

          <Box
            sx={{
              display:             "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              gap:                 { xs: 2, md: 3 },
            }}
          >
            {sectionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Box
                  component={Link}
                  to={card.path}
                  sx={{
                    display:       "block",
                    textDecoration:"none",
                    p:             { xs: 3, md: 4 },
                    border:        `1px solid ${tokens.colors.border.faint}`,
                    borderRadius:  tokens.radius.md,
                    bgcolor:       tokens.colors.bg.card,
                    height:        "100%",
                    transition:    `all ${tokens.transitions.spring}`,
                    "&:hover": {
                      borderColor: tokens.colors.border.medium,
                      bgcolor:     tokens.colors.bg.elevated,
                      boxShadow:   tokens.shadows.goldLg,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width:        44,
                      height:       44,
                      borderRadius: tokens.radius.sm,
                      bgcolor:      tokens.colors.primary.glow,
                      border:       `1px solid ${tokens.colors.border.subtle}`,
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent:"center",
                      color:        tokens.colors.primary.main,
                      mb:           3,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    sx={{
                      color:      tokens.colors.text.primary, fontWeight: 600,
                      fontSize:   "1.05rem", mb: 1.5,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      color:      tokens.colors.text.tertiary,
                      fontSize:   "0.85rem",
                      lineHeight: 1.7,
                      mb:         3,
                    }}
                  >
                    {card.desc}
                  </Typography>
                  <Box
                    sx={{
                      display:    "flex",
                      alignItems: "center",
                      gap:        1,
                      color:      tokens.colors.primary.main,
                      fontSize:   "0.78rem",
                      fontWeight: 600,
                      letterSpacing:"0.08em",
                      textTransform:"uppercase",
                    }}
                  >
                    {card.cta}
                    <ArrowForwardIcon sx={{ fontSize: "0.9rem" }} />
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── FEATURE STRIP ────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="About us"
        sx={{ bgcolor: tokens.colors.bg.base, py: { xs: 10, md: 14 }, overflow: "hidden" }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display:             "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap:                 { xs: 6, md: 12 },
              alignItems:          "center",
            }}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    height:       { xs: 320, md: 500 },
                    borderRadius: tokens.radius.lg,
                    overflow:     "hidden",
                    border:       `1px solid ${tokens.colors.border.subtle}`,
                    boxShadow:    tokens.shadows.md,
                    position:     "relative",
                    '&:hover img': {
                      transform: 'scale(1.04)',
                      filter:    'contrast(1.08) saturate(1.15)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.pexels.com/photos/5176006/pexels-photo-5176006.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Sri Lankan dishes"
                    loading="lazy"
                    sx={{
                      width: "100%", height: "100%", objectFit: "cover",
                      filter:     'contrast(1.05) saturate(1.1)',
                      transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease',
                    }}
                  />
                  {/* Cinematic overlay */}
                  <Box
                    sx={{
                      position:   "absolute",
                      inset:      0,
                      background: 'linear-gradient(135deg, rgba(184,134,11,0.10) 0%, rgba(26,18,8,0.18) 100%)',
                      pointerEvents: "none",
                    }}
                  />
                </Box>
                {/* Floating stat */}
                <Box
                  sx={{
                    position:     "absolute",
                    bottom:       { xs: 16, md: -20 },
                    right:        { xs: 16, md: -20 },
                    bgcolor:      tokens.colors.bg.base,
                    border:       `1px solid ${tokens.colors.border.medium}`,
                    borderRadius: tokens.radius.md,
                    px:           3, py: 2.5, textAlign: "center",
                    boxShadow:    tokens.shadows.md,
                  }}
                >
                  <Typography sx={{ color: tokens.colors.primary.main, fontFamily: tokens.fonts.display, fontSize: "2.2rem", lineHeight: 1 }}>
                    10%
                  </Typography>
                  <Typography variant="caption" sx={{ color: tokens.colors.text.tertiary, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    First Order
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Box sx={{ width: 28, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
                <Typography variant="overline" sx={{ color: tokens.colors.primary.main }}>Our Story</Typography>
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3rem" },
                  fontWeight: 400, textTransform: "uppercase", color: tokens.colors.text.primary,
                  lineHeight: 0.95, letterSpacing: "-0.01em", mb: 3,
                }}
              >
                A Taste of{" "}
                <Box component="span" sx={{ color: tokens.colors.primary.main }}>Jaffna</Box>
              </Typography>
              <Typography sx={{ color: tokens.colors.text.secondary, lineHeight: 1.85, mb: 4, fontSize: "0.95rem" }}>
                New Nanthus Kitchen brings the bold, aromatic flavours of Sri Lanka's
                northern Jaffna region to the heart of Canada. Every dish is crafted
                with traditional recipes, freshly sourced ingredients, and a deep
                passion for authentic cuisine.
              </Typography>
              {[
                { icon: <DeliveryDiningIcon sx={{ fontSize: "1rem" }}/>, text: "Fresh cooked daily — never reheated" },
                { icon: <StarIcon sx={{ fontSize: "1rem" }}/>,           text: "Authentic Jaffna recipes, generations old" },
                { icon: <GroupsIcon sx={{ fontSize: "1rem" }}/>,         text: "Two convenient GTA locations" },
              ].map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      color:        tokens.colors.primary.main,
                      bgcolor:      tokens.colors.primary.glow,
                      border:       `1px solid ${tokens.colors.border.subtle}`,
                      borderRadius: tokens.radius.xs,
                      width:        32, height: 32,
                      display:      "flex", alignItems: "center", justifyContent: "center",
                      flexShrink:   0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.9rem" }}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  to="/menu"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.6, fontWeight: 700, color: tokens.colors.bg.base, fontSize: "0.82rem" }}
                >
                  Explore Menu
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Order now"
        sx={{
          bgcolor:  tokens.colors.dark.bg,
          py:       { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <Box
          aria-hidden="true"
          sx={{
            position:        "absolute",
            inset:           0,
            backgroundImage: `linear-gradient(${tokens.colors.dark.borderFaint} 1px, transparent 1px),
                              linear-gradient(90deg, ${tokens.colors.dark.borderFaint} 1px, transparent 1px)`,
            backgroundSize:  "60px 60px",
            opacity:         0.8,
            pointerEvents:   "none",
          }}
        />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
              Ready to Order?
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily:    tokens.fonts.display,
                fontSize:      { xs: "2.5rem", md: "4rem" },
                fontWeight:    400,
                textTransform: "uppercase",
                color:         tokens.colors.dark.textPrimary,
                lineHeight:    0.92,
                letterSpacing: "-0.02em",
                mb:            3,
              }}
            >
              Pick Up Fresh{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>Today</Box>
            </Typography>
            <Typography sx={{ color: tokens.colors.dark.textTertiary, mb: 5, fontSize: "0.95rem" }}>
              Order online and collect from Markham or Scarborough — ready in 20–30 minutes.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setLocationModalOpen(true)}
              sx={{ px: 5, py: 1.8, fontWeight: 700, color: tokens.colors.bg.base, fontSize: "0.85rem" }}
            >
              Order Now
            </Button>
          </motion.div>
        </Container>
      </Box>

      <LocationSelectionModal open={locationModalOpen} onClose={() => setLocationModalOpen(false)} />
    </Box>
  );
};

export default HomePage;
