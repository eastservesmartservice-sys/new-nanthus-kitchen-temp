import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import {
  heroImage,
  heroImageSet,
  homeFeatureImageSet,
  locations,
  pageImageSets,
  pageImages,
} from "../data/site";

const marqueeItems = [
  "Kothu", "Biryani", "Grilled", "Short Eats", "Jaffna Specialties",
  "Seafood", "Fried Rice", "Noodles", "Pasta", "Poutines",
  "Chicken Dishes", "Beef Dishes", "Lamb Dishes", "Sandwiches", "Drinks",
  "Banana Leaf", "Lamprais", "Puttu", "Idiyappam", "Kids Menu",
];
import { tokens } from "../theme";
import EyebrowPill from "../components/EyebrowPill";
import LocationSelectionModal from "../components/LocationSelectionModal";
import SectionHeading from "../components/SectionHeading";

// ─── Easing & variants ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 52 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease, delay: i * 0.13 },
  }),
};

const slideUp = {
  hidden: { y: "108%", opacity: 0 },
  visible: (i: number = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.92, ease, delay: i * 0.16 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.91 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease, delay: i * 0.1 },
  }),
};

// ─── Counter component ────────────────────────────────────────────────────────
function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, to, {
      duration: 2.4,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const featureLinks = [
  {
    title: "Browse the full menu",
    body: "From kothu and biryani to Jaffna curries, seafood, short eats, and grilled plates — something for every appetite.",
    path: "/menu",
    image: pageImages.menu,
    imageSet: pageImageSets.menu,
    icon: <RestaurantMenuOutlinedIcon />,
  },
  {
    title: "Today's specials",
    body: "Fresh kitchen picks, weekend soups, and counter plates that change with the day. Check what's on right now.",
    path: "/specials",
    image: pageImages.specials,
    imageSet: pageImageSets.specials,
    icon: <StarBorderOutlinedIcon />,
  },
  {
    title: "Plan a catering order",
    body: "Feeding a crowd? We handle offices, weddings, cultural events, and family milestones with full Sri Lankan spreads.",
    path: "/catering",
    image: pageImages.catering,
    imageSet: pageImageSets.catering,
    icon: <GroupsOutlinedIcon />,
  },
];

const pillars = [
  {
    icon: <FavoriteOutlinedIcon sx={{ fontSize: "1.1rem" }} />,
    title: "Rooted in Jaffna",
    body: "Every recipe traces back to the Northern Sri Lankan kitchen — bold spice blends, slow-cooked curries, and techniques passed down through generations.",
  },
  {
    icon: <VerifiedOutlinedIcon sx={{ fontSize: "1.1rem" }} />,
    title: "No shortcuts",
    body: "Fresh ingredients, made-to-order plates, and the same standards whether you're picking up on a Tuesday or a Sunday night.",
  },
  {
    icon: <PeopleOutlinedIcon sx={{ fontSize: "1.1rem" }} />,
    title: "Built for Toronto",
    body: "Two counters — Scarborough and Markham — placed where the community is. Familiar food, close to home.",
  },
];

const stats = [
  { value: 2, suffix: "", label: "GTA Locations" },
  { value: 50, suffix: "+", label: "Menu items daily" },
  { value: 10, suffix: "+", label: "Years of Jaffna" },
  { value: 100, suffix: "%", label: "Authentic recipes" },
];

const foodChips = [
  "Banana leaf",
  "Kothu",
  "Lamprais",
  "Chicken 65",
  "Seafood kool",
  "Biryani",
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  /* Hero parallax */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "22%"]);
  const heroFade = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const heroSlide = useTransform(heroScroll, [0, 1], ["0%", "6%"]);

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <Box>
      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <Box
        ref={heroRef}
        component="section"
        sx={{
          minHeight: { xs: "calc(100svh - 70px)", md: "calc(100svh - 112px)" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          color: tokens.colors.text.inverse,
          bgcolor: "#0e0e0e",
        }}
      >
        {/* Parallax image */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "120%",
            top: "-10%",
            y: heroImgY,
          }}
        >
          <picture style={{ display: "block", width: "100%", height: "100%" }}>
            <source type="image/webp" srcSet={heroImageSet.webpSrcSet} sizes={heroImageSet.sizes} />
            <source type="image/jpeg" srcSet={heroImageSet.srcSet} sizes={heroImageSet.sizes} />
            <img
              src={heroImage}
              alt="Sri Lankan banana leaf rice"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </picture>
        </motion.div>

        {/* Cinematic gradient overlays */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(14,14,14,0.96) 0%, rgba(14,14,14,0.72) 50%, rgba(14,14,14,0.18) 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(14,14,14,0.2) 0%, transparent 35%, transparent 65%, rgba(14,14,14,0.7) 100%)",
          }}
        />

        {/* Film grain */}
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: GRAIN,
            backgroundSize: "180px 180px",
            pointerEvents: "none",
          }}
        />

        {/* Vertical accent line — desktop only */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "38%", opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 1.6 }}
            style={{
              position: "absolute",
              left: 44,
              top: "31%",
              width: 1,
              background: `linear-gradient(180deg, transparent 0%, ${tokens.colors.primary.main} 50%, transparent 100%)`,
            }}
          />
        </Box>

        {/* Content fades & slides up on scroll */}
        <motion.div
          style={{
            opacity: heroFade,
            y: heroSlide,
            position: "relative",
            zIndex: 2,
            width: "100%",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 8, md: 10 } }}
          >
            <Stack gap={4} alignItems="flex-start" sx={{ maxWidth: 720 }}>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease, delay: 0.1 }}
              >
                <EyebrowPill label="Jaffna flavours, Toronto made" dark />
              </motion.div>

              {/* Headline — masked line reveal */}
              <Typography
                component="h1"
                sx={{
                  fontFamily: tokens.fonts.display,
                  fontSize: { xs: "2.8rem", sm: "4.4rem", md: "7rem" },
                  lineHeight: 0.92,
                  letterSpacing: "-0.025em",
                }}
              >
                <Box sx={{ overflow: "hidden", display: "block" }}>
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                    custom={0}
                    style={{ display: "inline-block" }}
                  >
                    New{" "}
                    <Box
                      component="span"
                      sx={{ color: tokens.colors.primary.main }}
                    >
                      Nanthus
                    </Box>
                  </motion.span>
                </Box>
                <Box sx={{ overflow: "hidden", display: "block" }}>
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                    custom={1}
                    style={{ display: "inline-block" }}
                  >
                    Kitchen
                  </motion.span>
                </Box>
              </Typography>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.58 }}
              >
                <Typography
                  sx={{
                    color: "rgba(251,250,246,0.68)",
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.8,
                    maxWidth: 520,
                  }}
                >
                  Hot plates, bold spice, and generous portions from our
                  Scarborough and Markham kitchens.
                </Typography>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.76 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  gap={1.5}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingBagOutlinedIcon />}
                    onClick={() => setOrderOpen(true)}
                    sx={{
                      bgcolor: tokens.colors.primary.main,
                      color: tokens.colors.text.primary,
                      fontWeight: 700,
                      px: 3.5,
                      "&:hover": { bgcolor: tokens.colors.primary.light },
                    }}
                  >
                    Order pickup
                  </Button>
                  <Button
                    component={Link}
                    to="/menu"
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: tokens.colors.text.inverse,
                      borderColor: "rgba(251,250,246,0.3)",
                      backdropFilter: "blur(8px)",
                      "&:hover": {
                        borderColor: tokens.colors.text.inverse,
                        bgcolor: "rgba(251,250,246,0.08)",
                      },
                    }}
                  >
                    Browse menu
                  </Button>
                </Stack>
              </motion.div>
            </Stack>
          </Container>
        </motion.div>

      </Box>

      {/* ══ MARQUEE ════════════════════════════════════════════════════════ */}
      <Box
        component="section"
        aria-label="Menu categories"
        aria-hidden="true"
        sx={{
          bgcolor: tokens.colors.primary.main,
          overflow: "hidden",
        }}
      >
        <Box className="marquee-track" role="marquee">
          {[...marqueeItems, ...marqueeItems].map(
            (name, i) => (
              <Stack
                key={`${name}-${i}`}
                direction="row"
                alignItems="center"
                gap={1.5}
                sx={{ py: 1.5, px: 3, flexShrink: 0 }}
              >
                <LocalDiningOutlinedIcon
                  sx={{ fontSize: "0.9rem", color: "rgba(23,27,23,0.65)" }}
                />
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    color: tokens.colors.text.primary,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {name}
                </Typography>
              </Stack>
            )
          )}
        </Box>
      </Box>

      {/* ══ ABOUT US — cinematic dark ══════════════════════════════════════ */}
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: tokens.colors.bg.inverse,
          color: tokens.colors.dark.textPrimary,
        }}
      >
        {/* Grain */}
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.032,
            backgroundImage: GRAIN,
            backgroundSize: "180px 180px",
            pointerEvents: "none",
          }}
        />

        {/* Right image with cinematic reveal */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            right: 0,
            width: "42%",
            height: "100%",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(23,27,23,1) 0%, rgba(23,27,23,0.52) 42%, transparent 100%)",
              zIndex: 1,
            },
          }}
        >
          <motion.div
            initial={{ scale: 1.14, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.58 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease }}
            style={{ width: "100%", height: "100%" }}
          >
            <picture style={{ display: "block", width: "100%", height: "100%" }}>
              <source type="image/webp" srcSet={homeFeatureImageSet.webpSrcSet} sizes={homeFeatureImageSet.sizes} />
              <source type="image/jpeg" srcSet={homeFeatureImageSet.srcSet} sizes={homeFeatureImageSet.sizes} />
              <img src={homeFeatureImageSet.src} alt="Sri Lankan dishes at New Nanthus Kitchen" loading="lazy" decoding="async" className="image-cover" />
            </picture>
          </motion.div>
        </Box>

        {/* Drifting watermark */}
        <motion.div
          aria-hidden="true"
          animate={{ x: [-18, 18] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: tokens.fonts.display,
              fontSize: { xs: "22vw", md: "15vw" },
              fontWeight: 700,
              color: "rgba(251,250,246,0.018)",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            NANTHUS
          </Typography>
        </motion.div>

        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 2.5, md: 6 },
            py: { xs: 9, md: 14 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "57%" } }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, ease }}
            >
              <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 4 }}>
                <Box sx={{ height: "1px", width: 40, bgcolor: tokens.colors.primary.main, flexShrink: 0 }} />
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: tokens.colors.primary.main,
                  }}
                >
                  Our story
                </Typography>
              </Stack>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, ease, delay: 0.1 }}
            >
              <Typography
                component="h2"
                sx={{
                  fontFamily: tokens.fonts.display,
                  fontSize: {
                    xs: "2.4rem",
                    sm: "3.8rem",
                    md: "5rem",
                    lg: "5.8rem",
                  },
                  lineHeight: 0.94,
                  letterSpacing: "-0.025em",
                  color: tokens.colors.dark.textPrimary,
                  mb: 5,
                }}
              >
                Jaffna on{" "}
                <Box
                  component="span"
                  sx={{ color: tokens.colors.primary.main, fontStyle: "italic" }}
                >
                  the plate,
                </Box>
                <br />
                Toronto{" "}
                <Box component="span" sx={{ color: tokens.colors.dark.textTertiary }}>
                  at the door.
                </Box>
              </Typography>
            </motion.div>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.78, ease, delay: 0.2 }}
            >
              <Typography
                sx={{
                  color: tokens.colors.dark.textSecondary,
                  fontSize: { xs: "1rem", md: "1.08rem" },
                  lineHeight: 1.9,
                  maxWidth: 520,
                  mb: 6,
                }}
              >
                New Nanthus Kitchen brought the Northern Sri Lankan table to
                Scarborough and Markham — full spice, proper portions, and the
                cooking methods that don't take shortcuts. Every plate is made
                fresh, every order treated like it matters.
              </Typography>
            </motion.div>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.78, ease, delay: 0.3 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                divider={
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "1px" },
                      height: { xs: "1px", sm: "auto" },
                      bgcolor: tokens.colors.dark.borderSubtle,
                      flexShrink: 0,
                    }}
                  />
                }
                gap={0}
                sx={{
                  border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  mb: 5,
                }}
              >
                {pillars.map((p) => (
                  <Box
                    key={p.title}
                    sx={{
                      flex: 1,
                      px: { xs: 2.5, md: 3 },
                      py: 2.5,
                      transition: tokens.transitions.fast,
                      "&:hover": { bgcolor: tokens.colors.dark.surface },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: tokens.radius.sm,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "rgba(245,166,35,0.12)",
                        color: tokens.colors.primary.main,
                        mb: 1.5,
                      }}
                    >
                      {p.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: tokens.colors.dark.textPrimary,
                        mb: 0.5,
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: tokens.colors.dark.textTertiary,
                        lineHeight: 1.65,
                      }}
                    >
                      {p.body}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              <Stack
                direction="row"
                gap={2}
                flexWrap="wrap"
                alignItems="center"
              >
                <Button
                  component={Link}
                  to="/gallery"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: tokens.colors.primary.main,
                    color: tokens.colors.text.primary,
                    fontWeight: 700,
                    "&:hover": { bgcolor: tokens.colors.primary.light },
                  }}
                >
                  See the food
                </Button>
                <Button
                  component={Link}
                  to="/menu"
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    color: tokens.colors.dark.textSecondary,
                    "&:hover": { color: tokens.colors.dark.textPrimary },
                  }}
                >
                  Browse menu
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ══ STATS STRIP ════════════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{
          bgcolor: tokens.colors.bg.base,
          py: { xs: 5, md: 7 },
          borderTop: `1px solid ${tokens.colors.line.subtle}`,
          borderBottom: `1px solid ${tokens.colors.line.subtle}`,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14 } },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                gap: { xs: 4, md: 0 },
                textAlign: "center",
              }}
            >
              {stats.map((s, i) => (
                <motion.div key={s.label} variants={fadeUp} custom={i}>
                  <Box
                    sx={{
                      px: { md: 3 },
                      borderRight: {
                        md:
                          i < stats.length - 1
                            ? `1px solid ${tokens.colors.line.subtle}`
                            : "none",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: tokens.fonts.display,
                        fontSize: { xs: "3.2rem", md: "4.8rem" },
                        lineHeight: 1,
                        fontWeight: 700,
                        color: tokens.colors.primary.main,
                        mb: 0.5,
                      }}
                    >
                      <Counter to={s.value} suffix={s.suffix} />
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.76rem",
                        color: tokens.colors.text.secondary,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {s.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ══ FEATURE CARDS ══════════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{ bgcolor: tokens.colors.bg.warm, py: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <SectionHeading
              eyebrow="Your visit, your way"
              title="What brings you in today?"
              body="Whether you're grabbing a quick plate, exploring the full menu, or planning a spread for a crowd."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.16 } },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2.5,
                mt: 4,
              }}
            >
              {featureLinks.map((item) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.32, ease },
                  }}
                  style={{ display: "block" }}
                >
                  <Box
                    component={Link}
                    to={item.path}
                    sx={{
                      textDecoration: "none",
                      bgcolor: tokens.colors.bg.card,
                      border: `1px solid ${tokens.colors.line.subtle}`,
                      borderRadius: tokens.radius.xl,
                      overflow: "hidden",
                      transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                      display: "block",
                      "&:hover": {
                        boxShadow: tokens.shadows.lg,
                        borderColor: tokens.colors.primary.main,
                      },
                      "&:hover .feature-img": { transform: "scale(1.07)" },
                      "&:hover .feature-icon": {
                        bgcolor: tokens.colors.primary.main,
                        color: tokens.colors.text.primary,
                      },
                    }}
                  >
                    <Box
                      sx={{ height: 230, overflow: "hidden", position: "relative" }}
                    >
                      <picture style={{ display: "block", width: "100%", height: "100%" }}>
                        <source type="image/webp" srcSet={item.imageSet.webpSrcSet} sizes="(max-width: 900px) 100vw, 33vw" />
                        <source type="image/jpeg" srcSet={item.imageSet.srcSet} sizes="(max-width: 900px) 100vw, 33vw" />
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="feature-img image-cover"
                          style={{ transition: "transform 0.65s ease" }}
                        />
                      </picture>
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, transparent 40%, rgba(23,27,23,0.55) 100%)",
                        }}
                      />
                    </Box>
                    <Stack gap={1.5} sx={{ p: 2.5 }}>
                      <Box
                        className="feature-icon"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: tokens.radius.md,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: tokens.colors.primary.pale,
                          color: tokens.colors.primary.dark,
                          transition: tokens.transitions.normal,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: tokens.colors.text.secondary,
                          fontSize: "0.9rem",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.body}
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.5}
                        sx={{
                          color: tokens.colors.secondary.main,
                          mt: 0.5,
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 700, fontSize: "0.82rem" }}
                        >
                          Explore
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: "0.9rem" }} />
                      </Stack>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ══ FOOD HIGHLIGHTS ════════════════════════════════════════════════ */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
              gap: { xs: 6, md: 10 },
              alignItems: "center",
            }}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -56, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease }}
            >
              <Box
                sx={{
                  aspectRatio: "4/3",
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  border: `1px solid ${tokens.colors.line.subtle}`,
                  position: "relative",
                  "&:hover img": { transform: "scale(1.05)" },
                }}
              >
                <picture style={{ display: "block", width: "100%", height: "100%" }}>
                  <source type="image/webp" srcSet={homeFeatureImageSet.webpSrcSet} sizes={homeFeatureImageSet.sizes} />
                  <source type="image/jpeg" srcSet={homeFeatureImageSet.srcSet} sizes={homeFeatureImageSet.sizes} />
                  <img
                    src={homeFeatureImageSet.src}
                    alt="Prepared Sri Lankan dishes"
                    loading="lazy"
                    decoding="async"
                    className="image-cover"
                    style={{ transition: "transform 0.85s ease" }}
                  />
                </picture>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.4 }}
                  style={{ position: "absolute", bottom: 20, left: 20 }}
                >
                  <Box
                    sx={{
                      bgcolor: "rgba(23,27,23,0.85)",
                      backdropFilter: "blur(12px)",
                      borderRadius: tokens.radius.md,
                      px: 2,
                      py: 1.2,
                      border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                    }}
                  >
                    <Stack direction="row" gap={1} alignItems="center">
                      <VerifiedOutlinedIcon
                        sx={{
                          color: tokens.colors.primary.main,
                          fontSize: "1rem",
                        }}
                      />
                      <Typography
                        sx={{
                          color: tokens.colors.dark.textPrimary,
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        Authentic Jaffna recipes
                      </Typography>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.13 } },
              }}
            >
              <Stack gap={3}>
                <motion.div variants={fadeUp} custom={0}>
                  <SectionHeading
                    eyebrow="Our style"
                    title="Built around spice, rice, heat, and pickup speed"
                    body="The menu covers everyday plates and celebration food without losing the Jaffna backbone: curry, sambol, short eats, grilled meats, seafood, and rice dishes that travel well."
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={1}>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {foodChips.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          bgcolor: tokens.colors.secondary.pale,
                          color: tokens.colors.secondary.dark,
                          fontWeight: 700,
                          border: `1px solid ${tokens.colors.secondary.glow}`,
                        }}
                      />
                    ))}
                  </Stack>
                </motion.div>
                <motion.div variants={fadeUp} custom={2}>
                  <Button
                    component={Link}
                    to="/gallery"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      alignSelf: "flex-start",
                      borderColor: tokens.colors.line.medium,
                      color: tokens.colors.text.primary,
                      "&:hover": {
                        borderColor: tokens.colors.secondary.main,
                        color: tokens.colors.secondary.main,
                      },
                    }}
                  >
                    See the food
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ══ LOCATIONS ══════════════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{
          bgcolor: tokens.colors.bg.inverse,
          color: tokens.colors.dark.textPrimary,
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grain */}
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: GRAIN,
            backgroundSize: "180px 180px",
            pointerEvents: "none",
          }}
        />
        <Container
          maxWidth="xl"
          sx={{ px: { xs: 2.5, md: 6 }, position: "relative", zIndex: 1 }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <SectionHeading
              eyebrow="Two locations"
              title="Find your nearest counter"
              align="center"
              dark
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2.5,
                mt: 4,
              }}
            >
              {locations.map((location) => (
                <motion.div
                  key={location.id}
                  variants={scaleIn}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3, ease },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: tokens.colors.dark.surface,
                      border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                      borderRadius: tokens.radius.xl,
                      overflow: "hidden",
                      transition:
                        "border-color 0.35s ease, box-shadow 0.35s ease",
                      "&:hover": {
                        borderColor: tokens.colors.primary.main,
                        boxShadow: tokens.shadows.orange,
                      },
                      "&:hover .loc-img": { transform: "scale(1.05)" },
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: 210, md: 260 },
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <picture style={{ display: "block", width: "100%", height: "100%" }}>
                        <source type="image/webp" srcSet={location.imageWebpSrcSet} sizes={location.imageSizes} />
                        <source type="image/jpeg" srcSet={location.imageSrcSet} sizes={location.imageSizes} />
                        <img
                          src={location.image}
                          alt={`${location.name} restaurant counter`}
                          loading="lazy"
                          decoding="async"
                          className="loc-img image-cover"
                          style={{ transition: "transform 0.75s ease" }}
                        />
                      </picture>
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, transparent 28%, rgba(23,27,23,0.88) 100%)",
                        }}
                      />
                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 18,
                          left: 22,
                          fontFamily: tokens.fonts.display,
                          fontSize: { xs: "2rem", md: "2.6rem" },
                          color: tokens.colors.dark.textPrimary,
                          lineHeight: 1,
                        }}
                      >
                        {location.name}
                      </Typography>
                    </Box>
                    <Stack gap={1.5} sx={{ p: { xs: 2.5, md: 3 } }}>
                      <Typography
                        sx={{
                          color: tokens.colors.dark.textSecondary,
                          fontSize: "0.9rem",
                        }}
                      >
                        {location.address}, {location.city}
                      </Typography>
                      <Stack gap={0.3}>
                        {location.hours.map((line) => (
                          <Typography
                            key={line}
                            sx={{
                              color: tokens.colors.dark.textTertiary,
                              fontSize: "0.82rem",
                            }}
                          >
                            {line}
                          </Typography>
                        ))}
                      </Stack>
                      <Stack
                        direction="row"
                        gap={1.2}
                        flexWrap="wrap"
                        sx={{ pt: 0.5 }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => setOrderOpen(true)}
                          sx={{
                            bgcolor: tokens.colors.primary.main,
                            color: tokens.colors.text.primary,
                            fontWeight: 700,
                            "&:hover": { bgcolor: tokens.colors.primary.light },
                          }}
                        >
                          Order here
                        </Button>
                        <Button
                          component="a"
                          href={location.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          startIcon={<MapOutlinedIcon />}
                          sx={{
                            borderColor: tokens.colors.dark.borderLight,
                            color: tokens.colors.dark.textSecondary,
                            "&:hover": {
                              borderColor: tokens.colors.dark.textPrimary,
                              color: tokens.colors.dark.textPrimary,
                            },
                          }}
                        >
                          Map
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ══ NEWSLETTER ═════════════════════════════════════════════════════ */}
      <Box
        component="section"
        sx={{ py: { xs: 8, md: 12 }, bgcolor: tokens.colors.bg.warm }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2.5, md: 6 } }}>
          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease }}
          >
            <Box
              sx={{
                bgcolor: tokens.colors.bg.inverse,
                borderRadius: tokens.radius.xl,
                p: { xs: 3.5, md: 7 },
                border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Grain */}
              <Box
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.03,
                  backgroundImage: GRAIN,
                  backgroundSize: "180px 180px",
                  pointerEvents: "none",
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 2.5 }}>
                  <EyebrowPill label="Newsletter" dark />
                </Box>

                <Typography
                  sx={{
                    fontFamily: tokens.fonts.display,
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    lineHeight: 1.05,
                    color: tokens.colors.dark.textPrimary,
                    mb: 1.5,
                  }}
                >
                  Be the first to know
                </Typography>
                <Typography
                  sx={{
                    color: tokens.colors.dark.textSecondary,
                    mb: 4,
                    maxWidth: 480,
                    mx: "auto",
                    lineHeight: 1.8,
                  }}
                >
                  Sign up and get the latest specials, new menu items, catering
                  updates, and kitchen news. No spam — unsubscribe any time.
                </Typography>

                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 18, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <Stack alignItems="center" gap={1.5}>
                        <motion.div
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 18,
                            delay: 0.1,
                          }}
                        >
                          <VerifiedOutlinedIcon
                            sx={{
                              color: tokens.colors.primary.main,
                              fontSize: "2.4rem",
                            }}
                          />
                        </motion.div>
                        <Typography
                          sx={{
                            color: tokens.colors.dark.textPrimary,
                            fontWeight: 700,
                            fontSize: "1.1rem",
                          }}
                        >
                          You're subscribed!
                        </Typography>
                        <Typography
                          sx={{
                            color: tokens.colors.dark.textTertiary,
                            fontSize: "0.88rem",
                          }}
                        >
                          Thanks for joining — we'll keep you in the loop.
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => setSubscribed(false)}
                          sx={{
                            mt: 0.5,
                            color: tokens.colors.dark.textTertiary,
                            fontSize: "0.78rem",
                            textDecoration: "underline",
                            "&:hover": {
                              color: tokens.colors.dark.textSecondary,
                            },
                          }}
                        >
                          Subscribe with a different email
                        </Button>
                      </Stack>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        component="form"
                        onSubmit={subscribe}
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          flexDirection: { xs: "column", sm: "row" },
                          maxWidth: 480,
                          mx: "auto",
                        }}
                      >
                        <TextField
                          fullWidth
                          required
                          type="email"
                          label="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              bgcolor: tokens.colors.dark.card,
                              "& fieldset": {
                                borderColor: tokens.colors.dark.borderLight,
                              },
                              "&:hover fieldset": {
                                borderColor: tokens.colors.dark.borderLight,
                              },
                              "& input": {
                                color: tokens.colors.dark.textPrimary,
                              },
                              "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
                                {
                                  WebkitBoxShadow: `0 0 0 100px ${tokens.colors.dark.card} inset`,
                                  WebkitTextFillColor: `${tokens.colors.dark.textPrimary} !important`,
                                  caretColor:
                                    tokens.colors.dark.textPrimary,
                                },
                            },
                            "& .MuiInputLabel-root": {
                              color: tokens.colors.dark.textTertiary,
                            },
                          }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            px: 4,
                            flexShrink: 0,
                            bgcolor: tokens.colors.primary.main,
                            color: tokens.colors.text.primary,
                            fontWeight: 700,
                            "&:hover": {
                              bgcolor: tokens.colors.primary.light,
                            },
                          }}
                        >
                          Join the list
                        </Button>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <LocationSelectionModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
      />
    </Box>
  );
}
