import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Box, IconButton, Button, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { tokens } from "../theme";
import LocationSelectionModal from "./LocationSelectionModal";

const navItems = [
  { label: "Home",     path: "/" },
  { label: "Menu",     path: "/menu" },
  { label: "Specials", path: "/specials" },
  { label: "Gallery",  path: "/gallery" },
  { label: "Order",    path: "/order" },
  { label: "Catering", path: "/catering" },
  { label: "Contact",  path: "/contact" },
];

const overlayVariants: Variants = {
  hidden:  { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};

const linkAnim: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Header: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const isDarkHero = location.pathname === '/';

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
          transition: `background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, color 0.4s ease`,
          backgroundColor: scrolled
            ? "rgba(253,250,244,0.95)"
            : isDarkHero
              ? "transparent"
              : "rgba(253,250,244,0.82)",
          backdropFilter:  scrolled ? "blur(20px) saturate(160%)" : isDarkHero ? "none" : "blur(20px) saturate(160%)",
          borderBottom:    scrolled
            ? `1px solid ${tokens.colors.border.subtle}`
            : "1px solid transparent",
          boxShadow:       scrolled ? tokens.shadows.sm : "none",
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
            aria-label="New Nanthus Kitchen — Home"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <Box
              component="img"
              src="/new_nanthus_kitchen_logo.png"
              alt="New Nanthus Kitchen"
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
              aria-label="Main navigation"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              {navItems.map((item) => (
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
                    "&::after": {
                      content:    '""',
                      position:   "absolute",
                      bottom:     6,
                      left:       "50%",
                      transform:  "translateX(-50%)",
                      width:      isActive(item.path) ? "18px" : "0px",
                      height:     "1.5px",
                      background: tokens.colors.primary.main,
                      borderRadius: "2px",
                      transition: "width 0.28s ease",
                    },
                    "&:hover": {
                      color:           tokens.colors.primary.main,
                      backgroundColor: "transparent",
                      "&::after": { width: "18px" },
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Order CTA */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setLocationModalOpen(true)}
                sx={{
                  ml:            1.5,
                  px:            { md: 2.5, lg: 3, xl: 3.5 },
                  py:            0.9,
                  fontSize:      { md: "0.72rem", xl: "0.8rem" },
                  fontWeight:    700,
                  color:         tokens.colors.bg.base,
                  borderRadius:  tokens.radius.pill,
                  minHeight:     36,
                  letterSpacing: "0.1em",
                  "&:hover": {
                    boxShadow: tokens.shadows.gold,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Order Now
              </Button>
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              sx={{
              color:     (!scrolled && isDarkHero) ? tokens.colors.dark.textPrimary : tokens.colors.text.primary,
                zIndex:    1201,
                minWidth:  44,
                minHeight: 44,
                "&:hover": { bgcolor: tokens.colors.primary.glow },
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: open ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </AnimatePresence>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* ── Full-screen mobile overlay ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position:        "fixed",
              inset:           0,
              zIndex:          1200,
              backgroundColor: "rgba(253,250,244,0.97)",
              backdropFilter:  "blur(24px)",
              display:         "flex",
              flexDirection:   "column",
            }}
          >
            {/* Logo row */}
            <Box
              sx={{
                px: { xs: 2.5, sm: 4 },
                pt: 2,
                minHeight: 76,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/new_nanthus_kitchen_logo.png"
                alt="New Nanthus Kitchen"
                sx={{ height: 54 }}
              />
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
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={linkAnim}>
                    <Box
                      component={Link}
                      to={item.path}
                      onClick={() => { setOpen(false); navigate(item.path); }}
                      sx={{
                        display:        "block",
                        textDecoration: "none",
                        py:             { xs: 1.5, sm: 2 },
                        borderBottom:   `1px solid ${tokens.colors.border.faint}`,
                        "&:last-child": { borderBottom: "none" },
                        "&:focus-visible": {
                          outline:       `2px solid ${tokens.colors.primary.main}`,
                          outlineOffset: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily:    tokens.fonts.display,
                          fontSize:      { xs: "2.8rem", sm: "3.5rem" },
                          fontWeight:    400,
                          textTransform: "uppercase",
                          letterSpacing: "-0.01em",
                          lineHeight:    1.1,
                          color: isActive(item.path)
                            ? tokens.colors.primary.main
                            : tokens.colors.text.primary,
                          transition: "color 0.2s ease",
                          "&:hover": { color: tokens.colors.primary.main },
                        }}
                      >
                        {item.label}
                      </Typography>
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
                    sx={{
                      mt:            3,
                      px:            5,
                      py:            1.8,
                      fontSize:      "0.82rem",
                      fontWeight:    700,
                      color:         tokens.colors.bg.base,
                      borderRadius:  tokens.radius.pill,
                      letterSpacing: "0.1em",
                    }}
                  >
                    Order Now
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
                Markham · Scarborough
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
