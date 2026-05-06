import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import PageBanner from "../components/PageBanner";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const services = [
  {
    num:      "01",
    title:    "catering.corporateTitle",
    desc:     "catering.corporateDesc",
    features: ["catering.corporate.f1", "catering.corporate.f2", "catering.corporate.f3"],
  },
  {
    num:      "02",
    title:    "catering.weddingsTitle",
    desc:     "catering.weddingsDesc",
    features: ["catering.weddings.f1", "catering.weddings.f2", "catering.weddings.f3"],
  },
  {
    num:      "03",
    title:    "catering.culturalTitle",
    desc:     "catering.culturalDesc",
    features: ["catering.cultural.f1", "catering.cultural.f2", "catering.cultural.f3"],
  },
];

const CateringPage: React.FC = () => {
  const { t } = useTranslation();

  return (
  <Box sx={{ bgcolor: tokens.colors.bg.base }}>

    <PageBanner
      eyebrow={t("catering.eyebrow")}
      title={t("catering.title")}
      highlight={t("catering.highlight")}
      subtitle={t("catering.subtitle")}
      watermark={t("catering.watermark")}
    />

    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>

      {/* ── Services list ── */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {services.map((service, i) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              sx={{
                display:             "grid",
                gridTemplateColumns: { xs: "1fr", md: "80px 1fr 1fr" },
                gap:                 { xs: 2, md: 6 },
                py:                  { xs: 5, md: 7 },
                borderTop:           `1px solid ${tokens.colors.border.subtle}`,
                "&:last-child":      { borderBottom: `1px solid ${tokens.colors.border.subtle}` },
                transition:          `all ${tokens.transitions.spring}`,
                position:            "relative",
                overflow:            "hidden",
                // Hover gold left accent
                "&::before": {
                  content:    '""',
                  position:   "absolute",
                  left:       0,
                  top:        0,
                  bottom:     0,
                  width:      "3px",
                  background: `linear-gradient(180deg, transparent, ${tokens.colors.primary.main}, transparent)`,
                  opacity:    0,
                  transition: `opacity ${tokens.transitions.normal}`,
                },
                "&:hover": {
                  bgcolor: tokens.colors.primary.glow2,
                  "&::before": { opacity: 1 },
                },
              }}
            >
              {/* Number — large ghost watermark */}
              <Box sx={{ position: "relative" }}>
                <Typography sx={{
                  color:      tokens.colors.primary.main,
                  fontFamily: tokens.fonts.display,
                  fontSize:   { xs: "1rem", md: "1.1rem" },
                  opacity:    0.55,
                  pt:         { xs: 0, md: 0.5 },
                }}>
                  {service.num}
                </Typography>
                {/* Ghost number */}
                <Typography
                  aria-hidden="true"
                  sx={{
                    display:      { xs: "none", md: "block" },
                    position:     "absolute",
                    top:          "50%",
                    left:         "50%",
                    transform:    "translate(-50%, -50%)",
                    fontFamily:   tokens.fonts.display,
                    fontSize:     "8rem",
                    color:        tokens.colors.primary.main,
                    opacity:      0.04,
                    lineHeight:   1,
                    userSelect:   "none",
                    pointerEvents:"none",
                    whiteSpace:   "nowrap",
                  }}
                >
                  {service.num}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "1.8rem", md: "2rem", lg: "2.2rem" },
                  textTransform: "uppercase",
                  color:         tokens.colors.text.primary,
                  lineHeight:    0.95,
                  mb:            2,
                }}>
                {t(service.title)}
              </Typography>
                <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.92rem", lineHeight: 1.75 }}>
                  {t(service.desc)}
                </Typography>
              </Box>

              <Box>
                {service.features.map((f) => (
                  <Box key={f} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.8 }}>
                    <Box sx={{
                      width:        20,
                      height:       20,
                      borderRadius: "50%",
                      bgcolor:      tokens.colors.primary.glow,
                      border:       `1px solid rgba(184,134,11,0.25)`,
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent:"center",
                      flexShrink:   0,
                      mt:           0.1,
                    }}>
                      <CheckCircleOutlineIcon sx={{ color: tokens.colors.primary.main, fontSize: "0.85rem" }} />
                    </Box>
                    <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.88rem", lineHeight: 1.6 }}>
                      {t(f)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* ── Bottom CTA ── */}
      <Box sx={{ mt: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box sx={{
            position:     "relative",
            p:            { xs: 4, md: 7 },
            border:       `1px solid ${tokens.colors.dark.borderSubtle}`,
            borderRadius: tokens.radius.xl,
            bgcolor:      tokens.colors.dark.bg,
            textAlign:    "center",
            overflow:     "hidden",
          }}>
            {/* Background grid */}
            <Box
              aria-hidden="true"
              sx={{
                position:        "absolute",
                inset:           0,
                backgroundImage: `linear-gradient(${tokens.colors.dark.borderFaint} 1px, transparent 1px),
                                  linear-gradient(90deg, ${tokens.colors.dark.borderFaint} 1px, transparent 1px)`,
                backgroundSize:  "48px 48px",
                opacity:         0.8,
                pointerEvents:   "none",
              }}
            />
            {/* Gold radial glow */}
            <Box
              aria-hidden="true"
              sx={{
                position:      "absolute",
                top:           "50%",
                left:          "50%",
                transform:     "translate(-50%, -50%)",
                width:         "80%",
                height:        "150%",
                background:    "radial-gradient(ellipse at center, rgba(184,134,11,0.08) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
                {t("catering.readyToPlan")}
              </Typography>
              <Typography sx={{
                fontFamily:    tokens.fonts.display,
                fontSize:      { xs: "2rem", md: "3rem" },
                textTransform: "uppercase",
                color:         tokens.colors.dark.textPrimary,
                mb:            2,
                letterSpacing: "-0.02em",
                lineHeight:    0.92,
              }}>
                {t("catering.ctaHeading1")}{" "}
                <Box component="span" sx={{ color: tokens.colors.primary.main }}>
                  {t("catering.ctaHeading2")}
                </Box>
              </Typography>
              <Typography sx={{ color: tokens.colors.dark.textTertiary, mb: 4, fontSize: "0.9rem", maxWidth: 420, mx: "auto" }}>
                {t("catering.ctaBody")}
              </Typography>
              <Button
                component={Link}
                to="/contact"
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
                  fontSize:   "0.85rem",
                  background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                  "&:hover .MuiButton-endIcon": { transform: "translateX(4px)" },
                }}
              >
                {t("catering.contactUs")}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Container>
  </Box>
  );
};

export default CateringPage;
