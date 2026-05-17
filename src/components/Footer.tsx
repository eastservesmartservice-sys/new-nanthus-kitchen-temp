import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { contactEmail, locations, navLinks, socials } from "../data/site";
import { tokens } from "../theme";

const socialIcons: Record<string, ReactNode> = {
  Facebook: <FacebookIcon fontSize="small" />,
  Instagram: <InstagramIcon fontSize="small" />,
};

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: tokens.colors.bg.inverse, color: tokens.colors.dark.textPrimary }}>
      <Box sx={{ borderBottom: `1px solid ${tokens.colors.dark.borderSubtle}` }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 5, md: 6 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            gap={3}
          >
            <Box>
              <Typography sx={{ color: tokens.colors.dark.textTertiary, textTransform: "uppercase", fontWeight: 700, mb: 1 }}>
                Pickup kitchen
              </Typography>
              <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2rem", md: "2.6rem" }, lineHeight: 1.1 }}>
                Fresh Sri Lankan food from two Toronto counters.
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/order"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: tokens.colors.primary.main,
                color: tokens.colors.text.primary,
                fontWeight: 700,
                px: 3,
                flexShrink: 0,
                "&:hover": { bgcolor: tokens.colors.primary.light },
              }}
            >
              Order pickup
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1.4fr 0.7fr 1.4fr 1.4fr" },
            gap: { xs: 5, md: 6 },
          }}
        >
          <Stack gap={2.5}>
            <Box
              component="img"
              src="/new_nanthus_kitchen_logo.png"
              alt="New Nanthus Kitchen"
              sx={{ width: 160, display: "block" }}
            />
            <Typography sx={{ color: tokens.colors.dark.textSecondary, maxWidth: 320, lineHeight: 1.8 }}>
              Jaffna inspired cooking, short eats, grilled plates, biryani, kothu, and catering for family tables across Toronto.
            </Typography>
            <Stack direction="row" gap={1}>
              {socials.map((item) => (
                <IconButton
                  key={item.label}
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    color: tokens.colors.dark.textPrimary,
                    border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                    "&:hover": { bgcolor: tokens.colors.primary.main, borderColor: tokens.colors.primary.main },
                  }}
                >
                  {socialIcons[item.label]}
                </IconButton>
              ))}
            </Stack>
          </Stack>

          <Box>
            <Typography sx={{ color: tokens.colors.dark.textTertiary, fontWeight: 700, mb: 2 }}>
              Pages
            </Typography>
            <Stack gap={1}>
              {navLinks.slice(1).map((item) => (
                <Box
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: tokens.colors.dark.textSecondary,
                    textDecoration: "none",
                    "&:hover": { color: tokens.colors.dark.textPrimary },
                  }}
                >
                  {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </Box>
              ))}
            </Stack>
          </Box>

          {locations.map((location) => (
            <Box key={location.id}>
              <Typography sx={{ color: tokens.colors.dark.textTertiary, fontWeight: 700, mb: 2 }}>
                {location.name}
              </Typography>
              <Stack gap={1.4}>
                <Stack direction="row" gap={1.2} alignItems="flex-start">
                  <LocationOnIcon sx={{ fontSize: "1rem", color: tokens.colors.saffron.light, mt: 0.25 }} />
                  <Box>
                    <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: "0.88rem" }}>
                      {location.address}
                    </Typography>
                    <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.82rem" }}>
                      {location.city}
                    </Typography>
                  </Box>
                </Stack>
                {location.phones.map((phone) => (
                  <Stack key={phone} direction="row" gap={1.2} alignItems="center">
                    <PhoneIcon sx={{ fontSize: "0.95rem", color: tokens.colors.saffron.light }} />
                    <Box component="a" href={`tel:${phone.replace(/\D/g, "")}`} sx={{ color: tokens.colors.dark.textSecondary, textDecoration: "none", fontSize: "0.86rem" }}>
                      {phone}
                    </Box>
                  </Stack>
                ))}
                <Stack direction="row" gap={1.2} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: "0.95rem", color: tokens.colors.saffron.light }} />
                  <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.82rem" }}>
                    {location.hours}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          gap={1.5}
          sx={{ mt: 7, pt: 3, borderTop: `1px solid ${tokens.colors.dark.borderSubtle}` }}
        >
          <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.78rem" }}>
            Copyright {new Date().getFullYear()} New Nanthus Kitchen. All rights reserved.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 1, sm: 2 }} alignItems={{ xs: "flex-start", sm: "center" }}>
            <Box component="a" href={`mailto:${contactEmail}`} sx={{ color: tokens.colors.dark.textTertiary, textDecoration: "none", fontSize: "0.78rem", display: "inline-flex", gap: 0.8, alignItems: "center" }}>
              <MailOutlineIcon sx={{ fontSize: "0.95rem" }} />
              {contactEmail}
            </Box>
            <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.78rem", display: { xs: "none", sm: "block" } }}>·</Typography>
            <Typography sx={{ color: tokens.colors.dark.textTertiary, fontSize: "0.78rem" }}>
              Website by{" "}
              <Box
                component="a"
                href="https://www.akvisionsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: tokens.colors.primary.light, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                AK Vision Systems
              </Box>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
