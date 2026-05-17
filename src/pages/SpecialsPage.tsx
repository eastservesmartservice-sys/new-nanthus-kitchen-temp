import { Link } from "react-router-dom";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { pageImages, specials } from "../data/site";
import { tokens } from "../theme";

export default function SpecialsPage() {
  return (
    <Box>
      <PageBanner
        eyebrow="Kitchen notes"
        title="Specials that"
        highlight="move fast"
        subtitle="Daily pickup meals and weekend comforts from the counter. Availability can change during service."
        image={pageImages.specials}
        imageAlt="Rice and curry special"
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        <SectionHeading
          eyebrow="Today"
          title="Counter specials"
          body="Built for quick pickup without losing the comfort of a full meal."
        />
        <Stack gap={{ xs: 3, md: 4 }} sx={{ mt: 4 }}>
          {specials.map((special, index) => (
            <Box
              key={special.title}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: index % 2 === 0 ? "0.95fr 1.05fr" : "1.05fr 0.95fr" },
                gap: { xs: 0, md: 0 },
                border: `1px solid ${tokens.colors.line.subtle}`,
                borderRadius: tokens.radius.xl,
                overflow: "hidden",
                bgcolor: tokens.colors.bg.card,
                transition: tokens.transitions.spring,
                "&:hover": { boxShadow: tokens.shadows.md, borderColor: tokens.colors.line.medium },
                "&:hover .special-img": { transform: "scale(1.04)" },
              }}
            >
              <Box
                sx={{
                  minHeight: { xs: 280, md: 440 },
                  order: { md: index % 2 === 0 ? 0 : 1 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={special.image}
                  alt={special.title}
                  className="special-img image-cover"
                  sx={{ transition: "transform 0.7s ease" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: index % 2 === 0
                      ? "linear-gradient(90deg, transparent 60%, rgba(23,27,23,0.15) 100%)"
                      : "linear-gradient(270deg, transparent 60%, rgba(23,27,23,0.15) 100%)",
                  }}
                />
              </Box>

              <Stack gap={2.5} justifyContent="center" sx={{ p: { xs: 3, md: 5 }, bgcolor: index % 2 === 0 ? tokens.colors.bg.card : tokens.colors.bg.warm }}>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  <Chip
                    label={special.label}
                    sx={{ bgcolor: tokens.colors.primary.pale, color: tokens.colors.primary.dark, fontWeight: 700 }}
                  />
                  <Chip
                    icon={<ScheduleOutlinedIcon />}
                    label={special.availability}
                    sx={{ bgcolor: tokens.colors.secondary.pale, color: tokens.colors.secondary.dark, fontWeight: 700 }}
                  />
                </Stack>
                <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2rem", md: "3rem" }, lineHeight: 1 }}>
                  {special.title}
                </Typography>
                <Typography sx={{ color: tokens.colors.text.secondary, maxWidth: 560, lineHeight: 1.8 }}>
                  {special.description}
                </Typography>
                <Stack direction="row" alignItems="baseline" gap={1}>
                  <Typography
                    className="stat-num"
                    sx={{ fontSize: { xs: "2.5rem", md: "3rem" }, color: tokens.colors.secondary.dark, lineHeight: 1 }}
                  >
                    {special.price}
                  </Typography>
                  {special.price !== "Market price" && (
                    <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.82rem" }}>per order</Typography>
                  )}
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
                  <Button
                    component={Link}
                    to="/order"
                    variant="contained"
                    startIcon={<ShoppingBagOutlinedIcon />}
                    sx={{ bgcolor: tokens.colors.text.primary, color: tokens.colors.text.inverse, "&:hover": { bgcolor: tokens.colors.primary.dark } }}
                  >
                    Order pickup
                  </Button>
                  <Button
                    component={Link}
                    to="/menu"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ borderColor: tokens.colors.line.medium, color: tokens.colors.text.secondary, "&:hover": { borderColor: tokens.colors.text.primary, color: tokens.colors.text.primary } }}
                  >
                    View full menu
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ bgcolor: tokens.colors.bg.inverse, color: tokens.colors.dark.textPrimary, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2.5, md: 6 }, textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: "999px",
              border: `1px solid rgba(245,166,35,0.3)`,
              bgcolor: "rgba(245,166,35,0.1)",
              mb: 3,
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: tokens.colors.primary.main }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: tokens.colors.primary.light }}>
              Full menu
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3.4rem" }, lineHeight: 1, mb: 2 }}>
            Specials are only part of the counter.
          </Typography>
          <Typography sx={{ color: tokens.colors.dark.textSecondary, mb: 4, maxWidth: 540, mx: "auto", lineHeight: 1.8 }}>
            Browse the full list when you need family portions, short eats, or a wider pickup order.
          </Typography>
          <Button
            component={Link}
            to="/menu"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: tokens.colors.primary.main,
              color: tokens.colors.text.primary,
              fontWeight: 700,
              px: 4,
              "&:hover": { bgcolor: tokens.colors.primary.light },
            }}
          >
            Browse menu
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
