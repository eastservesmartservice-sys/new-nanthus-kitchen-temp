import { useMemo, useState } from "react";
import { Box, Button, Chip, CircularProgress, Container, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PageBanner from "../components/PageBanner";
import LocationSelectionModal from "../components/LocationSelectionModal";
import { locations, pageImages } from "../data/site";
import { useMenu } from "../hooks/useMenu";
import type { LocationId } from "../hooks/useMenu";
import { tokens } from "../theme";

export default function MenuPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId>("scarborough");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const { categories, loading, error } = useMenu(selectedLocationId);

  const selectedLocation = locations.find((l) => l.id === selectedLocationId) ?? locations[0]!;
  const accent = selectedLocation.accent === "tomato" ? tokens.colors.primary.main : tokens.colors.secondary.main;
  const accentDark = selectedLocation.accent === "tomato" ? tokens.colors.primary.dark : tokens.colors.secondary.dark;

  const active = useMemo(() => {
    const first = categories[0];
    if (!first) return null;
    return categories.find((c) => c.id === activeCategoryId) ?? first;
  }, [activeCategoryId, categories]);

  const switchLocation = (id: LocationId) => {
    setSelectedLocationId(id);
    setActiveCategoryId(null);
  };

  if (loading) {
    return (
      <Box>
        <PageBanner
          eyebrow="Full menu"
          title="Browse by"
          highlight="craving"
          image={pageImages.menu}
          imageAlt="Noodle and curry dishes"
        />
        <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
          <CircularProgress sx={{ color: tokens.colors.primary.main }} />
        </Box>
      </Box>
    );
  }

  if (error || categories.length === 0) {
    return (
      <Box>
        <PageBanner
          eyebrow="Full menu"
          title="Browse by"
          highlight="craving"
          image={pageImages.menu}
          imageAlt="Noodle and curry dishes"
        />
        <Box sx={{ textAlign: "center", py: 12 }}>
          <Typography sx={{ color: tokens.colors.text.secondary, mb: 2 }}>
            {error ?? "Menu unavailable right now. Please call us directly or try again shortly."}
          </Typography>
          {locations.map((loc) =>
            loc.phones.map((phone) => (
              <Typography key={phone} sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                <Box component="a" href={`tel:${phone.replace(/\D/g, "")}`} sx={{ color: tokens.colors.primary.main, textDecoration: "none" }}>
                  {phone}
                </Box>
              </Typography>
            )),
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PageBanner
        eyebrow="Full menu"
        title="Browse by"
        highlight="craving"
        subtitle="A practical pickup menu with Jaffna specialties, kothu, biryani, grilled plates, short eats, and weekday staples."
        image={pageImages.menu}
        imageAlt="Noodle and curry dishes"
      >
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Chip label={`${categories.length} sections`} />
          <Chip label={selectedLocation.name} sx={{ bgcolor: "rgba(245,166,35,0.18)", color: tokens.colors.primary.light, border: "1px solid rgba(245,166,35,0.28)" }} />
        </Stack>
      </PageBanner>

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>

        {/* ── Location switcher ─────────────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
            mb: 5,
            p: 1,
            bgcolor: tokens.colors.bg.card,
            border: `1px solid ${tokens.colors.line.subtle}`,
            borderRadius: tokens.radius.xl,
          }}
        >
          {locations.map((loc) => {
            const locAccent = loc.accent === "tomato" ? tokens.colors.primary.main : tokens.colors.secondary.main;
            const locAccentPale = loc.accent === "tomato" ? tokens.colors.primary.pale : tokens.colors.secondary.pale;
            const isSelected = loc.id === selectedLocationId;
            return (
              <Box
                key={loc.id}
                onClick={() => switchLocation(loc.id as LocationId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && switchLocation(loc.id as LocationId)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1.8,
                  borderRadius: tokens.radius.lg,
                  cursor: "pointer",
                  transition: tokens.transitions.spring,
                  bgcolor: isSelected ? locAccentPale : "transparent",
                  border: `1px solid ${isSelected ? locAccent : "transparent"}`,
                  "&:hover": { bgcolor: locAccentPale },
                }}
              >
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: isSelected ? locAccent : tokens.colors.line.medium, flexShrink: 0, transition: tokens.transitions.fast }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: isSelected ? locAccent : tokens.colors.text.secondary }}>
                    {loc.name}
                  </Typography>
                  <Stack direction="row" gap={0.8} alignItems="center">
                    <LocationOnIcon sx={{ fontSize: "0.75rem", color: tokens.colors.text.tertiary }} />
                    <Typography sx={{ fontSize: "0.78rem", color: tokens.colors.text.tertiary }}>
                      {loc.address}, {loc.city}
                    </Typography>
                  </Stack>
                </Box>
                {isSelected && (
                  <Chip
                    label="Viewing"
                    size="small"
                    sx={{ bgcolor: locAccent, color: "#fff", fontWeight: 700, fontSize: "0.7rem", height: 20 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" }, gap: { xs: 4, lg: 5 }, alignItems: "start" }}>
          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <Box
            component="aside"
            sx={{
              position: { lg: "sticky" },
              top: { lg: 110 },
              border: `1px solid ${tokens.colors.line.subtle}`,
              borderRadius: tokens.radius.xl,
              bgcolor: tokens.colors.bg.card,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 2.5, borderBottom: `1px solid ${tokens.colors.line.subtle}` }}>
              <Typography sx={{ fontWeight: 700 }}>Menu sections</Typography>
              <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.82rem" }}>
                {selectedLocation.name} · {categories.length} sections
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", lg: "block" },
                overflowX: { xs: "auto", lg: "visible" },
                p: 1,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                maskImage: { xs: "linear-gradient(to right, transparent 0%, black 5%, black 90%, transparent 100%)", lg: "none" },
                WebkitMaskImage: { xs: "linear-gradient(to right, transparent 0%, black 5%, black 90%, transparent 100%)", lg: "none" },
              }}
            >
              {categories.map((category) => {
                const selected = category.id === (active?.id);
                return (
                  <Button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    fullWidth
                    sx={{
                      justifyContent: "space-between",
                      flexShrink: 0,
                      width: { xs: "auto", lg: "100%" },
                      minWidth: { xs: 150, lg: 0 },
                      color: selected ? tokens.colors.text.primary : tokens.colors.text.secondary,
                      bgcolor: "transparent",
                      borderRadius: tokens.radius.md,
                      borderLeft: selected ? `3px solid ${accent}` : "3px solid transparent",
                      pl: selected ? "13px" : 2,
                      "&:hover": { bgcolor: tokens.colors.bg.warm, color: tokens.colors.text.primary },
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: selected ? 700 : 500 }}>{category.name}</Box>
                    <Box component="span" sx={{ fontSize: "0.78rem", fontWeight: 700, color: selected ? accent : tokens.colors.text.disabled }}>
                      {category.items.length}
                    </Box>
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* ── Items grid ──────────────────────────────────────────── */}
          {active && (
            <Box
              sx={{
                bgcolor: tokens.colors.bg.warm,
                borderRadius: tokens.radius.xl,
                p: { xs: 3, md: 4 },
                border: `1px solid ${tokens.colors.line.subtle}`,
              }}
            >
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={2.5} sx={{ mb: 3 }}>
                <Box>
                  <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: accent }} />
                    <Typography sx={{ color: tokens.colors.text.tertiary, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {selectedLocation.name}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3rem" }, lineHeight: 1 }}>
                    {active.name}
                  </Typography>
                  {active.description && (
                    <Typography sx={{ color: tokens.colors.text.tertiary, mt: 1, fontSize: "0.88rem" }}>
                      {active.description}
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  startIcon={<ShoppingBagOutlinedIcon />}
                  onClick={() => setOrderOpen(true)}
                  sx={{ alignSelf: { sm: "flex-start" }, bgcolor: accentDark, color: "#fff", "&:hover": { bgcolor: accent } }}
                >
                  Order from {selectedLocation.name}
                </Button>
              </Stack>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
                {active.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      bgcolor: tokens.colors.bg.card,
                      border: `1px solid ${tokens.colors.line.subtle}`,
                      borderRadius: tokens.radius.lg,
                      p: 2,
                      display: "flex",
                      gap: 2,
                      transition: tokens.transitions.fast,
                      "&:hover": { borderColor: tokens.colors.line.medium, boxShadow: tokens.shadows.xs },
                    }}
                  >
                    {item.imageUrl && (
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ width: 72, height: 72, objectFit: "cover", borderRadius: tokens.radius.md, flexShrink: 0 }}
                      />
                    )}
                    <Stack gap={0.5} sx={{ flex: 1, minWidth: 0, justifyContent: "space-between" }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, lineHeight: 1.3 }}>{item.name}</Typography>
                        {item.description && (
                          <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.8rem", mt: 0.3, lineHeight: 1.5 }}>
                            {item.description}
                          </Typography>
                        )}
                      </Box>
                      {item.hasMeasurements && item.measurements.length > 0 ? (
                        <Stack direction="row" gap={1} flexWrap="wrap">
                          {item.measurements.map((m) => (
                            <Chip
                              key={m.label}
                              label={`${m.label} ${m.price}`}
                              size="small"
                              sx={{ bgcolor: tokens.colors.primary.pale, color: tokens.colors.primary.dark, fontWeight: 700, fontSize: "0.72rem" }}
                            />
                          ))}
                        </Stack>
                      ) : item.price ? (
                        <Typography sx={{ fontFamily: tokens.fonts.display, color: accentDark, fontSize: "1.1rem", fontWeight: 700 }}>
                          {item.price}
                        </Typography>
                      ) : null}
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      <LocationSelectionModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </Box>
  );
}
