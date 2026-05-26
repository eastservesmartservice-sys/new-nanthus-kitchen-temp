import { Link } from "react-router-dom";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import EyebrowPill from "../components/EyebrowPill";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { cateringServices, pageImageSets, pageImages } from "../data/site";
import { tokens } from "../theme";

const process = [
  "Tell us your guest count and date",
  "Choose a menu style and service needs",
  "Confirm pickup or event logistics",
];

const accentColors = [
  { bg: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.25)", text: tokens.colors.saffron.main },
  { bg: tokens.colors.secondary.pale, border: tokens.colors.secondary.glow, text: tokens.colors.secondary.main },
  { bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.2)", text: tokens.colors.saffron.main },
];

export default function CateringPage() {
  return (
    <Box>
      <PageBanner
        eyebrow="Catering"
        title="Sri Lankan food for"
        highlight="bigger tables"
        subtitle="Event trays, family portions, cultural gatherings, office meals, and milestone spreads planned around your guest count."
        image={pageImages.catering}
        imageSrcSet={pageImageSets.catering.srcSet}
        imageSizes={pageImageSets.catering.sizes}
        imageAlt="Catering table with shared dishes"
      >
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Chip icon={<GroupsOutlinedIcon />} label="Small and large groups" />
          <Chip icon={<EventAvailableOutlinedIcon />} label="Custom menu guidance" />
        </Stack>
      </PageBanner>

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        <SectionHeading
          eyebrow="Formats"
          title="Choose the service style"
          body="Each catering request starts with the event shape, then we build portions and dishes around it."
        />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5, mt: 4 }}>
          {cateringServices.map((service, index) => (
            <Box
              key={service.title}
              sx={{
                bgcolor: tokens.colors.bg.card,
                border: `1px solid ${tokens.colors.line.subtle}`,
                borderRadius: tokens.radius.xl,
                p: { xs: 2.5, md: 3 },
                minHeight: 320,
                transition: tokens.transitions.spring,
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: accentColors[index]!.border,
                  boxShadow: tokens.shadows.md,
                  transform: "translateY(-4px)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  bgcolor: accentColors[index]!.text,
                  opacity: 0.7,
                },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: tokens.radius.md,
                  bgcolor: accentColors[index]!.bg,
                  border: `1px solid ${accentColors[index]!.border}`,
                  mb: 2,
                }}
              >
                <Typography
                  className="stat-num"
                  sx={{ fontSize: "1.4rem", color: accentColors[index]!.text, lineHeight: 1 }}
                >
                  0{index + 1}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1.18rem", mb: 1 }}>{service.title}</Typography>
              <Typography sx={{ color: tokens.colors.text.secondary, mb: 2.5, lineHeight: 1.7 }}>{service.description}</Typography>
              <Stack gap={1}>
                {service.details.map((detail) => (
                  <Stack key={detail} direction="row" gap={1} alignItems="center">
                    <CheckCircleOutlineIcon sx={{ color: tokens.colors.secondary.main, fontSize: "1rem", flexShrink: 0 }} />
                    <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.86rem" }}>{detail}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Planning process ──────────────────────────────────────────── */}
      <Box component="section" sx={{ bgcolor: tokens.colors.bg.inverse, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" }, gap: { xs: 5, md: 7 }, alignItems: "center" }}>
            <Stack gap={3}>
              <Box>
                <Box sx={{ mb: 2.5 }}>
                  <EyebrowPill label="Planning" dark color="neutral" />
                </Box>
                <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2.1rem", md: "3rem" }, lineHeight: 1.05, color: tokens.colors.dark.textPrimary, mb: 2 }}>
                  A simple catering sequence
                </Typography>
                <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.98rem", lineHeight: 1.8 }}>
                  Send the event details first. We will help you shape the menu instead of making you guess portions.
                </Typography>
              </Box>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: tokens.colors.primary.main,
                  color: tokens.colors.text.primary,
                  fontWeight: 700,
                  "&:hover": { bgcolor: tokens.colors.primary.light },
                }}
              >
                Start a catering request
              </Button>
            </Stack>
            <Stack gap={1.5}>
              {process.map((step, index) => (
                <Box
                  key={step}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: tokens.colors.dark.surface,
                    border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                    borderRadius: tokens.radius.xl,
                    p: 2,
                    transition: tokens.transitions.fast,
                    "&:hover": { borderColor: tokens.colors.dark.borderLight },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: tokens.radius.md,
                      bgcolor: index === 1 ? tokens.colors.secondary.pale : "rgba(245,166,35,0.15)",
                      color: index === 1 ? tokens.colors.secondary.main : tokens.colors.primary.main,
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: tokens.colors.dark.textPrimary }}>{step}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 6 }, textAlign: "center" }}>
          <Box sx={{ mb: 3 }}>
            <EyebrowPill label="Event menu" color="secondary" />
          </Box>
          <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3.4rem" }, lineHeight: 1, mb: 2 }}>
            Build a spread that feels familiar and generous.
          </Typography>
          <Typography sx={{ color: tokens.colors.text.secondary, maxWidth: 720, mx: "auto", mb: 4, lineHeight: 1.8 }}>
            Mix mains, rice dishes, vegetarian plates, short eats, and sweets into a menu that works for your event timing.
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ bgcolor: tokens.colors.primary.main, color: tokens.colors.text.primary, fontWeight: 700, "&:hover": { bgcolor: tokens.colors.primary.light } }}
          >
            Contact catering
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
