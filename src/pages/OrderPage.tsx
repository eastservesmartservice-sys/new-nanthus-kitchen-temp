import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { tokens } from "../theme";

const locations = [
  {
    name:      "Scarborough",
    address:   "80 Nashdene Rd",
    city:      "Scarborough, ON M1V 5E4",
    phones:    ["(416) 299-1999", "(416) 388-4791"],
    orderLink: "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=548c1a41-011d-488a-8876-d7815c9181d7&facebook=true",
    image:     "https://images.pexels.com/photos/34070063/pexels-photo-34070063.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name:      "Markham",
    address:   "72-30 Karachi Dr",
    city:      "Markham, ON L3S 0B6",
    phones:    ["(289) 554-5999"],
    orderLink: "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=d171d5c5-0412-4013-b588-c52b5513f592&facebook=true",
    image:     "https://images.pexels.com/photos/5176006/pexels-photo-5176006.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const steps = [
  { num: "01", title: "Choose Location",  desc: "Select your nearest Nanthus location below" },
  { num: "02", title: "Browse & Order",   desc: "Pick from our full menu of 50+ dishes" },
  { num: "03", title: "Collect Fresh",    desc: "Ready in 20–30 minutes — hot & fresh" },
];

const OrderPage: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base }}>
      {/* ── Page header ── */}
      <Box
        sx={{
          pt:       { xs: 14, md: 18 },
          pb:       { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          bgcolor:  tokens.colors.dark.bg,
          borderBottom:`1px solid ${tokens.colors.dark.borderSubtle}`,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position:   "absolute",
            top: "50%", right: "-3%",
            transform:  "translateY(-50%)",
            fontFamily: tokens.fonts.display,
            fontSize:   "18vw", color: tokens.colors.primary.main,
            opacity:    0.04, lineHeight: 1,
            userSelect: "none", pointerEvents: "none",
          }}
        >
          ORDER
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box sx={{ width: 28, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.6 }} />
            <Typography variant="overline" sx={{ color: tokens.colors.primary.main }}>Pickup Only</Typography>
          </Box>
          <Typography
            component="h1"
            sx={{
              fontFamily: tokens.fonts.display, fontSize: { xs: "2.8rem", md: "5rem" },
              fontWeight: 400, textTransform: "uppercase", color: tokens.colors.dark.textPrimary,
              lineHeight: 0.9, letterSpacing: "-0.02em", mb: 2,
            }}
          >
            Order for{" "}
            <Box component="span" sx={{ color: tokens.colors.primary.main }}>Pickup</Box>
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.95rem", maxWidth: 480, lineHeight: 1.7 }}>
            Authentic Jaffna cuisine, ready in 20–30 minutes. Pick up from either
            of our two GTA locations — no delivery, always fresh.
          </Typography>

          {/* Perks strip */}
          <Box sx={{ display: "flex", gap: { xs: 2, md: 4 }, mt: 5, flexWrap: "wrap" }}>
            {[
              { icon: <AccessTimeIcon sx={{ fontSize: "1rem" }}/>, text: "20–30 Min Ready" },
              { icon: <LocalOfferIcon sx={{ fontSize: "1rem" }}/>, text: "10% Off First Order" },
            ].map((perk, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ color: tokens.colors.primary.main }}>{perk.icon}</Box>
                <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.85rem" }}>{perk.text}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── How it works ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: tokens.colors.bg.base }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 5, textAlign: "center" }}>
            How It Works
          </Typography>
          <Box
            sx={{
              display:             "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap:                 { xs: 2.5, md: 4 },
            }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Box
                  sx={{
                    p:            { xs: 3, md: 4 },
                    border:       `1px solid ${tokens.colors.border.faint}`,
                    borderRadius: tokens.radius.md,
                    bgcolor:      tokens.colors.bg.card,
                    position:     "relative",
                    overflow:     "hidden",
                    height:       "100%",
                    transition:   `all ${tokens.transitions.spring}`,
                    '&:hover': {
                      borderColor: tokens.colors.border.medium,
                      transform:   'translateY(-4px)',
                      boxShadow:   tokens.shadows.gold,
                    },
                  }}
                >
                  <Typography
                    aria-hidden="true"
                    sx={{
                      position:   "absolute",
                      top: -16, right: 12,
                      fontFamily: tokens.fonts.display,
                      fontSize:   "5rem",
                      color:      tokens.colors.primary.main,
                      opacity:    0.07, lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {step.num}
                  </Typography>
                  <Typography
                    sx={{
                      color:      tokens.colors.primary.main,
                      fontFamily: tokens.fonts.display,
                      fontSize:   "1.1rem",
                      mb:         1.5,
                    }}
                  >
                    {step.num}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.text.primary, fontWeight: 600, fontSize: "1rem", mb: 0.75 }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem", lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Location cards ── */}
      <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: tokens.colors.bg.surface }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 1.5 }}>
              Choose Your Location
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: tokens.fonts.display, fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 400, textTransform: "uppercase", color: tokens.colors.text.primary,
                lineHeight: 0.95, letterSpacing: "-0.01em",
              }}
            >
              Two GTA Locations
            </Typography>
          </Box>

          <Box
            sx={{
              display:             "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap:                 { xs: 3, md: 4 },
            }}
          >
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Box
                  onMouseEnter={() => setHovered(loc.name)}
                  onMouseLeave={() => setHovered(null)}
                  sx={{
                    border:       `1px solid ${hovered === loc.name ? tokens.colors.border.medium : tokens.colors.border.subtle}`,
                    borderRadius: tokens.radius.lg,
                    overflow:     "hidden",
                    bgcolor:      tokens.colors.bg.card,
                    transition:   `all ${tokens.transitions.spring}`,
                    transform:    hovered === loc.name ? "translateY(-6px) scale(1.01)" : "none",
                    boxShadow:    hovered === loc.name ? tokens.shadows.goldLg : tokens.shadows.sm,
                  }}
                >
                  {/* Image */}
                  <Box sx={{ height: { xs: 200, md: 240 }, overflow: "hidden", position: "relative" }}>
                    <Box
                      component="img"
                      src={loc.image}
                      alt={`${loc.name} location`}
                      loading="lazy"
                      sx={{
                        width: "100%", height: "100%", objectFit: "cover",
                        transition: `transform ${tokens.transitions.spring}, filter ${tokens.transitions.slow}`,
                        transform:  hovered === loc.name ? "scale(1.06)" : "scale(1)",
                        filter:     hovered === loc.name ? 'contrast(1.08) saturate(1.15)' : 'contrast(1.05) saturate(1.1)',
                      }}
                    />
                    {/* Image overlay — keeps text readable over photo */}
                    <Box
                      sx={{
                        position:   "absolute",
                        inset:      0,
                        background: "linear-gradient(to top, rgba(12,10,7,0.75) 0%, transparent 60%)",
                      }}
                    />
                    <Typography
                      sx={{
                        position:      "absolute",
                        bottom:        16, left: 20,
                        fontFamily:    tokens.fonts.display,
                        fontSize:      "1.8rem",
                        textTransform: "uppercase",
                        color:         "white",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {loc.name}
                    </Typography>
                  </Box>

                  {/* Info */}
                  <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
                      <LocationOnIcon sx={{ color: tokens.colors.primary.main, flexShrink: 0, mt: 0.2 }} />
                      <Box>
                        <Typography sx={{ color: tokens.colors.text.primary, fontWeight: 500, fontSize: "0.95rem" }}>
                          {loc.address}
                        </Typography>
                        <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}>
                          {loc.city}
                        </Typography>
                      </Box>
                    </Box>

                    {loc.phones.map((phone, pi) => (
                      <Box key={pi} sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
                        <PhoneIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem", flexShrink: 0 }} />
                        <Typography
                          component="a"
                          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                          sx={{
                            color: tokens.colors.text.secondary, fontSize: "0.9rem",
                            textDecoration: "none",
                            "&:hover": { color: tokens.colors.primary.main },
                            transition: tokens.transitions.fast,
                          }}
                        >
                          {phone}
                        </Typography>
                      </Box>
                    ))}

                    <Button
                      component="a"
                      href={loc.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{
                        mt:         3,
                        fontWeight: 700,
                        color:      tokens.colors.bg.base,
                        fontSize:   "0.82rem",
                        py:         1.5,
                      }}
                    >
                      Order from {loc.name}
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OrderPage;
