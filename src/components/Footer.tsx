import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { SiTiktok } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";

const socialLinks = [
  { icon: <FacebookIcon />,      label: "Facebook",  url: "https://www.facebook.com/share/1HHiP73yE2/?mibextid=wwXIfr" },
  { icon: <InstagramIcon />,     label: "Instagram", url: "https://www.instagram.com/newnanthuskitchen?igsh=MXRrcHR4aDlqNXFveQ==" },
  { icon: <SiTiktok size={18}/>, label: "TikTok",    url: "https://www.tiktok.com/@new.nanthus.kitch?_r=1&_t=ZS-926tmexFDCj" },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navLinks = [
    { label: t("nav.home"),     path: "/" },
    { label: t("nav.menu"),     path: "/menu" },
    { label: t("nav.specials"), path: "/specials" },
    { label: t("nav.order"),    path: "/order" },
    { label: t("nav.catering"), path: "/catering" },
    { label: t("nav.gallery"),  path: "/gallery" },
    { label: t("nav.contact"),  path: "/contact" },
  ];
  return (
  <Box
    component="footer"
    sx={{
      bgcolor:   tokens.colors.dark.bg,
      color:     tokens.colors.dark.textPrimary,
      position:  "relative",
      overflow:  "hidden",
    }}
  >
    {/* Top golden accent line — animated gradient */}
    <Box
      aria-hidden="true"
      sx={{
        height:     "2px",
        background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.primary.dark} 20%, ${tokens.colors.primary.main} 40%, ${tokens.colors.primary.light} 50%, ${tokens.colors.primary.main} 60%, ${tokens.colors.primary.dark} 80%, transparent 100%)`,
        boxShadow:  `0 0 20px rgba(184,134,11,0.3)`,
      }}
    />

    {/* Background radial glows */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        top:           "30%",
        left:          "-10%",
        width:         "50vw",
        height:        "60vh",
        background:    "radial-gradient(ellipse at center, rgba(184,134,11,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }}
    />
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        bottom:        "10%",
        right:         "-5%",
        width:         "35vw",
        height:        "40vh",
        background:    "radial-gradient(ellipse at center, rgba(184,134,11,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
      }}
    />

    {/* Large background wordmark */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        bottom:        -28,
        left:          "50%",
        transform:     "translateX(-50%)",
        fontFamily:    tokens.fonts.display,
        fontSize:      { xs: "24vw", md: "16vw", xl: "14vw" },
        color:         "transparent",
        WebkitTextStroke: `1px ${tokens.colors.primary.main}`,
        opacity:       0.05,
        whiteSpace:    "nowrap",
        pointerEvents: "none",
        userSelect:    "none",
        lineHeight:    1,
        textTransform: "uppercase",
        letterSpacing: "-0.03em",
      }}
    >
      Nanthus
    </Box>

    <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, pt: { xs: 8, md: 10, xl: 12 }, pb: 4, px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>
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
            sx={{
              height:     { xs: 56, md: 68, xl: 80 },
              mb:         2.5,
              display:    "block",
              filter:     "brightness(1.05)",
              transition: `transform ${tokens.transitions.spring}`,
              "&:hover":  { transform: "scale(1.03)" },
            }}
          />
          <Typography
            sx={{
              color:     tokens.colors.dark.textTertiary,
              fontSize:  { xs: "0.82rem", md: "0.88rem", xl: "0.95rem" },
              maxWidth:  { xs: 240, md: 280, xl: 320 },
              lineHeight: 1.75,
            }}
          >
            {t("footer.tagline1")}<br />
            {t("footer.tagline2")}
          </Typography>

          {/* Email contact */}
          <Box
            component="a"
            href="mailto:newnanthuskitchen@gmail.com"
            sx={{
              display:        "flex",
              alignItems:     "center",
              gap:            1,
              mt:             2.5,
              color:          tokens.colors.dark.textTertiary,
              fontSize:       { xs: "0.78rem", md: "0.82rem" },
              textDecoration: "none",
              transition:     tokens.transitions.fast,
              "&:hover":      { color: tokens.colors.primary.main },
            }}
          >
            <MailOutlineIcon sx={{ fontSize: "0.95rem" }} />
            newnanthuskitchen@gmail.com
          </Box>
        </Box>

        {/* Social icons */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color:         tokens.colors.primary.main,
              display:       "block",
              mb:            2.5,
              letterSpacing: "0.22em",
              fontSize:      { xs: "0.6rem", xl: "0.68rem" },
            }}
          >
            {t("footer.followUs")}
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
                  color:        tokens.colors.dark.textSecondary,
                  border:       `1px solid ${tokens.colors.dark.borderSubtle}`,
                  borderRadius: "50%",
                  width:        { xs: 42, xl: 46 },
                  height:       { xs: 42, xl: 46 },
                  transition:   tokens.transitions.normal,
                  "&:hover": {
                    bgcolor:     tokens.colors.primary.main,
                    color:       tokens.colors.dark.bg,
                    borderColor: tokens.colors.primary.main,
                    transform:   "translateY(-3px) scale(1.08)",
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
              fontSize:      { xs: "0.65rem", xl: "0.72rem" },
            }}
          >
            {t("footer.navigate")}
          </Typography>
          <nav aria-label={t("footer.navigate")}>
            {navLinks.map((link) => (
              <Box key={link.path} sx={{ mb: { xs: 1.2, md: 1.5 } }}>
                <Box
                  component={Link}
                  to={link.path}
                  className="link-underline"
                  sx={{
                    color:          tokens.colors.dark.textSecondary,
                    textDecoration: "none",
                    fontSize:       { xs: "0.85rem", md: "0.9rem", xl: "0.95rem" },
                    transition:     tokens.transitions.fast,
                    "&:hover":      { color: tokens.colors.primary.main },
                    // override link-underline gradient
                    "&::after": {
                      background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
                    },
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
              fontSize:      { xs: "0.65rem", xl: "0.72rem" },
            }}
          >
            {t("footer.hours")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <AccessTimeIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }} />
            <Typography
              sx={{
                color:    tokens.colors.dark.textSecondary,
                fontSize: { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" },
              }}
            >
              {t("footer.openDaily")}
            </Typography>
          </Box>
          {[
            { day: t("footer.monSun"), time: t("footer.hoursTime") },
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
              fontSize:      { xs: "0.65rem", xl: "0.72rem" },
            }}
          >
            {t("footer.markham")}
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: { xs: "0.85rem", md: "0.9rem", xl: "0.95rem" }, mb: 0.5 }}>
            {t("locations.markham.address1")}
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.8rem", md: "0.85rem", xl: "0.9rem" }, mb: 1.5 }}>
            {t("locations.markham.city")}
          </Typography>
          <Typography
            component="a"
            href="tel:2895545999"
            sx={{
              color:          tokens.colors.dark.textSecondary,
              fontSize:       { xs: "0.82rem", md: "0.85rem", xl: "0.92rem" },
              textDecoration: "none",
              transition:     tokens.transitions.fast,
              display:        "block",
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
              fontSize:      { xs: "0.65rem", xl: "0.72rem" },
            }}
          >
            {t("footer.scarborough")}
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: { xs: "0.85rem", md: "0.9rem", xl: "0.95rem" }, mb: 0.5 }}>
            {t("locations.scarborough.address1")}
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.8rem", md: "0.85rem", xl: "0.9rem" }, mb: 1.5 }}>
            {t("locations.scarborough.city")}
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

      {/* Gold divider */}
      <Box className="gold-divider" sx={{ mb: { xs: 2.5, xl: 3 } }} />

      {/* Bottom bar */}
      <Box
        sx={{
          pt:             { xs: 2, xl: 2.5 },
          display:        "flex",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            2,
        }}
      >
        <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.72rem", xl: "0.78rem" } }}>
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </Typography>
        <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: { xs: "0.72rem", xl: "0.78rem" } }}>
          {t("footer.designedBy")}{" "}
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
            {t("footer.designer")}
          </Box>
        </Typography>
      </Box>
    </Container>
  </Box>
  );
};

export default Footer;
