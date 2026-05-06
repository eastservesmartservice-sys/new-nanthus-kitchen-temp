import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import PageBanner from "../components/PageBanner";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Special {
  tag:          string;
  title:        string;
  description:  string;
  price:        string;
  image:        string;
  availability: string;
  badge?:       string;
}

const specials: Special[] = [
  {
    tag:         "specials.dailySpecial",
    title:       "specials.lunchBoxTitle",
    description: "specials.lunchBoxDesc",
    price:       "specials.lunchBoxPrice",
    image:       "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",
    availability:"specials.lunchBoxAvail",
    badge:       "specials.lunchBoxBadge",
  },
  {
    tag:         "specials.weekendSpecial",
    title:       "specials.soupTitle",
    description: "specials.soupDesc",
    price:       "specials.soupPrice",
    image:       "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80",
    availability:"specials.soupAvail",
  },
];

interface SpecialCardProps { special: Special; index: number; t: (key: string) => string; }

const SpecialCard: React.FC<SpecialCardProps> = ({ special, index, t }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY     = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  return (
    <Box
      ref={ref}
      component="article"
      sx={{
        minHeight:     { xs: "auto", md: "100vh" },
        display:       "flex",
        alignItems:    "center",
        py:            { xs: 8, md: 0 },
        position:      "relative",
      }}
    >
      {/* Large index watermark */}
      <Box
        aria-hidden="true"
        sx={{
          display:       { xs: "none", md: "block" },
          position:      "absolute",
          top:           "50%",
          [isEven ? "right" : "left"]: "0.5%",
          transform:     "translateY(-50%)",
          fontFamily:    tokens.fonts.display,
          fontSize:      "22rem",
          color:         "transparent",
          WebkitTextStroke: `1px ${tokens.colors.primary.main}`,
          opacity:       0.05,
          lineHeight:    1,
          pointerEvents: "none",
          userSelect:    "none",
        }}
      >
        0{index + 1}
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            display:       "flex",
            flexDirection: { xs: "column", md: isEven ? "row" : "row-reverse" },
            alignItems:    "center",
            gap:           { xs: 5, md: 10 },
          }}
        >
          {/* Image */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                position:     "relative",
                height:       { xs: 280, sm: 360, md: 500, lg: 560 },
                borderRadius: tokens.radius.xl,
                overflow:     "hidden",
                border:       `1px solid ${tokens.colors.border.subtle}`,
                boxShadow:    tokens.shadows.lg,
              }}
            >
              <motion.div style={{ scale: imgScale, y: imgY, width: "100%", height: "100%" }}>
                <Box
                  component="img"
                  src={special.image}
                  alt={special.title}
                  loading="lazy"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>

              {/* Cinematic overlay */}
              <Box sx={{
                position:   "absolute",
                inset:      0,
                background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(10,8,5,0.28) 100%)",
                pointerEvents: "none",
              }} />

              {/* Tag */}
              <Chip
                label={t(special.tag)}
                sx={{
                  position:     "absolute",
                  top:          20, left: 20,
                  bgcolor:      tokens.colors.primary.main,
                  color:        tokens.colors.bg.base,
                  fontWeight:   700, fontSize: "0.7rem",
                  letterSpacing:"0.08em",
                  borderRadius: tokens.radius.xs,
                  height:       28,
                  boxShadow:    tokens.shadows.gold,
                }}
              />
              {special.badge && (
                <Chip
                  label={t(special.badge)}
                  sx={{
                    position:     "absolute",
                    top:          20, right: 20,
                    bgcolor:      "rgba(253,250,244,0.92)",
                    color:        tokens.colors.text.secondary,
                    fontWeight:   600, fontSize: "0.68rem",
                    borderRadius: tokens.radius.xs,
                    height:       28,
                    border:       `1px solid ${tokens.colors.border.subtle}`,
                    backdropFilter: "blur(8px)",
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                <Box sx={{ width: 28, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
                <Typography variant="overline" sx={{ color: tokens.colors.primary.main, letterSpacing: "0.25em" }}>
                  {t("specials.chefsSpecial")}
                </Typography>
              </Box>

              <Typography
                component="h2"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "2.2rem", md: "3.2rem", lg: "4rem" },
                  fontWeight:    400,
                  textTransform: "uppercase",
                  color:         tokens.colors.text.primary,
                  lineHeight:    0.92,
                  letterSpacing: "-0.02em",
                  mb:            3,
                }}
              >
                {t(special.title)}
              </Typography>

              {/* Gold rule */}
              <Box sx={{
                width:      { xs: 48, md: 64 },
                height:     "2px",
                background: `linear-gradient(90deg, ${tokens.colors.primary.main}, ${tokens.colors.primary.light}, transparent)`,
                mb:         3.5,
                borderRadius: "2px",
              }} />

              <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 460, mb: 3.5 }}>
                {t(special.description)}
              </Typography>

              <Chip
                label={t(special.availability)}
                sx={{
                  bgcolor:      tokens.colors.primary.glow,
                  color:        tokens.colors.primary.main,
                  fontWeight:   600,
                  fontSize:     "0.72rem",
                  height:       28,
                  border:       `1px solid rgba(184,134,11,0.25)`,
                  borderRadius: tokens.radius.xs,
                  mb:           4,
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />

              {/* Price */}
              <Box sx={{ mb: 5 }}>
                <Typography
                  sx={{
                    color:      tokens.colors.primary.main,
                    fontFamily: tokens.fonts.display,
                    fontSize:   { xs: "2.8rem", md: "3.8rem" },
                    fontWeight: 400,
                    lineHeight: 1,
                    textShadow: `0 0 40px rgba(184,134,11,0.25)`,
                  }}
                >
                  {t(special.price)}
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/order"
                variant="contained"
                color="primary"
                size="large"
                className="btn-shimmer"
                endIcon={<ArrowForwardIcon sx={{ transition: "transform 0.25s ease" }} />}
                sx={{
                  px:         4,
                  py:         1.6,
                  fontWeight: 700,
                  color:      tokens.colors.bg.base,
                  fontSize:   "0.82rem",
                  background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                  "&:hover .MuiButton-endIcon": { transform: "translateX(4px)" },
                }}
              >
                {t("nav.orderNow")}
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const SpecialsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
  <Box sx={{ bgcolor: tokens.colors.bg.surface }}>
    <PageBanner
      eyebrow={t("specials.eyebrow")}
      title={t("specials.title")}
      highlight={t("specials.highlight")}
      subtitle={t("specials.subtitle")}
      watermark={t("specials.watermark")}
    />

    {/* Specials */}
    {specials.map((special, i) => (
      <Box
        key={special.title}
        sx={{ bgcolor: i % 2 === 0 ? tokens.colors.bg.surface : tokens.colors.bg.base }}
      >
        <SpecialCard special={special} index={i} t={t} />
      </Box>
    ))}

    {/* Bottom CTA */}
    <Box
      sx={{
        position:  "relative",
        overflow:  "hidden",
        bgcolor:   tokens.colors.bg.card,
        py:        { xs: 10, md: 16 },
        textAlign: "center",
        borderTop: `1px solid ${tokens.colors.border.subtle}`,
      }}
    >
      {/* Background watermark */}
      <Box
        aria-hidden="true"
        sx={{
          position:      "absolute",
          bottom:        -30,
          left:          "50%",
          transform:     "translateX(-50%)",
          fontFamily:    tokens.fonts.display,
          fontSize:      { xs: "28vw", md: "20vw" },
          color:         "transparent",
          WebkitTextStroke: `1px ${tokens.colors.primary.main}`,
          opacity:       0.04,
          whiteSpace:    "nowrap",
          pointerEvents: "none",
          userSelect:    "none",
          lineHeight:    1,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
        }}
      >
        Specials
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
          {t("specials.fullMenu")}
        </Typography>
        <Typography
          sx={{
            fontFamily:    tokens.fonts.display,
            fontSize:      { xs: "2.2rem", md: "3rem" },
            textTransform: "uppercase",
            color:         tokens.colors.text.primary,
            mb:            2,
            lineHeight:    0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {t("specials.exploreEverything")}
        </Typography>
        <Typography sx={{ color: tokens.colors.text.tertiary, mb: 5, fontSize: "0.9rem", lineHeight: 1.7 }}>
          {t("specials.exploreBody")}
        </Typography>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="primary"
          size="large"
          className="btn-shimmer"
          endIcon={<ArrowForwardIcon sx={{ transition: "transform 0.25s ease" }} />}
          sx={{
            px:         5,
            py:         1.7,
            fontWeight: 700,
            color:      tokens.colors.bg.base,
            background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
            "&:hover .MuiButton-endIcon": { transform: "translateX(4px)" },
          }}
        >
          {t("specials.viewFullMenu")}
        </Button>
      </Container>
    </Box>
  </Box>
  );
};

export default SpecialsPage;
