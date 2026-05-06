import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import PageBanner from "../components/PageBanner";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
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
  { num: "order.step1Num", title: "order.step1Title",  desc: "order.step1Desc" },
  { num: "order.step2Num", title: "order.step2Title",   desc: "order.step2Desc" },
  { num: "order.step3Num", title: "order.step3Title",    desc: "order.step3Desc" },
];

const stepIcons = ["🔍", "🛒", "🏃"];

const OrderPage: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base }}>
      <PageBanner
        eyebrow={t("order.eyebrow")}
        title={t("order.title")}
        highlight={t("order.highlight")}
        subtitle={t("order.subtitle")}
        watermark={t("order.watermark")}
      >
        <Box sx={{ display: "flex", gap: { xs: 2, md: 4 }, flexWrap: "wrap" }}>
          {[
            { icon: <AccessTimeIcon sx={{ fontSize: "1rem" }} />, text: t("order.perkReady") },
            { icon: <LocalOfferIcon sx={{ fontSize: "1rem" }} />, text: t("order.perkDiscount") },
          ].map((perk, i) => (
            <Box key={i} sx={{
              display:      "flex",
              alignItems:   "center",
              gap:          1,
              px:           2,
              py:           0.75,
              borderRadius: tokens.radius.pill,
              bgcolor:      "rgba(184,134,11,0.08)",
              border:       `1px solid rgba(184,134,11,0.2)`,
            }}>
              <Box sx={{ color: tokens.colors.primary.main }}>{perk.icon}</Box>
              <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.85rem" }}>{perk.text}</Typography>
            </Box>
          ))}
        </Box>
      </PageBanner>

      {/* ── How it works ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: tokens.colors.bg.base }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 1.5 }}>
              {t("order.howItWorks")}
            </Typography>
            <Box className="gold-divider" sx={{ maxWidth: 200, mx: "auto" }} />
          </Box>
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
                    p:            { xs: 3.5, md: 4.5 },
                    border:       `1px solid ${tokens.colors.border.subtle}`,
                    borderRadius: tokens.radius.lg,
                    bgcolor:      tokens.colors.bg.card,
                    position:     "relative",
                    overflow:     "hidden",
                    height:       "100%",
                    transition:   `all ${tokens.transitions.spring}`,
                    "&:hover": {
                      borderColor: tokens.colors.primary.main,
                      transform:   "translateY(-6px)",
                      boxShadow:   tokens.shadows.gold,
                    },
                  }}
                >
                  {/* Step icon circle */}
                  <Box sx={{
                    width:        56,
                    height:       56,
                    borderRadius: "50%",
                    bgcolor:      tokens.colors.primary.glow,
                    border:       `1px solid ${tokens.colors.border.subtle}`,
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent:"center",
                    fontSize:     "1.5rem",
                    mb:           2.5,
                  }}>
                    {stepIcons[i]}
                  </Box>

                  {/* Ghost step number */}
                  <Typography
                    aria-hidden="true"
                    sx={{
                      position:   "absolute",
                      top: -16, right: 12,
                      fontFamily: tokens.fonts.display,
                      fontSize:   "5.5rem",
                      color:      tokens.colors.primary.main,
                      opacity:    0.06, lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {t(step.num)}
                  </Typography>

                  <Typography sx={{
                    color:      tokens.colors.primary.main,
                    fontFamily: tokens.fonts.display,
                    fontSize:   "0.78rem",
                    mb:         1,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    Step {t(step.num)}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.text.primary, fontWeight: 600, fontSize: "1.05rem", mb: 1 }}>
                    {t(step.title)}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.87rem", lineHeight: 1.65 }}>
                    {t(step.desc)}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Decorative separator ── */}
      <Box sx={{ py: { xs: 0, md: 0 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box className="gold-divider" sx={{ flex: 1 }} />
            <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: tokens.colors.primary.main, opacity: 0.5 }} />
            <Box className="gold-divider" sx={{ flex: 1 }} />
          </Box>
        </Container>
      </Box>

      {/* ── Location cards ── */}
      <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: tokens.colors.bg.surface }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 1.5 }}>
              {t("order.chooseLocation")}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3.2rem" },
                fontWeight: 400, textTransform: "uppercase", color: tokens.colors.text.primary,
                lineHeight: 0.95, letterSpacing: "-0.02em",
              }}
            >
              {t("order.twoLocations")}
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
                    border:       `1px solid ${hovered === loc.name ? tokens.colors.primary.main : tokens.colors.border.subtle}`,
                    borderRadius: tokens.radius.xl,
                    overflow:     "hidden",
                    bgcolor:      tokens.colors.bg.card,
                    transition:   `all ${tokens.transitions.spring}`,
                    transform:    hovered === loc.name ? "translateY(-8px) scale(1.01)" : "none",
                    boxShadow:    hovered === loc.name ? tokens.shadows.goldLg : tokens.shadows.sm,
                  }}
                >
                  {/* Image */}
                  <Box sx={{ height: { xs: 220, md: 260 }, overflow: "hidden", position: "relative" }}>
                    <Box
                      component="img"
                      src={loc.image}
                      alt={`${loc.name} location`}
                      loading="lazy"
                      sx={{
                        width: "100%", height: "100%", objectFit: "cover",
                        transition: `transform ${tokens.transitions.spring}, filter ${tokens.transitions.slow}`,
                        transform:  hovered === loc.name ? "scale(1.08)" : "scale(1)",
                        filter:     hovered === loc.name ? "contrast(1.1) saturate(1.2)" : "contrast(1.05) saturate(1.1)",
                      }}
                    />
                    {/* Cinematic overlay */}
                    <Box sx={{
                      position:   "absolute",
                      inset:      0,
                      background: "linear-gradient(to top, rgba(10,8,5,0.82) 0%, rgba(10,8,5,0.08) 55%, transparent 100%)",
                    }} />
                    {/* Location name on image */}
                    <Box sx={{
                      position: "absolute",
                      bottom: 20, left: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}>
                      <Typography sx={{
                        fontFamily:    tokens.fonts.display,
                        fontSize:      "2rem",
                        textTransform: "uppercase",
                        color:         "white",
                        letterSpacing: "-0.02em",
                        lineHeight:    1,
                        textShadow:    "0 2px 12px rgba(0,0,0,0.4)",
                      }}>
                        {loc.name}
                      </Typography>
                      {/* Gold accent line */}
                      <Box sx={{
                        width:      hovered === loc.name ? "60px" : "32px",
                        height:     "2px",
                        background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
                        transition: `width ${tokens.transitions.spring}`,
                      }} />
                    </Box>
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
                      className="btn-shimmer"
                      endIcon={<OpenInNewIcon sx={{ fontSize: "0.9rem !important", transition: "transform 0.25s ease" }} />}
                      sx={{
                        mt:         3,
                        fontWeight: 700,
                        color:      tokens.colors.bg.base,
                        fontSize:   "0.82rem",
                        py:         1.6,
                        background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                        "&:hover .MuiButton-endIcon": { transform: "translate(2px, -2px)" },
                      }}
                    >
                      {t("order.orderFrom", { name: loc.name })}
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
