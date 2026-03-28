import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { tokens } from "../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const services = [
  {
    num:   "01",
    title: "Corporate Events",
    desc:  "Business lunches, team catering & boardroom meals — delivered with professionalism.",
    features: ["Flexible portions", "Customisable menus", "On-time delivery"],
  },
  {
    num:   "02",
    title: "Weddings & Celebrations",
    desc:  "Make your special occasion unforgettable with authentic Sri Lankan feasting.",
    features: ["Large group capacity", "Traditional banana leaf service", "Custom packages"],
  },
  {
    num:   "03",
    title: "Cultural Events",
    desc:  "Authentic Sri Lankan festivals and cultural gatherings catered with pride.",
    features: ["Traditional Jaffna recipes", "Seasonal specials", "Cultural experience"],
  },
];

const CateringPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base }}>
      {/* ── Cinematic hero image ── */}
      <Box
        sx={{
          position:   "relative",
          height:     { xs: 500, md: 680 },
          overflow:   "hidden",
        }}
      >
        <motion.div style={{ y: bgY, position: "absolute", inset: 0 }}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
            alt="Catering event setup"
            sx={{ width: "100%", height: "130%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </motion.div>

        {/* Gradient overlay — dark overlay keeps text readable on photo */}
        <Box
          aria-hidden="true"
          sx={{
            position:   "absolute",
            inset:      0,
            background: `linear-gradient(
              to bottom,
              rgba(16,14,10,0.25) 0%,
              rgba(16,14,10,0.55) 50%,
              ${tokens.colors.bg.base} 100%
            )`,
          }}
        />

        {/* Hero text — white retained for contrast on dark photo overlay */}
        <Container
          maxWidth="lg"
          sx={{
            position:  "absolute",
            bottom:    { xs: 40, md: 60 },
            left:      "50%",
            transform: "translateX(-50%)",
            width:     "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box sx={{ width: 28, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.7 }} />
              <Typography variant="overline" sx={{ color: tokens.colors.primary.main }}>Catering Services</Typography>
            </Box>
            <Typography
              component="h1"
              sx={{
                fontFamily:    tokens.fonts.display,
                fontSize:      { xs: "3rem", md: "5.5rem", lg: "7rem" },
                fontWeight:    400,
                textTransform: "uppercase",
                color:         "white",
                lineHeight:    0.88,
                letterSpacing: "-0.025em",
              }}
            >
              Curated{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>Events</Box>
            </Typography>
          </motion.div>
        </Container>

        {/* Stats badge */}
        <Box
          sx={{
            position:     "absolute",
            top:          { xs: 80, md: 100 },
            right:        { xs: 16, md: 24 },
            bgcolor:      "rgba(253,250,244,0.88)",
            backdropFilter:"blur(12px)",
            border:       `1px solid ${tokens.colors.border.medium}`,
            borderRadius: tokens.radius.md,
            px:           3, py: 2.5,
            textAlign:    "center",
          }}
        >
          <Typography
            sx={{ color: tokens.colors.primary.main, fontFamily: tokens.fonts.display, fontSize: "2.5rem", lineHeight: 1 }}
          >
            25+
          </Typography>
          <Typography variant="overline" sx={{ color: tokens.colors.text.tertiary, letterSpacing: "0.15em" }}>
            Events Catered
          </Typography>
        </Box>
      </Box>

      {/* ── Intro + description ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            display:             "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap:                 { xs: 6, md: 12 },
            alignItems:          "start",
            mb:                  { xs: 10, md: 16 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3rem" },
                fontWeight: 400, textTransform: "uppercase", color: tokens.colors.text.primary,
                lineHeight: 0.95, letterSpacing: "-0.01em",
              }}
            >
              Elevate Your{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>Gathering</Box>
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography sx={{ color: tokens.colors.text.secondary, lineHeight: 1.85, fontSize: "0.95rem", mb: 4 }}>
              From intimate corporate luncheons to grand wedding feasts, New Nanthus
              Kitchen brings culinary excellence and authentic Sri Lankan hospitality
              to every occasion. Let us handle the food so you can enjoy the moment.
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, py: 1.7, fontWeight: 700, color: tokens.colors.bg.base, fontSize: "0.85rem" }}
            >
              Enquire Now
            </Button>
          </motion.div>
        </Box>

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
                  "&:hover": {
                    bgcolor:      tokens.colors.primary.glow2,
                    borderColor:  tokens.colors.border.light,
                  },
                }}
              >
                {/* Number */}
                <Typography
                  sx={{
                    color:      tokens.colors.primary.main,
                    fontFamily: tokens.fonts.display,
                    fontSize:   "1rem",
                    opacity:    0.5,
                    pt:         { xs: 0, md: 0.5 },
                  }}
                >
                  {service.num}
                </Typography>

                {/* Title + desc */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily:    tokens.fonts.display,
                      fontSize:      { xs: "1.8rem", md: "2.2rem" },
                      textTransform: "uppercase",
                      color:         tokens.colors.text.primary,
                      lineHeight:    0.95,
                      mb:            2,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.92rem", lineHeight: 1.75 }}>
                    {service.desc}
                  </Typography>
                </Box>

                {/* Features */}
                <Box>
                  {service.features.map((f) => (
                    <Box key={f} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <CheckCircleOutlineIcon
                        sx={{ color: tokens.colors.primary.main, fontSize: "1rem", flexShrink: 0 }}
                      />
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

        {/* Bottom CTA */}
        <Box
          sx={{
            mt:        { xs: 8, md: 12 },
            p:         { xs: 4, md: 6 },
            border:    `1px solid ${tokens.colors.border.subtle}`,
            borderRadius:tokens.radius.lg,
            bgcolor:   tokens.colors.bg.card,
            textAlign: "center",
          }}
        >
          <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
            Ready to Plan?
          </Typography>
          <Typography
            sx={{
              fontFamily:    tokens.fonts.display,
              fontSize:      { xs: "2rem", md: "2.75rem" },
              textTransform: "uppercase",
              color:         tokens.colors.text.primary,
              mb:            2,
              letterSpacing: "-0.01em",
            }}
          >
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
};

export default CateringPage;
