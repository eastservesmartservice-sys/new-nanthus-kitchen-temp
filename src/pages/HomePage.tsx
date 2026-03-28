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
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY        = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : 50]);
  const heroImgY     = useTransform(scrollY, [0, 800], [0, isMobile ? 0 : 150]);
  const indicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <Box>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <Box
        component="section"
        ref={heroRef}
        aria-label="Welcome"
        sx={{
          minHeight:      "100vh",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          position:       "relative",
          overflow:       "hidden",
          bgcolor:        tokens.colors.dark.bg,
        }}
      >
        <Suspense fallback={null}><ThreeBackground /></Suspense>

        {/* Full-bleed background image with parallax */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            y: heroImgY,
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1920&q=80"
            alt=""
            aria-hidden="true"
            sx={{
              width:          "100%",
              height:         "130%",
              objectFit:      "cover",
              objectPosition: "center 40%",
              filter:         "contrast(1.1) saturate(0.85) brightness(0.35)",
            }}
          />
        </motion.div>

        {/* Multi-layer gradient overlays */}
        <Box
          aria-hidden="true"
          sx={{
            position:   "absolute",
            inset:      0,
            background: `
              linear-gradient(180deg, rgba(13,11,8,0.75) 0%, rgba(13,11,8,0.20) 35%, rgba(13,11,8,0.55) 80%, rgba(13,11,8,0.90) 100%),
              linear-gradient(135deg, rgba(184,134,11,0.06) 0%, transparent 50%)
            `,
            zIndex:     1,
          }}
        />

        {/* Radial warm spotlight */}
        <Box
          aria-hidden="true"
          sx={{
            position:      "absolute",
            top:           "35%",
            left:          "50%",
            transform:     "translate(-50%, -50%)",
            width:         { xs: "160vw", md: "100vw", xl: "80vw" },
            height:        { xs: "80vh", md: "90vh" },
            background:    "radial-gradient(ellipse at center, rgba(184,134,11,0.14) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex:        2,
          }}
        />

        {/* Subtle vignette edges */}
        <Box
          aria-hidden="true"
          sx={{
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(13,11,8,0.5) 100%)",
            zIndex:     2,
            pointerEvents: "none",
          }}
        />

        {/* Centered content */}
        <Container
          maxWidth="lg"
          sx={{
            position:  "relative",
            zIndex:    10,
            textAlign: "center",
            pt:        { xs: 10, md: 0 },
            pb:        { xs: 12, md: 10 },
          }}
        >
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            {/* Eyebrow */}
            <motion.div variants={heroItem}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: { xs: 3, md: 4, xl: 5 } }}>
                <Box sx={{ width: { xs: 24, md: 48, xl: 64 }, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
                <Typography
                  variant="overline"
                  sx={{
                    color:         tokens.colors.primary.main,
                    letterSpacing: "0.3em",
                    fontSize:      { xs: "0.62rem", md: "0.72rem", xl: "0.82rem" },
                  }}
                >
                  Authentic Sri Lankan Cuisine
                </Typography>
                <Box sx={{ width: { xs: 24, md: 48, xl: 64 }, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
              </Box>
            </motion.div>

            {/* Headline */}
            <motion.div variants={heroItem}>
              <Typography
                component="h1"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "3.2rem", sm: "4.5rem", md: "6rem", lg: "8rem", xl: "10rem" },
                  fontWeight:    400,
                  lineHeight:    0.85,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color:         tokens.colors.dark.textPrimary,
                  mb:            0.5,
                  textShadow:    "0 4px 40px rgba(0,0,0,0.3)",
                }}
              >
                New
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "3.2rem", sm: "4.5rem", md: "6rem", lg: "8rem", xl: "10rem" },
                  fontWeight:    400,
                  lineHeight:    0.85,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color:         tokens.colors.primary.main,
                  textShadow:    "0 4px 40px rgba(184,134,11,0.2)",
                  mb:            0.5,
                }}
              >
                Nanthus
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "3.2rem", sm: "4.5rem", md: "6rem", lg: "8rem", xl: "10rem" },
                  fontWeight:    400,
                  lineHeight:    0.85,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color:         tokens.colors.dark.textPrimary,
                  textShadow:    "0 4px 40px rgba(0,0,0,0.3)",
                }}
              >
                Kitchen
              </Typography>
            </motion.div>

            {/* Gold divider */}
            <motion.div variants={heroItem}>
              <Box sx={{ display: "flex", justifyContent: "center", my: { xs: 3, md: 4, xl: 5 } }}>
                <Box
                  sx={{
                    width:      { xs: 40, md: 64, xl: 80 },
                    height:     "1.5px",
                    background: `linear-gradient(90deg, transparent, ${tokens.colors.primary.main}, transparent)`,
                  }}
                />
              </Box>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={heroItem}>
              <Typography
                sx={{
                  color:      tokens.colors.dark.textSecondary,
                  fontSize:   { xs: "0.92rem", md: "1.1rem", xl: "1.3rem" },
                  lineHeight: 1.8,
                  maxWidth:   { xs: 340, md: 520, xl: 640 },
                  mx:         "auto",
                  mb:         { xs: 4, md: 5, xl: 6 },
                }}
              >
                From the kitchens of Jaffna to the heart of the GTA —
                bold spices, fresh ingredients, and generations of flavour.
              </Typography>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={heroItem}>
              <Box sx={{ display: "flex", gap: { xs: 2, xl: 3 }, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setLocationModalOpen(true)}
                  sx={{
                    px:         { xs: 4, md: 5, xl: 6 },
                    py:         { xs: 1.6, md: 1.8, xl: 2 },
                    fontWeight: 700,
                    color:      tokens.colors.bg.base,
                    fontSize:   { xs: "0.82rem", xl: "0.92rem" },
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
                    px:          { xs: 4, md: 5, xl: 6 },
                    py:          { xs: 1.6, md: 1.8, xl: 2 },
                    color:       tokens.colors.dark.textPrimary,
                    borderColor: "rgba(245,240,228,0.18)",
                    fontSize:    { xs: "0.82rem", xl: "0.92rem" },
                    "&:hover":   { borderColor: tokens.colors.primary.main, bgcolor: "rgba(184,134,11,0.08)" },
                  }}
                >
                  View Menu
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>

        {/* Stats bar — anchored at bottom */}
        <Box
          sx={{
            position:       "absolute",
            bottom:         0,
            left:           0,
            right:          0,
            zIndex:         10,
            borderTop:      `1px solid ${tokens.colors.dark.borderSubtle}`,
            bgcolor:        "rgba(13,11,8,0.55)",
            backdropFilter: "blur(20px) saturate(150%)",
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {[
                  { v: "2",   l: "Locations" },
                  { v: "50+", l: "Dishes" },
                  { v: "GTA", l: "Serving" },
                  { v: "10%", l: "First Order" },
                ].map((s, i) => (
                  <Box
                    key={s.l}
                    sx={{
                      px:          { xs: 2.5, sm: 3, md: 5, xl: 7 },
                      py:          { xs: 2, md: 2.5, xl: 3 },
                      textAlign:   "center",
                      borderRight: i < 3 ? `1px solid ${tokens.colors.dark.borderSubtle}` : "none",
                    }}
                  >
                    <Typography
                      sx={{
                        color:      tokens.colors.primary.main,
                        fontFamily: tokens.fonts.display,
                        fontSize:   { xs: "1.1rem", sm: "1.3rem", md: "1.6rem", xl: "2rem" },
                        lineHeight: 1,
                        mb:         0.3,
                      }}
                    >
                      {s.v}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color:         tokens.colors.dark.textTertiary,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontSize:      { xs: "0.48rem", sm: "0.54rem", md: "0.6rem", xl: "0.7rem" },
                      }}
                    >
                      {s.l}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Scroll indicator — above stats bar */}
        <motion.div
          style={{ opacity: indicatorOpacity, position: "absolute", bottom: 85, left: "50%", x: "-50%", zIndex: 10 }}
        >
          <Box
            sx={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5,
              color: tokens.colors.dark.textTertiary,
            }}
          >
            <Typography variant="caption" sx={{ letterSpacing: "0.2em", fontSize: "0.58rem", textTransform: "uppercase" }}>
              Scroll
            </Typography>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
              <Box sx={{ width: "1px", height: 28, bgcolor: tokens.colors.primary.main, opacity: 0.5 }} />
            </motion.div>
          </Box>
        </motion.div>
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
              gridTemplateColumns: "1fr 1fr 1fr",
              gap:                 { xs: 1.5, md: 3 },
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
                    p:             { xs: 2, md: 4 },
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
