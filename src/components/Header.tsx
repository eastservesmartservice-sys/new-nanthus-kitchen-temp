import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useTranslation } from "react-i18next";
import { contactEmail, locations, logoImage, logoImageSrcSet, navLinks } from "../data/site";
import { tokens } from "../theme";
import LocationSelectionModal from "./LocationSelectionModal";
import MenuLocationModal from "./MenuLocationModal";

const navLabels: Record<string, string> = {
  home: "Home",
  menu: "Menu",
  specials: "Specials",
  gallery: "Gallery",
  order: "Order",
  catering: "Catering",
  contact: "Contact",
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const { t } = useTranslation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: "rgba(251,250,246,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${tokens.colors.line.subtle}`,
        }}
      >
        {/* ── Top info bar ──────────────────────────────────────────── */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            px: { md: 4, lg: 6 },
            py: 1.25,
            bgcolor: tokens.colors.bg.inverse,
            color: tokens.colors.dark.textTertiary,
            fontSize: "0.74rem",
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Box
              component="a"
              href={`mailto:${contactEmail}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap",
                transition: tokens.transitions.fast,
                "&:hover": { color: tokens.colors.primary.main },
              }}
            >
              {contactEmail}
            </Box>
          </Stack>
          <Stack direction="row" gap={2.5} alignItems="center">
            {locations.map((item) => (
              <Box
                key={item.id}
                component="a"
                href={item.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  textDecoration: "none",
                  color: "inherit",
                  transition: tokens.transitions.fast,
                  "&:hover": { color: tokens.colors.primary.main },
                }}
              >
                <LocationOnOutlinedIcon sx={{ fontSize: "0.85rem" }} />
                {item.name}
              </Box>
            ))}
          </Stack>
        </Box>

        {/* ── Main nav bar ──────────────────────────────────────────── */}
        <Box
          sx={{
            height: { xs: 68, md: 72 },
            px: { xs: 2, sm: 3, lg: 6 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            <Box
              component="img"
              src={logoImage}
              srcSet={logoImageSrcSet}
              sizes="(max-width: 600px) 54px, 62px"
              alt={t("header.logoAlt")}
              loading="eager"
              decoding="async"
              sx={{ height: { xs: 54, md: 62 }, width: "auto", objectFit: "contain" }}
            />
          </Box>

          {/* Desktop nav links */}
          {isDesktop && (
            <Stack
              component="nav"
              direction="row"
              gap={0}
              sx={{ flex: 1, justifyContent: "center" }}
            >
              {navLinks.map((item) => {
                const active = isActive(item.path);
                const isMenu = item.key === "menu";
                const sharedSx = {
                  position: "relative",
                  px: 1.75,
                  py: 0.75,
                  fontSize: "0.84rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? tokens.colors.text.primary : tokens.colors.text.secondary,
                  textDecoration: "none",
                  letterSpacing: 0,
                  transition: tokens.transitions.fast,
                  borderRadius: tokens.radius.sm,
                  cursor: "pointer",
                  "&:hover": { color: tokens.colors.text.primary },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -1,
                    left: "50%",
                    transform: active ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    width: "70%",
                    height: "2px",
                    bgcolor: tokens.colors.primary.main,
                    borderRadius: "2px",
                    transition: "transform 0.25s ease",
                  },
                  "&:hover::after": { transform: "translateX(-50%) scaleX(1)" },
                };

                if (isMenu) {
                  return (
                    <Box
                      key={item.path}
                      component="button"
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(true)}
                      sx={{ background: "none", border: "none", ...sharedSx }}
                    >
                      {navLabels[item.key] ?? item.key}
                    </Box>
                  );
                }

                return (
                  <Box
                    key={item.path}
                    component={Link}
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    sx={sharedSx}
                  >
                    {navLabels[item.key] ?? item.key}
                  </Box>
                );
              })}
            </Stack>
          )}

          {/* Right actions */}
          <Stack direction="row" gap={1} alignItems="center" sx={{ flexShrink: 0 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={() => setOrderOpen(true)}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: tokens.colors.primary.main,
                color: tokens.colors.text.primary,
                fontWeight: 700,
                "&:hover": { bgcolor: tokens.colors.primary.light },
              }}
            >
              {t("nav.orderNow")}
            </Button>
            {!isDesktop && (
              <IconButton
                aria-label={drawerOpen ? t("header.closeMenu") : t("header.openMenu")}
                onClick={() => setDrawerOpen(true)}
                sx={{
                  border: `1px solid ${tokens.colors.line.light}`,
                  borderRadius: tokens.radius.md,
                  "&:hover": { bgcolor: tokens.colors.bg.warm },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Box>
      </Box>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            bgcolor: tokens.colors.bg.inverse,
            borderRadius: 0,
          },
        }}
      >
        <Stack sx={{ height: "100%" }}>
          {/* Drawer header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 3,
              py: 2.5,
              borderBottom: `1px solid ${tokens.colors.dark.borderSubtle}`,
            }}
          >
            <Box
              component="img"
              src={logoImage}
              srcSet={logoImageSrcSet}
              sizes="48px"
              alt={t("header.logoAlt")}
              loading="eager"
              decoding="async"
              sx={{ height: 48, filter: "invert(1) hue-rotate(180deg)" }}
            />
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label={t("header.closeMenu")}
              sx={{
                color: tokens.colors.dark.textPrimary,
                border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                borderRadius: tokens.radius.md,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Nav links */}
          <Stack component="nav" gap={0} sx={{ px: 2, pt: 2, flex: 1 }}>
            {navLinks.map((item) => {
              const active = isActive(item.path);
              const isMenu = item.key === "menu";
              const sharedDrawerSx = {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                borderRadius: tokens.radius.lg,
                textDecoration: "none",
                color: active ? tokens.colors.dark.textPrimary : tokens.colors.dark.textSecondary,
                bgcolor: active ? tokens.colors.dark.surface : "transparent",
                fontWeight: active ? 700 : 500,
                fontSize: "1rem",
                transition: tokens.transitions.fast,
                borderLeft: active ? `3px solid ${tokens.colors.primary.main}` : "3px solid transparent",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: tokens.colors.dark.surface,
                  color: tokens.colors.dark.textPrimary,
                },
              };

              const label = (
                <>
                  <Typography sx={{ fontWeight: "inherit", fontSize: "inherit", color: "inherit" }}>
                    {navLabels[item.key] ?? item.key}
                  </Typography>
                  {active && (
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: tokens.colors.primary.main, flexShrink: 0 }} />
                  )}
                </>
              );

              if (isMenu) {
                return (
                  <Box
                    key={item.path}
                    component="button"
                    aria-current={active ? "page" : undefined}
                    onClick={() => { setDrawerOpen(false); setMenuOpen(true); }}
                    sx={{ background: "none", border: "none", width: "100%", textAlign: "left", ...sharedDrawerSx }}
                  >
                    {label}
                  </Box>
                );
              }

              return (
                <Box
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  aria-current={active ? "page" : undefined}
                  sx={sharedDrawerSx}
                >
                  {label}
                </Box>
              );
            })}
          </Stack>

          {/* Drawer footer */}
          <Stack
            gap={1.5}
            sx={{
              px: 3,
              py: 3,
              borderTop: `1px solid ${tokens.colors.dark.borderSubtle}`,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBagOutlinedIcon />}
              fullWidth
              onClick={() => {
                setDrawerOpen(false);
                setOrderOpen(true);
              }}
              sx={{
                bgcolor: tokens.colors.primary.main,
                color: tokens.colors.text.primary,
                fontWeight: 700,
                "&:hover": { bgcolor: tokens.colors.primary.light },
              }}
            >
              {t("nav.orderNow")}
            </Button>
            <Stack direction="row" gap={2} justifyContent="center" sx={{ pt: 0.5 }}>
              {locations.map((loc) => (
                <Box
                  key={loc.id}
                  component="a"
                  href={`tel:${loc.phones[0]?.replace(/\D/g, "")}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.3,
                    textDecoration: "none",
                    flex: 1,
                    p: 1.5,
                    borderRadius: tokens.radius.md,
                    border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                    "&:hover": { borderColor: tokens.colors.dark.borderLight },
                  }}
                >
                  <Typography sx={{ color: tokens.colors.primary.main, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {loc.name}
                  </Typography>
                  <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.8rem" }}>
                    {loc.phones[0]}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Drawer>

      <LocationSelectionModal open={orderOpen} onClose={() => setOrderOpen(false)} />
      <MenuLocationModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
