import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { menuCategories, pageImages } from "../data/site";
import { tokens } from "../theme";

const popularItems = menuCategories.flatMap((category) =>
  category.items
    .filter((item) => item.popular)
    .map((item) => ({ ...item, category: category.category })),
);
const firstCategory = menuCategories[0]!;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(firstCategory.category);
  const active = useMemo(
    () => menuCategories.find((category) => category.category === activeCategory) ?? firstCategory,
    [activeCategory],
  );

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
          <Chip icon={<SearchOutlinedIcon />} label={`${menuCategories.length} sections`} />
          <Chip icon={<LocalFireDepartmentIcon />} label={`${popularItems.length} popular picks`} />
        </Stack>
      </PageBanner>

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
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
                Pick a category to preview prices.
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "flex", lg: "block" }, overflowX: { xs: "auto", lg: "visible" }, p: 1 }}>
              {menuCategories.map((category) => {
                const selected = category.category === activeCategory;
                return (
                  <Button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    fullWidth
                    sx={{
                      justifyContent: "space-between",
                      flexShrink: 0,
                      width: { xs: "auto", lg: "100%" },
                      minWidth: { xs: 150, lg: 0 },
                      color: selected ? tokens.colors.text.primary : tokens.colors.text.secondary,
                      bgcolor: "transparent",
                      borderRadius: tokens.radius.md,
                      borderLeft: selected ? `3px solid ${tokens.colors.primary.main}` : "3px solid transparent",
                      pl: selected ? "13px" : 2,
                      "&:hover": { bgcolor: tokens.colors.bg.warm, color: tokens.colors.text.primary },
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: selected ? 700 : 500 }}>{category.category}</Box>
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: selected ? tokens.colors.primary.main : tokens.colors.text.disabled,
                      }}
                    >
                      {category.items.length}
                    </Box>
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* ── Main content ────────────────────────────────────────── */}
          <Stack gap={5}>
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
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: tokens.colors.primary.main }} />
                    <Typography sx={{ color: tokens.colors.text.tertiary, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Selected section
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2.2rem", md: "3rem" }, lineHeight: 1 }}>
                    {active.category}
                  </Typography>
                  {active.subtitle && (
                    <Typography sx={{ color: tokens.colors.text.tertiary, mt: 1, fontSize: "0.88rem" }}>
                      {active.subtitle}
                    </Typography>
                  )}
                </Box>
                <Button
                  component={Link}
                  to="/order"
                  variant="contained"
                  startIcon={<ShoppingBagOutlinedIcon />}
                  sx={{
                    alignSelf: { sm: "flex-start" },
                    bgcolor: tokens.colors.text.primary,
                    color: tokens.colors.text.inverse,
                    "&:hover": { bgcolor: tokens.colors.primary.dark },
                  }}
                >
                  Order pickup
                </Button>
              </Stack>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
                {active.items.map((item) => (
                  <Box
                    key={item.name}
                    sx={{
                      bgcolor: tokens.colors.bg.card,
                      border: `1px solid ${tokens.colors.line.subtle}`,
                      borderRadius: tokens.radius.lg,
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 2,
                      transition: tokens.transitions.fast,
                      "&:hover": {
                        borderColor: tokens.colors.line.medium,
                        boxShadow: tokens.shadows.xs,
                      },
                    }}
                  >
                    <Stack gap={0.75} sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, lineHeight: 1.3 }}>{item.name}</Typography>
                      {item.popular && (
                        <Chip
                          size="small"
                          icon={<LocalFireDepartmentIcon />}
                          label="Popular"
                          sx={{
                            bgcolor: tokens.colors.primary.pale,
                            color: tokens.colors.primary.dark,
                            alignSelf: "flex-start",
                            fontSize: "0.7rem",
                            height: 22,
                          }}
                        />
                      )}
                    </Stack>
                    <Typography
                      sx={{
                        fontFamily: tokens.fonts.display,
                        color: tokens.colors.text.primary,
                        fontSize: "1.18rem",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── Popular picks ───────────────────────────────────── */}
            <Box>
              <SectionHeading
                eyebrow="Popular"
                title="Most requested dishes"
                body="A quick list for guests who already know they want the house favorites."
              />
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", xl: "repeat(3, 1fr)" }, gap: 0, mt: 3 }}>
                {popularItems.slice(0, 12).map((item, index) => (
                  <Box
                    key={`${item.category}-${item.name}`}
                    sx={{
                      borderBottom: `1px solid ${tokens.colors.line.subtle}`,
                      borderRight: { sm: index % 2 === 0 ? `1px solid ${tokens.colors.line.subtle}` : "none", xl: index % 3 < 2 ? `1px solid ${tokens.colors.line.subtle}` : "none" },
                      py: 2,
                      px: 2,
                      transition: tokens.transitions.fast,
                      "&:hover": { bgcolor: tokens.colors.bg.warm },
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: "0.92rem" }}>{item.name}</Typography>
                    <Stack direction="row" justifyContent="space-between" gap={2} sx={{ mt: 0.4 }}>
                      <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.8rem" }}>{item.category}</Typography>
                      <Typography sx={{ color: tokens.colors.secondary.dark, fontWeight: 700, fontSize: "0.88rem" }}>{item.price}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
