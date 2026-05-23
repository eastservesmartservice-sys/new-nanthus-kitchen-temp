import { Link } from "react-router-dom";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { locations, pageImages } from "../data/site";
import { tokens } from "../theme";

const steps = [
  {
    icon: <LocationOnOutlinedIcon />,
    title: "Choose a counter",
    body: "Pick Scarborough or Markham before browsing the ordering menu.",
  },
  {
    icon: <ShoppingBagOutlinedIcon />,
    title: "Build the order",
    body: "Add mains, short eats, drinks, and specials through the ordering partner.",
  },
  {
    icon: <LocalDiningOutlinedIcon />,
    title: "Collect fresh",
    body: "Arrive at the counter when your pickup window is ready.",
  },
];

export default function OrderPage() {
  return (
    <Box>
      <PageBanner
        eyebrow="Pickup only"
        title="Order from"
        highlight="your counter"
        subtitle="Online ordering redirects to our pickup partner. Choose the location nearest to you before placing the order."
        image={pageImages.order}
        imageAlt="Restaurant table with shared dishes"
      >
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Chip icon={<AccessTimeIcon />} label="20–30 minute pickup" />
          <Chip label="10% first order offer" />
        </Stack>
      </PageBanner>

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        <SectionHeading
          eyebrow="Counters"
          title="Choose where you want to pick up"
          body="Both counters follow the same ordering flow. The links below open in a new tab."
        />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2.5, mt: 4 }}>
          {locations.map((location) => {
            const isPrimary = location.accent === "tomato";
            const accentColor = isPrimary ? tokens.colors.primary.main : tokens.colors.secondary.main;
            return (
              <Box
                key={location.id}
                sx={{
                  border: `1px solid ${tokens.colors.line.subtle}`,
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  bgcolor: tokens.colors.bg.card,
                  transition: tokens.transitions.spring,
                  "&:hover": {
                    borderColor: accentColor,
                    boxShadow: isPrimary ? tokens.shadows.orange : tokens.shadows.blue,
                  },
                  "&:hover .order-img": { transform: "scale(1.04)" },
                }}
              >
                <Box sx={{ height: { xs: 240, md: 310 }, position: "relative", overflow: "hidden" }}>
                  <Box
                    component="img"
                    src={location.image}
                    alt={`${location.name} pickup location`}
                    loading="lazy"
                    decoding="async"
                    className="order-img image-cover"
                    sx={{ transition: "transform 0.7s ease" }}
                  />
                  <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(23,27,23,0.02) 0%, rgba(23,27,23,0.82) 100%)" }} />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 18,
                      right: 18,
                      px: 1.5,
                      py: 0.6,
                      borderRadius: "999px",
                      bgcolor: accentColor,
                      color: isPrimary ? tokens.colors.text.primary : "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Open daily
                  </Box>
                  <Typography
                    sx={{
                      position: "absolute",
                      left: 24,
                      bottom: 22,
                      color: tokens.colors.text.inverse,
                      fontFamily: tokens.fonts.display,
                      fontSize: { xs: "2rem", md: "2.7rem" },
                      lineHeight: 1,
                    }}
                  >
                    {location.name}
                  </Typography>
                </Box>

                <Stack gap={1.8} sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography sx={{ color: tokens.colors.text.secondary }}>
                    {location.address}, {location.city}
                  </Typography>
                  <Stack direction="row" gap={1.2} alignItems="flex-start">
                    <AccessTimeIcon sx={{ color: accentColor, fontSize: "1rem", mt: 0.25, flexShrink: 0 }} />
                    <Stack gap={0.3}>
                      {location.hours.map((line) => (
                        <Typography key={line} sx={{ color: tokens.colors.text.tertiary, fontSize: "0.88rem" }}>
                          {line}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                  {location.phones.map((phone) => (
                    <Stack key={phone} direction="row" gap={1.2} alignItems="center">
                      <PhoneIcon sx={{ color: accentColor, fontSize: "1rem" }} />
                      <Box
                        component="a"
                        href={`tel:${phone.replace(/\D/g, "")}`}
                        sx={{ color: tokens.colors.text.secondary, textDecoration: "none", fontSize: "0.88rem", "&:hover": { color: tokens.colors.text.primary } }}
                      >
                        {phone}
                      </Box>
                    </Stack>
                  ))}
                  <Stack direction={{ xs: "column", sm: "row" }} gap={1.2} sx={{ pt: 0.5 }}>
                    <Button
                      component="a"
                      href={location.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        bgcolor: isPrimary ? tokens.colors.primary.main : tokens.colors.secondary.main,
                        color: isPrimary ? tokens.colors.text.primary : "#fff",
                        fontWeight: 700,
                        "&:hover": {
                          bgcolor: isPrimary ? tokens.colors.primary.light : tokens.colors.secondary.light,
                        },
                      }}
                    >
                      Order from {location.name}
                    </Button>
                    <Button
                      component="a"
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      sx={{ borderColor: tokens.colors.line.medium, color: tokens.colors.text.secondary, "&:hover": { borderColor: tokens.colors.text.primary, color: tokens.colors.text.primary } }}
                    >
                      View map
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <Box component="section" sx={{ bgcolor: tokens.colors.bg.inverse, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <SectionHeading eyebrow="Flow" title="How pickup ordering works" align="center" dark />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: { xs: 0, md: 2 }, mt: 4, position: "relative" }}>
            {/* connector line on desktop */}
            <Box sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 46,
              left: "calc(33.33% - 0px)",
              width: "33.33%",
              height: "2px",
              background: `linear-gradient(90deg, ${tokens.colors.primary.main}, ${tokens.colors.secondary.main})`,
              opacity: 0.35,
              zIndex: 0,
            }} />
            {steps.map((step, index) => (
              <Box
                key={step.title}
                sx={{
                  bgcolor: tokens.colors.dark.surface,
                  border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                  borderRadius: tokens.radius.xl,
                  p: { xs: 2.5, md: 3 },
                  position: "relative",
                  overflow: "hidden",
                  zIndex: 1,
                  /* mobile: vertical connector */
                  "&:not(:last-child)::after": {
                    content: '""',
                    display: { xs: "block", md: "none" },
                    width: "2px",
                    height: 24,
                    bgcolor: tokens.colors.dark.borderLight,
                    mx: "auto",
                    mt: 0,
                    mb: 0,
                    position: "absolute",
                    bottom: -24,
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                  mb: { xs: 3, md: 0 },
                  "&::before": {
                    content: `"0${index + 1}"`,
                    position: "absolute",
                    top: -10,
                    right: 16,
                    fontFamily: tokens.fonts.display,
                    fontSize: "5rem",
                    fontWeight: 700,
                    color: "rgba(251,250,246,0.04)",
                    lineHeight: 1,
                    pointerEvents: "none",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: tokens.radius.md,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: index === 1 ? tokens.colors.secondary.pale : "rgba(245,166,35,0.15)",
                      color: index === 1 ? tokens.colors.secondary.main : tokens.colors.primary.main,
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: tokens.colors.dark.elevated,
                      border: `1px solid ${tokens.colors.dark.borderLight}`,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: tokens.colors.dark.textTertiary, lineHeight: 1 }}>
                      {index + 1}
                    </Typography>
                  </Box>
                </Stack>
                <Typography sx={{ fontWeight: 700, fontSize: "1.08rem", mb: 1, color: tokens.colors.dark.textPrimary }}>{step.title}</Typography>
                <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>{step.body}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              component={Link}
              to="/menu"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderColor: tokens.colors.dark.borderLight, color: tokens.colors.dark.textSecondary, "&:hover": { borderColor: tokens.colors.dark.textPrimary, color: tokens.colors.dark.textPrimary } }}
            >
              Preview menu first
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
