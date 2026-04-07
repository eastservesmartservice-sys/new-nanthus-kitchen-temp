import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import PageBanner from "../components/PageBanner";
import { tokens } from "../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const services = [
  {
    num:      "01",
    title:    "Corporate Events",
    desc:     "Business lunches, team catering & boardroom meals — delivered with professionalism.",
    features: ["Flexible portions", "Customisable menus", "On-time delivery"],
  },
  {
    num:      "02",
    title:    "Weddings & Celebrations",
    desc:     "Make your special occasion unforgettable with authentic Sri Lankan feasting.",
    features: ["Large group capacity", "Traditional banana leaf service", "Custom packages"],
  },
  {
    num:      "03",
    title:    "Cultural Events",
    desc:     "Authentic Sri Lankan festivals and cultural gatherings catered with pride.",
    features: ["Traditional Jaffna recipes", "Seasonal specials", "Cultural experience"],
  },
];

const CateringPage: React.FC = () => (
  <Box sx={{ bgcolor: tokens.colors.bg.base }}>

    <PageBanner
      eyebrow="Catering Services"
      title="Curated"
      highlight="Events"
      subtitle="From intimate corporate luncheons to grand wedding feasts — authentic Sri Lankan hospitality for every occasion."
      watermark="Catering"
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
                "&:hover":           { bgcolor: tokens.colors.primary.glow2 },
              }}
            >
              <Typography sx={{
                color:      tokens.colors.primary.main,
                fontFamily: tokens.fonts.display,
                fontSize:   "1rem",
                opacity:    0.5,
                pt:         { xs: 0, md: 0.5 },
              }}>
                {service.num}
              </Typography>

              <Box>
                <Typography sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "1.8rem", md: "2rem", lg: "2.2rem" },
                  textTransform: "uppercase",
                  color:         tokens.colors.text.primary,
                  lineHeight:    0.95,
                  mb:            2,
                }}>
                  {service.title}
                </Typography>
                <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.92rem", lineHeight: 1.75 }}>
                  {service.desc}
                </Typography>
              </Box>

              <Box>
                {service.features.map((f) => (
                  <Box key={f} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem", flexShrink: 0 }} />
                    <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}>
                      {f}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* ── Bottom CTA ── */}
      <Box sx={{
        mt:           { xs: 8, md: 12 },
        p:            { xs: 4, md: 6 },
        border:       `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radius.lg,
        bgcolor:      tokens.colors.bg.card,
        textAlign:    "center",
      }}>
        <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
          Ready to Plan?
        </Typography>
        <Typography sx={{
          fontFamily:    tokens.fonts.display,
          fontSize:      { xs: "2rem", md: "2.75rem" },
          textTransform: "uppercase",
          color:         tokens.colors.text.primary,
          mb:            2,
          letterSpacing: "-0.01em",
        }}>
          Let's Create Something{" "}
          <Box component="span" sx={{ color: tokens.colors.primary.main }}>Special</Box>
        </Typography>
        <Typography sx={{ color: tokens.colors.text.tertiary, mb: 4, fontSize: "0.9rem", maxWidth: 420, mx: "auto" }}>
          Get in touch and we'll tailor a menu and experience to your event's needs.
        </Typography>
        <Button
          component={Link}
          to="/contact"
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 5, py: 1.7, fontWeight: 700, color: tokens.colors.bg.base, fontSize: "0.85rem" }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  </Box>
);

export default CateringPage;
