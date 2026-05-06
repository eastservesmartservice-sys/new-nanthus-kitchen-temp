import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Box, IconButton, Button, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import LocationSelectionModal from "./LocationSelectionModal";

const navKeys = [
  { key: "home",     path: "/" },
  { key: "menu",     path: "/menu" },
  { key: "specials", path: "/specials" },
  { key: "gallery",  path: "/gallery" },
  { key: "order",    path: "/order" },
  { key: "catering", path: "/catering" },
  { key: "contact",  path: "/contact" },
];

const overlayVariants: Variants = {
  hidden:  { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
};

const linkAnim: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Header: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const isDarkHero = location.pathname === '/';

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ta" ? "en" : "ta");
  };

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close overlay on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1100,
          transition: `background-color 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease`,
          backgroundColor: scrolled
            ? "rgba(253,250,244,0.96)"
            : isDarkHero
              ? "transparent"
              : "rgba(253,250,244,0.88)",
          backdropFilter:  scrolled ? "blur(24px) saturate(180%)" : isDarkHero ? "none" : "blur(24px) saturate(180%)",
          borderBottom:    scrolled
            ? `1px solid ${tokens.colors.border.subtle}`
            : "1px solid transparent",
          boxShadow:       scrolled ? `${tokens.shadows.sm}, 0 1px 0 rgba(184,134,11,0.06)` : "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2.5, sm: 4, md: 5, lg: 8, xl: 10 },
            minHeight: { xs: 64, md: 72, lg: 76, xl: 84 },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            aria-label={t("header.logoAriaLabel")}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              transition: `transform ${tokens.transitions.spring}, opacity ${tokens.transitions.normal}`,
              "&:hover": { transform: "scale(1.03)" },
              "&:active": { opacity: 0.85 },
            }}
          >
            <Box
              component="img"
              src="/new_nanthus_kitchen_logo.png"
              alt={t("header.logoAlt")}
              sx={{
                height: { xs: 50, md: scrolled ? 50 : 60, xl: scrolled ? 56 : 68 },
                transition: "height 0.35s ease",
                display: "block",
              }}
            />
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box
              component="nav"
              aria-label={t("header.mainNav")}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              {navKeys.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  sx={{
                    position:      "relative",
                    color:         isActive(item.path)
                      ? tokens.colors.primary.main
                      : (!scrolled && isDarkHero)
                        ? tokens.colors.dark.textSecondary
                        : tokens.colors.text.secondary,
                    fontWeight:    isActive(item.path) ? 600 : 400,
                    fontSize:      { md: "0.72rem", lg: "0.78rem", xl: "0.84rem" },
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    px:            { md: 1.5, lg: 2 },
                    py:            1,
                    minHeight:     44,
                    borderRadius:  0,
                    overflow:      "hidden",
                    // Remove the default btn shimmer from nav links
                    "&::after": { display: "none" },
                    "&::before": {
                      content:      '""',
                      position:     "absolute",
                      bottom:       6,
                      left:         "50%",
                      transform:    "translateX(-50%)",
                      width:        isActive(item.path) ? "20px" : "0px",
                      height:       "1.5px",
                      background:   `linear-gradient(90deg, ${tokens.colors.primary.dark}, ${tokens.colors.primary.light}, ${tokens.colors.primary.dark})`,
                      borderRadius: "2px",
                      transition:   "width 0.32s cubic-bezier(0.22,1,0.36,1)",
                    },
                    "&:hover": {
                      color:           tokens.colors.primary.main,
                      backgroundColor: "transparent",
                      "&::before": { width: "20px" },
                    },
                  }}
                >
                  {t(`nav.${item.key}`)}
                </Button>
              ))}

              {/* Language toggle */}
              <Button
                onClick={toggleLang}
                sx={{
                  minWidth:      38,
                  minHeight:     34,
                  px:            1.2,
                  py:            0.5,
                  fontSize:      "0.68rem",
                  fontWeight:    700,
                  color:         (!scrolled && isDarkHero)
                    ? tokens.colors.dark.textSecondary
                    : tokens.colors.text.secondary,
                  letterSpacing: "0.05em",
                  borderRadius:  tokens.radius.pill,
                  border:        `1px solid ${tokens.colors.border.subtle}`,
                  "&::after": { display: "none" },
                  "&:hover": {
                    color:       tokens.colors.primary.main,
                    borderColor: tokens.colors.primary.main,
                    bgcolor:     tokens.colors.primary.glow,
                  },
                }}
              >
                {i18n.language === "ta" ? "EN" : "தமிழ்"}
              </Button>

              {/* Order CTA */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setLocationModalOpen(true)}
                className="btn-shimmer"
                sx={{
                  ml:            2,
                  px:            { md: 2.5, lg: 3, xl: 3.5 },
                  py:            0.9,
                  fontSize:      { md: "0.72rem", xl: "0.8rem" },
                  fontWeight:    700,
                  color:         tokens.colors.bg.base,
                  borderRadius:  tokens.radius.pill,
                  minHeight:     36,
                  letterSpacing: "0.1em",
                  background:    `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                  "&:hover": {
                    boxShadow: tokens.shadows.gold,
                    transform: "translateY(-2px)",
                    background: `linear-gradient(135deg, ${tokens.colors.primary.light} 0%, ${tokens.colors.primary.main} 100%)`,
                  },
                }}
              >
                {t("nav.orderNow")}
              </Button>
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <>
            <Button
              onClick={toggleLang}
              sx={{
                minWidth:   38,
                minHeight:  34,
                px:         1.2,
                py:         0.5,
                fontSize:   "0.68rem",
                fontWeight: 700,
                color:      (!scrolled && isDarkHero)
                  ? tokens.colors.dark.textSecondary
                  : tokens.colors.text.secondary,
                borderRadius: tokens.radius.pill,
                border:       `1px solid ${tokens.colors.border.subtle}`,
                mr:           0.75,
                "&::after": { display: "none" },
                "&:hover": {
                  color:       tokens.colors.primary.main,
                  borderColor: tokens.colors.primary.main,
                  bgcolor:     tokens.colors.primary.glow,
                },
              }}
            >
              {i18n.language === "ta" ? "EN" : "தமிழ்"}
            </Button>
            <IconButton
              aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              sx={{
              color:     (!scrolled && isDarkHero) ? tokens.colors.dark.textPrimary : tokens.colors.text.primary,
                zIndex:    1201,
                minWidth:  44,
                minHeight: 44,
                borderRadius: tokens.radius.sm,
                border: `1px solid transparent`,
                transition: tokens.transitions.normal,
                "&:hover": {
                  bgcolor: tokens.colors.primary.glow,
                  borderColor: tokens.colors.border.faint,
                },
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: open ? -90 : 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </AnimatePresence>
            </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* ── Full-screen mobile overlay ─────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("header.navMenu")}
            aria-modal="true"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position:        "fixed",
              inset:           0,
              zIndex:          1200,
              backgroundColor: "rgba(253,250,244,0.98)",
              backdropFilter:  "blur(28px) saturate(180%)",
              display:         "flex",
              flexDirection:   "column",
            }}
          >
            {/* Decorative gold glow */}
            <Box
              aria-hidden="true"
              sx={{
                position:      "absolute",
                top:           "-10%",
                right:         "-10%",
                width:         "60vw",
                height:        "60vw",
                borderRadius:  "50%",
                background:    "radial-gradient(ellipse at center, rgba(184,134,11,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <Box
              aria-hidden="true"
              sx={{
                position:      "absolute",
                bottom:        "5%",
                left:          "-15%",
                width:         "50vw",
                height:        "50vw",
                borderRadius:  "50%",
                background:    "radial-gradient(ellipse at center, rgba(184,134,11,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Logo row */}
            <Box
              sx={{
                px: { xs: 2.5, sm: 4 },
                pt: 2,
                minHeight: 76,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${tokens.colors.border.faint}`,
              }}
            >
              <Box
                component="img"
                src="/new_nanthus_kitchen_logo.png"
                alt={t("header.logoAlt")}
                sx={{ height: 54 }}
              />
              {/* Large gold close button */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: tokens.colors.text.tertiary,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  "&:hover": { color: tokens.colors.primary.main },
                  transition: tokens.transitions.fast,
                }}
                onClick={() => setOpen(false)}
              >
                Close
                <CloseIcon sx={{ fontSize: "1rem" }} />
              </Box>
            </Box>

            {/* Nav links */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 3, sm: 5 },
              }}
            >
              <motion.nav
                variants={stagger}
                initial="hidden"
                animate="visible"
                aria-label={t("header.mobileNav")}
              >
                {navKeys.map((item) => (
                  <motion.div key={item.path} variants={linkAnim}>
                    <Box
                      component={Link}
                      to={item.path}
                      onClick={() => { setOpen(false); }}
                      sx={{
                        display:        "block",
                        textDecoration: "none",
                        py:             { xs: 1.2, sm: 1.8 },
                        borderBottom:   `1px solid ${tokens.colors.border.faint}`,
                        "&:last-child": { borderBottom: "none" },
                        "&:focus-visible": {
                          outline:       `2px solid ${tokens.colors.primary.main}`,
                          outlineOffset: 4,
                        },
                        position: "relative",
                        overflow: "hidden",
                        // Hover line reveal
                        "&::after": {
                          content:    '""',
                          position:   "absolute",
                          left:       0,
                          bottom:     0,
                          width:      isActive(item.path) ? "100%" : "0%",
                          height:     "1px",
                          background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
                          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)",
                        },
                        "&:hover::after": { width: "100%" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Index number */}
                        <Typography
                          sx={{
                            fontFamily:    tokens.fonts.display,
                            fontSize:      { xs: "0.65rem", sm: "0.72rem" },
                            color:         tokens.colors.primary.main,
                            opacity:       0.5,
                            minWidth:      "1.5rem",
                          }}
                        >
                          {String(navKeys.indexOf(item) + 1).padStart(2, "0")}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily:    tokens.fonts.display,
                            fontSize:      { xs: "2.4rem", sm: "3rem" },
                            fontWeight:    400,
                            textTransform: "uppercase",
                            letterSpacing: "-0.02em",
                            lineHeight:    1.1,
                            color: isActive(item.path)
                              ? tokens.colors.primary.main
                              : tokens.colors.text.primary,
                            transition: "color 0.2s ease, letter-spacing 0.3s ease",
                            "&:hover": {
                              color:         tokens.colors.primary.main,
                              letterSpacing: "-0.01em",
                            },
                          }}
                        >
                          {t(`nav.${item.key}`)}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}

                {/* Order CTA */}
                <motion.div variants={linkAnim}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => { setOpen(false); setLocationModalOpen(true); }}
                    className="btn-shimmer"
                    sx={{
                      mt:            3,
                      px:            5,
                      py:            1.8,
                      fontSize:      "0.82rem",
                      fontWeight:    700,
                      color:         tokens.colors.bg.base,
                      borderRadius:  tokens.radius.pill,
                      letterSpacing: "0.1em",
                      background:    `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                      boxShadow:     tokens.shadows.gold,
                    }}
                  >
                    {t("nav.orderNow")}
                  </Button>
                </motion.div>
              </motion.nav>
            </Box>

            {/* Footer strip */}
            <Box
              sx={{
                px:        { xs: 3, sm: 5 },
                py:        3,
                borderTop: `1px solid ${tokens.colors.border.faint}`,
                display:   "flex",
                justifyContent: "space-between",
                flexWrap:  "wrap",
                gap:       1,
              }}
            >
              <Typography variant="caption" sx={{ color: tokens.colors.text.tertiary }}>
                newnanthuskitchen@gmail.com
              </Typography>
              <Typography variant="caption" sx={{ color: tokens.colors.text.disabled }}>
                {t("header.locations")}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <LocationSelectionModal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
    </>
  );
};

export default Header;
