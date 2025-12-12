import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion } from "framer-motion";
import { SiTiktok } from "react-icons/si";
import { tokens } from "../theme";

const socialLinks = [
  {
    icon: <FacebookIcon />,
    label: "Facebook",
    url: "https://www.facebook.com/share/1HHiP73yE2/?mibextid=wwXIfr",
  },
  {
    icon: <InstagramIcon />,
    label: "Instagram",
    url: "https://www.instagram.com/newnanthuskitchen?igsh=MXRrcHR4aDlqNXFveQ==",
  },
  {
    icon: <SiTiktok size={20} />,
    label: "TikTok",
    url: "https://www.tiktok.com/@new.nanthus.kitch?_r=1&_t=ZS-926tmexFDCj",
  },
];

interface NavLinkProps {
  children: React.ReactNode;
  sectionId: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, sectionId }) => {
  const scrollToSection = () => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={scrollToSection}
      whileHover={{ x: 10 }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        padding: 0,
        marginBottom: "0.75rem",
        display: "block",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: { xs: "1.5rem", md: "2.5rem" },
          lineHeight: 1.2,
          fontFamily: tokens.fonts.display,
          transition: tokens.transitions.normal,
          "&:hover": {
            color: tokens.colors.primary.main,
          },
        }}
      >
        {children}
      </Typography>
    </motion.button>
  );
};

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: tokens.colors.neutral.black,
        color: "common.white",
        pt: { xs: 8, md: 12 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }}>
          {/* Navigation Links */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component="span"
              sx={{
                color: tokens.colors.primary.main,
                letterSpacing: "0.2em",
                mb: 3,
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Quick Links
            </Typography>
            <nav aria-label="Footer navigation">
              <NavLink sectionId="menu">Menu</NavLink>
              <NavLink sectionId="special">Specials</NavLink>
              <NavLink sectionId="take-away">Order</NavLink>
              <NavLink sectionId="catering">Catering</NavLink>
              <NavLink sectionId="contact">Contact</NavLink>
            </nav>
          </Grid>

          {/* Info Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {/* Logo */}
              <Box
                component="img"
                src="/new_nanthus_kitchen_logo.png"
                alt="New Nanthus Kitchen Logo"
                sx={{
                  height: 50,
                  width: "auto",
                  mb: 4,
                  objectFit: "contain",
                  alignSelf: "flex-start",
                }}
              />

              {/* Locations */}
              <Typography
                component="span"
                sx={{
                  color: tokens.colors.primary.main,
                  letterSpacing: "0.2em",
                  mb: 2,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Our Locations
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ color: "white", fontSize: "0.95rem", mb: 1 }}>
                  <strong>Markham:</strong> 72-30 Karachi Dr, L3S 0B6
                </Typography>
                <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
                  <strong>Scarborough:</strong> 80 Nashdene Rd, M1V 5E4
                </Typography>
              </Box>

              {/* Social */}
              <Typography
                component="span"
                sx={{
                  color: tokens.colors.primary.main,
                  letterSpacing: "0.2em",
                  mb: 2,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    sx={{
                      color: "white",
                      border: `1px solid ${tokens.colors.border.light}`,
                      minWidth: 44,
                      minHeight: 44,
                      transition: tokens.transitions.normal,
                      "&:hover": {
                        bgcolor: tokens.colors.primary.main,
                        color: tokens.colors.neutral.black,
                        borderColor: tokens.colors.primary.main,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: `1px solid ${tokens.colors.border.light}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}
          >
            © {new Date().getFullYear()} New Nanthus Kitchen. All rights
            reserved.
          </Typography>
          <Typography
            sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}
          >
            Designed by{" "}
            <Box
              component="a"
              href="https://www.akvisionsystems.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: tokens.colors.text.secondary,
                textDecoration: "none",
                transition: tokens.transitions.normal,
                "&:hover": { color: tokens.colors.primary.main },
              }}
            >
              AK Vision Systems
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;