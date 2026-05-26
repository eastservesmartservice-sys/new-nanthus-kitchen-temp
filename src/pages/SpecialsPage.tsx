import { Link } from "react-router-dom";
import { Box, Button, Chip, CircularProgress, Container, Stack, Typography } from "@mui/material";
import EyebrowPill from "../components/EyebrowPill";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { pageImageSets, pageImages } from "../data/site";
import { useSpecials } from "../hooks/useSpecials";
import { tokens } from "../theme";

const dayLabel: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const typeLabel: Record<string, string> = {
  daily: "Daily special",
  chef: "Chef's special",
  seasonal: "Seasonal",
  game_time: "Game time",
  day_time: "Limited hours",
};

export default function SpecialsPage() {
  const { specials, loading, error } = useSpecials();

  return (
    <Box>
      <PageBanner
        eyebrow="Kitchen notes"
        title="Specials that"
        highlight="move fast"
        subtitle="Daily pickup meals and weekend comforts from the counter. Availability can change during service."
        image={pageImages.specials}
        imageSrcSet={pageImageSets.specials.srcSet}
        imageSizes={pageImageSets.specials.sizes}
        imageAlt="Rice and curry special"
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        <SectionHeading
          eyebrow="Today"
          title="Counter specials"
          body="Built for quick pickup without losing the comfort of a full meal."
        />

        {loading && (
          <Box sx={{ display: "grid", placeItems: "center", py: 10 }}>
            <CircularProgress sx={{ color: tokens.colors.primary.main }} />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ color: tokens.colors.text.secondary }}>
              Unable to load specials right now. Please check back soon or call us directly.
            </Typography>
          </Box>
        )}

        {!loading && !error && specials.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ color: tokens.colors.text.secondary }}>
              No specials available today. Check back tomorrow or browse our full menu.
            </Typography>
            <Button
              component={Link}
              to="/menu"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ mt: 3, bgcolor: tokens.colors.primary.main, color: tokens.colors.text.primary, fontWeight: 700, "&:hover": { bgcolor: tokens.colors.primary.light } }}
            >
              View full menu
            </Button>
          </Box>
        )}

        {!loading && !error && specials.length > 0 && (
          <Stack gap={{ xs: 3, md: 4 }} sx={{ mt: 4 }}>
            {specials.map((special, index) => (
              <Box
                key={special.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: index % 2 === 0 ? "0.95fr 1.05fr" : "1.05fr 0.95fr" },
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
                    bgcolor: tokens.colors.bg.warm,
                  }}
                >
                  {special.imageUrl ? (
                    <>
                      <Box
                        component="img"
                        src={special.imageUrl}
                        alt={special.title}
                        loading="lazy"
                        decoding="async"
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
                    </>
                  ) : (
                    <Box sx={{ display: "grid", placeItems: "center", height: "100%", minHeight: { xs: 280, md: 440 } }}>
                      <Typography sx={{ color: tokens.colors.text.disabled, fontSize: "0.85rem" }}>No image</Typography>
                    </Box>
                  )}
                </Box>

                <Stack
                  gap={2.5}
                  justifyContent="center"
                  sx={{ p: { xs: 3, md: 5 }, bgcolor: index % 2 === 0 ? tokens.colors.bg.card : tokens.colors.bg.warm }}
                >
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    <Chip
                      label={typeLabel[special.type] ?? special.type}
                      sx={{ bgcolor: tokens.colors.primary.pale, color: tokens.colors.primary.dark, fontWeight: 700 }}
                    />
                    {special.dayOfWeek && (
                      <Chip
                        icon={<ScheduleOutlinedIcon />}
                        label={dayLabel[special.dayOfWeek] ?? special.dayOfWeek}
                        sx={{ bgcolor: tokens.colors.secondary.pale, color: tokens.colors.secondary.dark, fontWeight: 700 }}
                      />
                    )}
                  </Stack>
                  <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2rem", md: "3rem" }, lineHeight: 1 }}>
                    {special.title}
                  </Typography>
                  {special.description && (
                    <Typography sx={{ color: tokens.colors.text.secondary, maxWidth: 560, lineHeight: 1.8 }}>
                      {special.description}
                    </Typography>
                  )}
                  <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
                    <Button
                      component={Link}
                      to="/order"
                      variant="contained"
                      startIcon={<ShoppingBagOutlinedIcon />}
                      sx={{ bgcolor: tokens.colors.primary.main, color: tokens.colors.text.primary, fontWeight: 700, "&:hover": { bgcolor: tokens.colors.primary.light } }}
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
        )}
      </Container>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ bgcolor: tokens.colors.bg.inverse, color: tokens.colors.dark.textPrimary, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2.5, md: 6 }, textAlign: "center" }}>
          <Box sx={{ mb: 3 }}>
            <EyebrowPill label="Full menu" dark />
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
            sx={{ bgcolor: tokens.colors.primary.main, color: tokens.colors.text.primary, fontWeight: 700, px: 4, "&:hover": { bgcolor: tokens.colors.primary.light } }}
          >
            Browse menu
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
