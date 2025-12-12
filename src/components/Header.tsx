import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../theme";

const navItems = [
  { label: "HOME", sectionId: "hero" },
  { label: "MENU", sectionId: "menu" },
  { label: "SPECIALS", sectionId: "special" },
  { label: "ORDER", sectionId: "take-away" },
  { label: "CATERING", sectionId: "catering" },
  { label: "CONTACT", sectionId: "contact" },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      for (const { sectionId } of navItems) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    if (mobileOpen) setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: tokens.colors.neutral.black,
        height: "100%",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          component="img"
          src="/new_nanthus_kitchen_logo.png"
          alt="New Nanthus Kitchen - Home"
          sx={{ height: 80 }}
        />
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="Close navigation menu"
          sx={{ color: "white", minWidth: 44, minHeight: 44 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List component="nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => scrollToSection(item.sectionId)}
              sx={{
                py: 2,
                borderRadius: 1,
                minHeight: 48,
                bgcolor:
                  activeSection === item.sectionId
                    ? "rgba(255,207,64,0.1)"
                    : "transparent",
                borderLeft:
                  activeSection === item.sectionId
                    ? `3px solid ${tokens.colors.primary.main}`
                    : "3px solid transparent",
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    color:
                      activeSection === item.sectionId
                        ? "primary.main"
                        : "white",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: "auto",
          pt: 4,
          borderTop: `1px solid ${tokens.colors.border.light}`,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: tokens.colors.text.tertiary, mb: 1 }}
        >
          newnanthuskitchen@gmail.com
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: tokens.colors.text.disabled }}
        >
          © {new Date().getFullYear()} New Nanthus Kitchen
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        elevation={0}
        sx={{
          transition: tokens.transitions.normal,
          backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled
            ? `1px solid ${tokens.colors.border.subtle}`
            : "none",
          zIndex: 1100,
          py: isScrolled ? 0.5 : 1.5,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, lg: 6 },
            minHeight: { xs: 64, md: 72 },
          }}
        >
          <Box
            component="a"
            href="#hero"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            aria-label="New Nanthus Kitchen - Go to home"
          >
            <Box
              component="img"
              src="/new_nanthus_kitchen_logo.png"
              alt="New Nanthus Kitchen"
              sx={{
                height: { xs: 52, sm: 56, md: isScrolled ? 52 : 64 },
                transition: "height 0.3s ease",
                display: "block",
              }}
            />
          </Box>

          {isMobile ? (
            <IconButton
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={handleDrawerToggle}
              sx={{
                color: "white",
                minWidth: 44,
                minHeight: 44,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box
              component="nav"
              aria-label="Main navigation"
              sx={{
                display: "flex",
                gap: { md: 1, lg: 2 },
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  aria-current={
                    activeSection === item.sectionId ? "page" : undefined
                  }
                  sx={{
                    color:
                      activeSection === item.sectionId
                        ? "primary.main"
                        : "white",
                    fontWeight: 600,
                    fontSize: { md: "0.7rem", lg: "0.8rem" },
                    letterSpacing: "0.08em",
                    px: { md: 1.5, lg: 2 },
                    py: 1,
                    minHeight: 44,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 8,
                      left: "50%",
                      width: activeSection === item.sectionId ? "30px" : "0px",
                      height: "2px",
                      backgroundColor: "primary.main",
                      transform: "translateX(-50%)",
                      transition:
                        "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      borderRadius: "2px",
                      boxShadow:
                        activeSection === item.sectionId
                          ? "0 0 8px rgba(255, 207, 64, 0.6), 0 0 16px rgba(255, 207, 64, 0.3)"
                          : "none",
                    },
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                      "&::after": {
                        width: "30px",
                        boxShadow:
                          "0 0 8px rgba(255, 207, 64, 0.6), 0 0 16px rgba(255, 207, 64, 0.3)",
                      },
                    },
                    "&:focus-visible": {
                      outline: `2px solid ${tokens.colors.primary.main}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        id="mobile-navigation"
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "100%", sm: 320 },
            bgcolor: tokens.colors.neutral.black,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
