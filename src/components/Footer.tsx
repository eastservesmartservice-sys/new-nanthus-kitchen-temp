import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { SiTiktok } from "react-icons/si";
import { tokens } from "../theme";

const navLinks = [
  { label: "Home",     path: "/" },
  { label: "Menu",     path: "/menu" },
  { label: "Specials", path: "/specials" },
  { label: "Order",    path: "/order" },
  { label: "Catering", path: "/catering" },
  { label: "Contact",  path: "/contact" },
];

const socialLinks = [
  { icon: <FacebookIcon />,      label: "Facebook",  url: "https://www.facebook.com/share/1HHiP73yE2/?mibextid=wwXIfr" },
  { icon: <InstagramIcon />,     label: "Instagram", url: "https://www.instagram.com/newnanthuskitchen?igsh=MXRrcHR4aDlqNXFveQ==" },
  { icon: <SiTiktok size={18}/>, label: "TikTok",    url: "https://www.tiktok.com/@new.nanthus.kitch?_r=1&_t=ZS-926tmexFDCj" },
];

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      bgcolor:   tokens.colors.dark.bg,
      color:     tokens.colors.dark.textPrimary,
      position:  "relative",
      overflow:  "hidden",
    }}
  >
    {/* Top golden accent line */}
    <Box
      aria-hidden="true"
      sx={{
        height:     "2px",
        background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.primary.main} 50%, transparent 100%)`,
      }}
    />

    {/* Large background wordmark */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        bottom:        -20,
        left:          "50%",
        transform:     "translateX(-50%)",
        fontFamily:    tokens.fonts.display,
        fontSize:      { xs: "24vw", md: "16vw", xl: "14vw" },
        color:         tokens.colors.primary.main,
        opacity:       0.04,
        whiteSpace:    "nowrap",
        pointerEvents: "none",
        userSelect:    "none",
        lineHeight:    1,
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
      }}
    >
      Nanthus
    </Box>

    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: { xs: 8, md: 10, xl: 12 }, pb: 4 }}>
      {/* Top: Logo + tagline left, social right */}
      <Box
        sx={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-start",
          flexWrap:       "wrap",
          gap:            4,
          mb:             { xs: 6, md: 8, xl: 10 },
          pb:             { xs: 5, md: 7, xl: 8 },
          borderBottom:   `1px solid ${tokens.colors.dark.borderSubtle}`,
        }}
      >
        <Box>
          <Box
            component="img"
            src="/new_nanthus_kitchen_logo.png"
            alt="New Nanthus Kitchen"
            sx={{ height: { xs: 56, md: 68, xl: 80 }, mb: 2, display: "block" }}
          />
          <Typography
            sx={{
              color:     tokens.colors.dark.textTertiary,
              fontSize:  { xs: "0.82rem", md: "0.88rem", xl: "0.95rem" },
              maxWidth:  { xs: 240, md: 280, xl: 320 },
              lineHeight: 1.7,
            }}
          >
            Authentic Sri Lankan cuisine from Jaffna,<br />
            served fresh across the GTA.
          </Typography>
        </Box>

        {/* Social icons */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color:         tokens.colors.primary.main,
              display:       "block",
              mb:            2,
              letterSpacing: "0.2em",
              fontSize:      { xs: "0.6rem", xl: "0.68rem" },
            }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {socialLinks.map((s) => (
              <IconButton
                key={s.label}
                component="a"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${s.label}`}
                sx={{
                  color:       tokens.colors.dark.textSecondary,
                  border:      `1px solid ${tokens.colors.dark.borderSubtle}`,
                  borderRadius: tokens.radius.sm,
                  width:       { xs: 40, xl: 44 },
                  height:      { xs: 40, xl: 44 },
                  transition:  tokens.transitions.normal,
                  "&:hover": {
                    bgcolor:     tokens.colors.primary.main,
                    color:       tokens.colors.dark.bg,
                    borderColor: tokens.colors.primary.main,
                    transform:   "translateY(-2px)",
                    boxShadow:   tokens.shadows.gold,
                  },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Grid: nav + hours + locations */}
      <Box
        sx={{
          display:             "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr" },
          gap:                 { xs: 5, md: 6, xl: 8 },
          mb:                  { xs: 6, md: 8, xl: 10 },
        }}
      >
        {/* Nav */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color:         tokens.colors.primary.main,
              display:       "block",
              mb:            { xs: 2.5, md: 3 },
              letterSpacing: "0.2em",
              fontSize:      { xs: "0.58rem", xl: "0.66rem" },
            }}
          >
            Navigate
          </Typography>
          <nav aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Box key={link.path} sx={{ mb: { xs: 1.2, md: 1.5 } }}>
                <Box
                  component={Link}
                  to={link.path}
                  sx={{
                    color:          tokens.colors.dark.textSecondary,
                    textDecoration: "none",
                    fontSize:       { xs: "0.85rem", md: "0.9rem", xl: "0.95rem" },
                    transition:     tokens.transitions.fast,
                    "&:hover":      { color: tokens.colors.primary.main },
                  }}
                >
                  {link.label}
                </Box>
              </Box>
            ))}
          </nav>
        </Box>

        {/* Hours */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color:         tokens.colors.primary.main,
              display:       "block",
              mb:            { xs: 2.5, md: 3 },
              letterSpacing: "0.2em",
              fontSize:      { xs: "0.58rem", xl: "0.66rem" },
            }}
          >
            Hours
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <AccessTimeIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }} />
            <Typography
              sx={{
                color:    tokens.colors.dark.textSecondary,
                fontSize: { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" },
              }}
            >
              Open Daily
            </Typography>
          </Box>
          {[
            { day: "Mon – Fri", time: "11 AM – 10 PM" },
            { day: "Sat – Sun", time: "10 AM – 10 PM" },
          ].map((h) => (
            <Box key={h.day} sx={{ mb: 1 }}>
              <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" }, mb: 0.2 }}>
                {h.day}
              </Typography>
              <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.78rem", md: "0.82rem", xl: "0.88rem" } }}>
                {h.time}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Markham */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color:         tokens.colors.primary.main,
              display:       "block",
              mb:            { xs: 2.5, md: 3 },
              letterSpacing: "0.2em",
              fontSize:      { xs: "0.58rem", xl: "0.66rem" },
            }}
          >
            Markham
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: { xs: "0.85rem", md: "0.9rem", xl: "0.95rem" }, mb: 0.5 }}>
            72-30 Karachi Dr
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.8rem", md: "0.85rem", xl: "0.9rem" }, mb: 1.5 }}>
            Markham, ON L3S 0B6
          </Typography>
          <Typography
            component="a"
            href="tel:2895545999"
            sx={{
              color:          tokens.colors.dark.textSecondary,
              fontSize:       { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" },
              textDecoration: "none",
              transition:     tokens.transitions.fast,
              "&:hover":      { color: tokens.colors.primary.main },
            }}
          >
            (289) 554-5999
          </Typography>
        </Box>

        {/* Scarborough */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color:         tokens.colors.primary.main,
              display:       "block",
              mb:            { xs: 2.5, md: 3 },
              letterSpacing: "0.2em",
              fontSize:      { xs: "0.58rem", xl: "0.66rem" },
            }}
          >
            Scarborough
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: { xs: "0.85rem", md: "0.9rem", xl: "0.95rem" }, mb: 0.5 }}>
            80 Nashdene Rd
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.8rem", md: "0.85rem", xl: "0.9rem" }, mb: 1.5 }}>
            Scarborough, ON M1V 5E4
          </Typography>
          <Typography
            component="a"
            href="tel:4162991999"
            sx={{
              color:          tokens.colors.dark.textSecondary,
              fontSize:       { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" },
              textDecoration: "none",
              transition:     tokens.transitions.fast,
              display:        "block",
              mb:             0.5,
              "&:hover":      { color: tokens.colors.primary.main },
            }}
          >
            (416) 299-1999
          </Typography>
          <Typography
            component="a"
            href="tel:4163884791"
            sx={{
              color:          tokens.colors.dark.textSecondary,
              fontSize:       { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" },
              textDecoration: "none",
              transition:     tokens.transitions.fast,
              "&:hover":      { color: tokens.colors.primary.main },
            }}
          >
            (416) 388-4791
          </Typography>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box
        sx={{
          pt:             { xs: 3, xl: 3.5 },
          borderTop:      `1px solid ${tokens.colors.dark.borderSubtle}`,
          display:        "flex",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            2,
        }}
      >
        <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.72rem", xl: "0.78rem" } }}>
          © {new Date().getFullYear()} New Nanthus Kitchen. All rights reserved.
        </Typography>
        <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.72rem", xl: "0.78rem" } }}>
          Designed by{" "}
          <Box
            component="a"
            href="https://www.akvisionsystems.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color:          tokens.colors.dark.textSecondary,
              textDecoration: "none",
              transition:     tokens.transitions.fast,
              "&:hover":      { color: tokens.colors.primary.main },
            }}
          >
            AK Vision Systems
          </Box>
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
