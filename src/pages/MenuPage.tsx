import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Box, Container, Typography, Button, Chip, useMediaQuery, useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import PageBanner from "../components/PageBanner";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

interface MenuItem { name: string; price: string; popular?: boolean; }
interface MenuCategory { category: string; subtitle?: string; items: MenuItem[]; }

const menuData: MenuCategory[] = [
  { category: "Kothu", items: [
    { name: "Chicken Kothu",  price: "$12 | NS $14", popular: true },
    { name: "Mutton Kothu",   price: "$12 | NS $15" },
    { name: "Beef Kothu",     price: "$12 | NS $15" },
    { name: "Veggie Kothu",   price: "$10" },
    { name: "Egg Kothu",      price: "$10" },
    { name: "Dolphin Kothu",  price: "$14 | NS $16" },
    { name: "Seafood Kothu",  price: "$14 | NS $16" },
    { name: "Fish Kothu",     price: "$14 | NS $16" },
    { name: "Cheese Kothu",   price: "$15", popular: true },
  ]},
  { category: "Grilled", subtitle: "menu.includesRice", items: [
    { name: "Chicken Breast Skewer", price: "$15" },
    { name: "Chicken Dark Skewer",   price: "$15" },
    { name: "Lamb Skewer",           price: "$16" },
    { name: "Lamb Chop (4pc)",       price: "$18", popular: true },
    { name: "Chicken Shawarma",      price: "$15" },
    { name: "Beef Shawarma",         price: "$15" },
    { name: "Beef Skewers",          price: "$16" },
  ]},
  { category: "Chicken Dishes", items: [
    { name: "Chicken Devil",         price: "$15", popular: true },
    { name: "Chicken 65",            price: "$15", popular: true },
    { name: "Chili Chicken",         price: "$15" },
    { name: "Tandoori Leg",          price: "$4" },
    { name: "Butter Chicken",        price: "$16", popular: true },
    { name: "Chicken Curry",         price: "M $9 | L $15" },
    { name: "Chicken + Mix Veg",     price: "$15" },
    { name: "Chicken Tikka Masala",  price: "$15" },
    { name: "Jaffna Style Kozhi Pukkai", price: "$12" },
  ]},
  { category: "Seafood Dishes", items: [
    { name: "Mix Seafood Devil",             price: "$18", popular: true },
    { name: "Shrimp Devil",                  price: "$17" },
    { name: "Squid Devil",                   price: "$17" },
    { name: "Chili With Shrimp & Calamari", price: "$18" },
    { name: "Fried Calamari",               price: "$16" },
  ]},
  { category: "Beef Dishes", items: [
    { name: "Beef Devil",        price: "$16", popular: true },
    { name: "Chili Beef",        price: "$16" },
    { name: "Beef Pepper Fried", price: "$15" },
    { name: "Garlic Beef + Veg", price: "$15" },
  ]},
  { category: "Lamb Dishes", items: [
    { name: "Lamb Curry (Jaffna Style)", price: "M $10 | L $16", popular: true },
  ]},
  { category: "Biryani", items: [
    { name: "Chicken Biryani", price: "$15", popular: true },
    { name: "Mutton Biryani",  price: "$16" },
    { name: "Fish Biryani",    price: "$17" },
    { name: "Seafood Biryani", price: "$17" },
    { name: "Veggie Biryani",  price: "$14" },
  ]},
  { category: "Fried Rice", items: [
    { name: "Chicken Fried Rice",     price: "$15" },
    { name: "Beef Fried Rice",        price: "$16" },
    { name: "Seafood Fried Rice",     price: "$17" },
    { name: "Veggie Fried Rice",      price: "$13" },
    { name: "Shawarma Fried Rice",    price: "$15", popular: true },
    { name: "Nasi Goreng Fried Rice", price: "$15" },
  ]},
  { category: "Noodles", items: [
    { name: "Chicken Noodles",           price: "$15" },
    { name: "Beef Noodles",              price: "$16" },
    { name: "Seafood Noodles",           price: "$17" },
    { name: "Veggie Noodles",            price: "$12" },
    { name: "Nanthu's Special Noodles",  price: "$20", popular: true },
    { name: "Chicken & Shrimp Noodles",  price: "$17" },
    { name: "Seafood & Chicken Noodles", price: "$18" },
  ]},
  { category: "Pasta", items: [
    { name: "Chicken & Shrimp Pasta",         price: "$17" },
    { name: "Chicken Pasta",                   price: "$15" },
    { name: "Chicken, Shrimp, Sausage Pasta",  price: "$18", popular: true },
    { name: "Seafood Pasta",                   price: "$17" },
    { name: "Shrimp & Sausage Pasta",          price: "$17" },
    { name: "Veggie Pasta",                    price: "$13" },
  ]},
  { category: "Poutines", items: [
    { name: "Chicken Shawarma Poutine", price: "$14", popular: true },
    { name: "Beef Shawarma Poutine",    price: "$15" },
    { name: "Jaffna Style Poutine",     price: "$14" },
  ]},
  { category: "Short Eats", items: [
    { name: "Mutton Rolls",     price: "$1.75", popular: true },
    { name: "Chicken Rolls",    price: "$1.75", popular: true },
    { name: "Veggie Rolls",     price: "$1.50" },
    { name: "Paruthurai Vadai", price: "$0.75" },
    { name: "Fish Cutlet",      price: "$1" },
    { name: "Chicken Samosa",   price: "$1" },
    { name: "Mutton Samosa",    price: "$1" },
    { name: "Veg Samosa (3)",   price: "$2" },
    { name: "Spring Rolls (3)", price: "$1" },
    { name: "Laddu",            price: "$5" },
    { name: "Cake Box",         price: "$7 | $13" },
  ]},
  { category: "Jaffna Specialties", items: [
    { name: "Banana Leaf - Chicken",     price: "$16", popular: true },
    { name: "Banana Leaf - Veggie",      price: "$14" },
    { name: "Banana Leaf - Mutton",      price: "$17" },
    { name: "Banana Leaf - Any Seafood", price: "$17" },
    { name: "Banana Leaf - All Seafood", price: "$25" },
    { name: "Lamprais",                  price: "$17", popular: true },
    { name: "Veggie Puttu",              price: "$10" },
    { name: "Seafood Puttu",             price: "$14" },
    { name: "Veggie Idiyappam",          price: "$10" },
    { name: "Seafood Idiyappam",         price: "$14" },
    { name: "Roti",                      price: "$1.50" },
    { name: "Lemon Rice",                price: "$12" },
    { name: "Seafood Combo",             price: "$25" },
    { name: "Jaffna Style Kool",         price: "$12", popular: true },
  ]},
  { category: "Sandwiches", items: [
    { name: "Chicken Shawarma with Pop", price: "$10" },
    { name: "Beef Shawarma with Pop",    price: "$12" },
    { name: "Falafel Sandwich",          price: "$8" },
    { name: "Chicken Shawarma Wrap",     price: "$13", popular: true },
    { name: "Beef Shawarma Wrap",        price: "$15" },
  ]},
  { category: "Kids Menu", items: [
    { name: "Chicken Fingers & Fries (3pc)", price: "$10" },
    { name: "Kids Chicken Pasta",            price: "$10" },
    { name: "Kids Chicken Shawarma",         price: "$8.99" },
    { name: "Kids Beef Shawarma",            price: "$8.99" },
    { name: "Fish & Chips (2pc)",            price: "$12" },
  ]},
  { category: "Drinks", items: [
    { name: "Tea",          price: "$1.75" },
    { name: "Water",        price: "$1.50" },
    { name: "Soft Drinks",  price: "$2" },
    { name: "Mango Can",    price: "$2.50" },
    { name: "Pineapple",    price: "$2.50" },
    { name: "Apple Juice",  price: "$2.50" },
    { name: "Orange Juice", price: "$2.50" },
    { name: "Necto",        price: "$2.75" },
  ]},
];

const MenuPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  // Intersection observer — works on both mobile and desktop
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("data-category") ?? "");
            break;
          }
        }
      },
      { rootMargin: isMobile ? "-15% 0px -75% 0px" : "-20% 0px -70% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!isMobile || !tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector(`[data-cat="${activeCategory}"]`);
    if (activeBtn) {
      (activeBtn as HTMLElement).scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory, isMobile]);

  const scrollToCategory = useCallback((category: string) => {
    setActiveCategory(category);
    const el = sectionRefs.current[category];
    if (el) {
      const navHeight = isMobile ? 64 + 52 : 96;
      const offset = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, [isMobile]);

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base, minHeight: "100vh" }}>
      <PageBanner
        eyebrow={t("menu.eyebrow")}
        title={t("menu.title")}
        highlight={t("menu.highlight")}
        subtitle={t("menu.subtitle")}
        watermark={t("menu.watermark")}
      />

      {/* ── Mobile sticky category tabs ── */}
      {isMobile && (
        <Box
          ref={tabsRef}
          sx={{
            position:     "sticky",
            top:          64,
            zIndex:       50,
            bgcolor:      tokens.colors.bg.base,
            borderBottom: `1px solid ${tokens.colors.border.faint}`,
            overflowX:    "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            boxShadow: `0 4px 16px rgba(0,0,0,0.06)`,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, px: 2.5, py: 1.5, minWidth: "max-content" }}>
            {menuData.map((cat) => (
              <Box
                key={cat.category}
                component="button"
                data-cat={cat.category}
                onClick={() => scrollToCategory(cat.category)}
                sx={{
                  background:   activeCategory === cat.category
                    ? `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`
                    : "transparent",
                  border:       `1px solid ${activeCategory === cat.category ? tokens.colors.primary.main : tokens.colors.border.subtle}`,
                  borderRadius: tokens.radius.pill,
                  color:        activeCategory === cat.category ? tokens.colors.bg.base : tokens.colors.text.secondary,
                  cursor:       "pointer",
                  fontSize:     "0.7rem",
                  fontWeight:   600,
                  letterSpacing:"0.04em",
                  px:           "14px",
                  py:           "7px",
                  whiteSpace:   "nowrap",
                  transition:   `all ${tokens.transitions.normal}`,
                  flexShrink:   0,
                  boxShadow:    activeCategory === cat.category ? tokens.shadows.gold : "none",
                  "&:active":   { opacity: 0.8 },
                }}
              >
                {cat.category}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ── Main layout ── */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 10 }, px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>
        <Box sx={{ display: "flex", gap: { xs: 0, md: 6, lg: 8 }, alignItems: "flex-start" }}>

          {/* Desktop sticky sidebar */}
          {!isMobile && (
            <Box
              component="nav"
              aria-label={t("menu.categories")}
              sx={{
                width:      { md: 220, lg: 260, xl: 280 },
                flexShrink: 0,
                position:   "sticky",
                top:        96,
                maxHeight:  "calc(100vh - 120px)",
                overflowY:  "auto",
                pr:         2,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {/* Sidebar header */}
              <Typography
                variant="overline"
                sx={{
                  color:         tokens.colors.primary.main,
                  display:       "block",
                  mb:            2,
                  letterSpacing: "0.2em",
                  fontSize:      "0.62rem",
                  pl:            2,
                }}
              >
                {t("menu.categories")}
              </Typography>

              {menuData.map((cat, i) => (
                <Box
                  key={cat.category}
                  component="button"
                  onClick={() => scrollToCategory(cat.category)}
                  sx={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                    width:          "100%",
                    background:     "none",
                    border:         "none",
                    cursor:         "pointer",
                    textAlign:      "left",
                    px:             2,
                    py:             1.1,
                    mb:             0.4,
                    borderRadius:   tokens.radius.sm,
                    position:       "relative",
                    overflow:       "hidden",
                    // Left accent bar
                    "&::before": {
                      content:      '""',
                      position:     "absolute",
                      left:         0,
                      top:          "20%",
                      height:       "60%",
                      width:        activeCategory === cat.category ? "3px" : "0px",
                      background:   `linear-gradient(180deg, ${tokens.colors.primary.light}, ${tokens.colors.primary.dark})`,
                      borderRadius: "0 2px 2px 0",
                      transition:   `width 0.25s cubic-bezier(0.22,1,0.36,1)`,
                    },
                    bgcolor:        activeCategory === cat.category
                      ? `rgba(184,134,11,0.07)`
                      : "transparent",
                    transition:     `all ${tokens.transitions.fast}`,
                    "&:hover": {
                      bgcolor: `rgba(184,134,11,0.05)`,
                      "&::before": { width: "3px" },
                    },
                    "&:focus-visible": { outline: `2px solid ${tokens.colors.primary.main}`, outlineOffset: 2 },
                  }}
                >
                  <Typography sx={{
                    fontSize:   "0.82rem",
                    fontWeight: activeCategory === cat.category ? 600 : 400,
                    color:      activeCategory === cat.category ? tokens.colors.primary.main : tokens.colors.text.tertiary,
                    transition: tokens.transitions.fast,
                    lineHeight: 1.3,
                  }}>
                    {cat.category}
                  </Typography>
                  <Typography sx={{
                    fontSize:   "0.62rem",
                    color:      activeCategory === cat.category ? tokens.colors.primary.main : tokens.colors.text.disabled,
                    opacity:    activeCategory === cat.category ? 0.8 : 0.5,
                    flexShrink: 0,
                    ml:         1,
                    fontFamily: tokens.fonts.display,
                    transition: tokens.transitions.fast,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${tokens.colors.border.faint}` }}>
                <Button
                  component={Link}
                  to="/order"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="btn-shimmer"
                  sx={{
                    fontWeight: 700,
                    color:      tokens.colors.bg.base,
                    fontSize:   "0.72rem",
                    background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                  }}
                >
                  {t("nav.orderNow")}
                </Button>
              </Box>
            </Box>
          )}

          {/* Menu content */}
          <Box ref={contentRef} sx={{ flex: 1, minWidth: 0 }}>
            {menuData.map((cat, catIdx) => (
              <Box
                key={cat.category}
                ref={(el) => { sectionRefs.current[cat.category] = el as HTMLElement; }}
                data-category={cat.category}
                component="section"
                aria-labelledby={`cat-${cat.category}`}
                sx={{ mb: { xs: 5, md: 10 } }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Category heading */}
                  <Box sx={{
                    display:      "flex",
                    alignItems:   "baseline",
                    gap:          2,
                    mb:           { xs: 2, md: 3 },
                    pb:           { xs: 1.5, md: 2 },
                    borderBottom: `1px solid ${tokens.colors.border.faint}`,
                    position:     "relative",
                  }}>
                    {/* Gold accent line */}
                    <Box sx={{
                      width:      "3px",
                      height:     "1.6em",
                      background: `linear-gradient(180deg, ${tokens.colors.primary.light}, ${tokens.colors.primary.dark})`,
                      borderRadius: "2px",
                      flexShrink: 0,
                      alignSelf:  "center",
                      boxShadow:  `0 0 8px rgba(184,134,11,0.4)`,
                    }} />
                    <Typography
                      id={`cat-${cat.category}`}
                      component="h2"
                      sx={{
                        fontFamily:    tokens.fonts.display,
                        fontSize:      { xs: "1.4rem", md: "2rem" },
                        fontWeight:    400,
                        textTransform: "uppercase",
                        color:         tokens.colors.text.primary,
                        lineHeight:    1,
                      }}
                    >
                      {cat.category}
                    </Typography>
                    <Typography sx={{
                      color:      tokens.colors.primary.main,
                      fontFamily: tokens.fonts.display,
                      fontSize:   "0.72rem",
                      opacity:    0.5,
                    }}>
                      {String(catIdx + 1).padStart(2, "0")}
                    </Typography>
                  </Box>

                  {cat.subtitle && (
                    <Typography sx={{
                      color:     tokens.colors.primary.main,
                      fontSize:  "0.8rem",
                      fontStyle: "italic",
                      mb:        { xs: 1.5, md: 2 },
                      opacity:   0.8,
                    }}>
                      {t(cat.subtitle)}
                    </Typography>
                  )}

                  {/* Items */}
                  {cat.items.map((item, itemIdx) => (
                    <Box
                      key={itemIdx}
                      sx={{
                        display:       "flex",
                        alignItems:    "center",
                        justifyContent:"space-between",
                        gap:           1.5,
                        py:            { xs: 1.4, md: 1.6 },
                        borderBottom:  `1px solid ${tokens.colors.border.faint}`,
                        px:            { xs: 1, md: 1.5 },
                        mx:            { xs: -1, md: -1.5 },
                        borderRadius:  tokens.radius.xs,
                        transition:    `background-color ${tokens.transitions.fast}`,
                        "&:hover":     { bgcolor: "rgba(184,134,11,0.04)" },
                        "&:last-child":{ borderBottom: "none" },
                      }}
                    >
                      {/* Name + badge */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flex: 1, minWidth: 0 }}>
                        <Typography sx={{
                          color:     tokens.colors.text.primary,
                          fontSize:  { xs: "0.85rem", md: "0.95rem" },
                          lineHeight: 1.4,
                          flexShrink: 1,
                          minWidth:   0,
                        }}>
                          {item.name}
                        </Typography>
                        {item.popular && (
                          <Chip
                            icon={<LocalFireDepartmentIcon sx={{ fontSize: "0.7rem !important", color: `${tokens.colors.primary.main} !important` }} />}
                            label={t("menu.popular")}
                            size="small"
                            sx={{
                              bgcolor:      "rgba(184,134,11,0.10)",
                              color:        tokens.colors.primary.main,
                              fontWeight:   700,
                              fontSize:     "0.5rem",
                              height:       18,
                              border:       `1px solid rgba(184,134,11,0.25)`,
                              borderRadius: tokens.radius.xs,
                              flexShrink:   0,
                              "& .MuiChip-label": { px: 0.7 },
                              "& .MuiChip-icon":  { ml: "6px" },
                            }}
                          />
                        )}
                      </Box>

                      {/* Dot separator */}
                      <Box sx={{
                        flex:       1,
                        maxWidth:   80,
                        height:     "1px",
                        background: `repeating-linear-gradient(90deg, ${tokens.colors.border.faint} 0, ${tokens.colors.border.faint} 3px, transparent 3px, transparent 8px)`,
                        display:    { xs: "none", sm: "block" },
                      }} />

                      {/* Price */}
                      <Typography sx={{
                        color:      tokens.colors.primary.main,
                        fontFamily: tokens.fonts.display,
                        fontSize:   { xs: "0.85rem", md: "0.95rem" },
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        fontWeight: 500,
                      }}>
                        {item.price}
                      </Typography>
                    </Box>
                  ))}
                </motion.div>
              </Box>
            ))}

            {/* Bottom CTA */}
            <Box sx={{
              textAlign:  "center",
              py:         { xs: 6, md: 8 },
              borderTop:  `1px solid ${tokens.colors.border.faint}`,
              position:   "relative",
              overflow:   "hidden",
              bgcolor:    tokens.colors.bg.surface,
              borderRadius: tokens.radius.lg,
              px:         3,
            }}>
              {/* Subtle background pattern */}
              <Box
                aria-hidden="true"
                sx={{
                  position:        "absolute",
                  inset:           0,
                  backgroundImage: `radial-gradient(circle, rgba(184,134,11,0.08) 1px, transparent 1px)`,
                  backgroundSize:  "24px 24px",
                  opacity:         0.5,
                  pointerEvents:   "none",
                }}
              />
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 1.5 }}>
                  {t("menu.seenSomething")}
                </Typography>
                <Button
                  component={Link}
                  to="/order"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="btn-shimmer"
                  sx={{
                    px:         5,
                    py:         1.7,
                    fontWeight: 700,
                    color:      tokens.colors.bg.base,
                    fontSize:   "0.85rem",
                    background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                  }}
                >
                  {t("menu.orderForPickup")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

    </Box>
  );
};

export default MenuPage;
