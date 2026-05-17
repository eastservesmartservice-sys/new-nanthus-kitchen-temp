import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { heroImage, locations, menuCategories, pageImages } from "../data/site";
import { tokens } from "../theme";
import LocationSelectionModal from "../components/LocationSelectionModal";
import SectionHeading from "../components/SectionHeading";

const featureLinks = [
  {
    title: "Menu built for every craving",
    body: "Kothu, biryani, Jaffna curries, seafood, short eats, grilled plates, and family portions.",
    path: "/menu",
    image: pageImages.menu,
    icon: <RestaurantMenuOutlinedIcon />,
  },
  {
    title: "Daily counter specials",
    body: "Quick pickup meals, weekend soup, and kitchen picks that change with the rhythm of service.",
    path: "/specials",
    image: pageImages.specials,
    icon: <StarBorderOutlinedIcon />,
  },
  {
    title: "Catering for gatherings",
    body: "Traditional Sri Lankan spreads for offices, weddings, cultural events, and milestone tables.",
    path: "/catering",
    image: pageImages.catering,
    icon: <GroupsOutlinedIcon />,
  },
];

const stats = [
  { value: "2", label: "Toronto spots" },
  { value: `${menuCategories.length}`, label: "Menu sections" },
  { value: "20–30", label: "Minute pickup" },
  { value: "10%", label: "First order offer" },
];

export default function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <Box>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          minHeight: { xs: "calc(100svh - 70px)", md: "calc(100svh - 112px)" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          color: tokens.colors.text.inverse,
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt="Sri Lankan banana leaf rice"
          className="image-cover"
          sx={{ position: "absolute", inset: 0 }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(23,27,23,0.92) 0%, rgba(23,27,23,0.62) 50%, rgba(23,27,23,0.18) 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 50%, rgba(23,27,23,0.5) 100%)",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            px: { xs: 2.5, md: 6 },
            py: { xs: 8, md: 10 },
          }}
        >
          <Stack gap={3.5} alignItems="flex-start" sx={{ maxWidth: 720 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: "999px",
                border: `1px solid rgba(245,166,35,0.4)`,
                bgcolor: "rgba(245,166,35,0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: tokens.colors.primary.main,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: tokens.colors.primary.light,
                }}
              >
                Sri Lankan pickup kitchen
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontFamily: tokens.fonts.display,
                fontSize: { xs: "3rem", sm: "4.2rem", md: "6rem" },
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
              }}
            >
              New{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>
                Nanthus
              </Box>{" "}
              Kitchen
            </Typography>

            <Typography
              sx={{
                color: tokens.colors.dark.textSecondary,
                fontSize: { xs: "1rem", md: "1.12rem" },
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              Jaffna inspired dishes, fast pickup, and catering built around
              generous portions and bold spice.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingBagOutlinedIcon />}
                onClick={() => setOrderOpen(true)}
                sx={{
                  bgcolor: tokens.colors.primary.main,
                  color: tokens.colors.text.primary,
                  fontWeight: 700,
                  px: 3.5,
                  "&:hover": { bgcolor: tokens.colors.primary.light },
                }}
              >
                Order pickup
              </Button>
              <Button
                component={Link}
                to="/menu"
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: tokens.colors.text.inverse,
                  borderColor: "rgba(251,250,246,0.35)",
                  backdropFilter: "blur(8px)",
                  "&:hover": {
                    borderColor: tokens.colors.text.inverse,
                    bgcolor: "rgba(251,250,246,0.1)",
                  },
                }}
              >
                Browse menu
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ── Marquee ───────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: tokens.colors.bg.inverse,
          color: tokens.colors.dark.textPrimary,
          borderTop: `1px solid ${tokens.colors.dark.borderSubtle}`,
          overflow: "hidden",
        }}
      >
        <Box className="marquee-track">
          {[...menuCategories.slice(0, 9), ...menuCategories.slice(0, 9)].map(
            (item, index) => (
              <Stack
                key={`${item.category}-${index}`}
                direction="row"
                alignItems="center"
                gap={2}
                sx={{ py: 1.8, px: 3, flexShrink: 0 }}
              >
                <LocalDiningOutlinedIcon
                  sx={{ fontSize: "1rem", color: tokens.colors.primary.main }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: "0.86rem" }}>
                  {item.category}
                </Typography>
              </Stack>
            ),
          )}
        </Box>
      </Box>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 7, md: 10 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            border: `1px solid ${tokens.colors.line.subtle}`,
            borderRadius: tokens.radius.xl,
            overflow: "hidden",
            bgcolor: tokens.colors.bg.card,
          }}
        >
          {stats.map((item, index) => (
            <Box
              key={item.label}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRight: {
                  md:
                    index < 3
                      ? `1px solid ${tokens.colors.line.subtle}`
                      : "none",
                },
                borderBottom: {
                  xs:
                    index < 2
                      ? `1px solid ${tokens.colors.line.subtle}`
                      : "none",
                  md: "none",
                },
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  bgcolor:
                    index % 2 === 0
                      ? tokens.colors.primary.main
                      : tokens.colors.secondary.main,
                  opacity: 0.7,
                },
              }}
            >
              <Typography
                className="stat-num"
                sx={{
                  fontSize: { xs: "2.2rem", md: "3rem" },
                  color: tokens.colors.text.primary,
                  lineHeight: 1,
                }}
              >
                {item.value}
              </Typography>
              <Typography
                sx={{
                  color: tokens.colors.text.tertiary,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  mt: 0.5,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Feature cards ─────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{ bgcolor: tokens.colors.bg.warm, py: { xs: 7, md: 10 } }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <SectionHeading
            eyebrow="Start here"
            title="Three ways into the kitchen"
            body="Choose the path that matches the way you are ordering today."
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2.5,
              mt: 4,
            }}
          >
            {featureLinks.map((item) => (
              <Box
                key={item.title}
                component={Link}
                to={item.path}
                sx={{
                  textDecoration: "none",
                  bgcolor: tokens.colors.bg.card,
                  border: `1px solid ${tokens.colors.line.subtle}`,
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  transition: tokens.transitions.spring,
                  display: "block",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: tokens.shadows.lg,
                    borderColor: tokens.colors.primary.main,
                  },
                  "&:hover .feature-img": {
                    transform: "scale(1.06)",
                  },
                  "&:hover .feature-icon": {
                    bgcolor: tokens.colors.primary.main,
                    color: tokens.colors.text.primary,
                  },
                }}
              >
                <Box
                  sx={{ height: 220, overflow: "hidden", position: "relative" }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    className="feature-img image-cover"
                    sx={{ transition: "transform 0.6s ease" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(23,27,23,0.5) 100%)",
                    }}
                  />
                </Box>
                <Stack gap={1.5} sx={{ p: 2.5 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: tokens.radius.md,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: tokens.colors.primary.pale,
                      color: tokens.colors.primary.dark,
                      transition: tokens.transitions.normal,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: tokens.colors.text.secondary,
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.body}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      color: tokens.colors.secondary.main,
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      mt: 0.5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                      Explore
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: "0.9rem" }} />
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── About / spice section ─────────────────────────────────────── */}
      <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
              gap: { xs: 5, md: 8 },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                aspectRatio: "4 / 3",
                borderRadius: tokens.radius.xl,
                overflow: "hidden",
                border: `1px solid ${tokens.colors.line.subtle}`,
                position: "relative",
                "&:hover img": { transform: "scale(1.04)" },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1495714393975-3fb6c1c661af?w=1400&q=84&auto=format&fit=crop"
                alt="Prepared Sri Lankan dishes on a restaurant table"
                className="image-cover"
                sx={{ transition: "transform 0.8s ease" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  bgcolor: "rgba(23,27,23,0.82)",
                  backdropFilter: "blur(10px)",
                  borderRadius: tokens.radius.md,
                  px: 2,
                  py: 1.2,
                  border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                }}
              >
                <Stack direction="row" gap={1} alignItems="center">
                  <VerifiedOutlinedIcon
                    sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }}
                  />
                  <Typography
                    sx={{
                      color: tokens.colors.dark.textPrimary,
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    Authentic Jaffna recipes
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Stack gap={3}>
              <SectionHeading
                eyebrow="Our style"
                title="Built around spice, rice, heat, and pickup speed"
                body="The menu covers everyday plates and celebration food without losing the Jaffna backbone: curry, sambol, short eats, grilled meats, seafood, and rice dishes that travel well."
              />
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {[
                  "Banana leaf",
                  "Kothu",
                  "Lamprais",
                  "Chicken 65",
                  "Seafood kool",
                  "Biryani",
                ].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      bgcolor: tokens.colors.secondary.pale,
                      color: tokens.colors.secondary.dark,
                      fontWeight: 700,
                      border: `1px solid ${tokens.colors.secondary.glow}`,
                    }}
                  />
                ))}
              </Stack>
              <Button
                component={Link}
                to="/gallery"
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  alignSelf: "flex-start",
                  borderColor: tokens.colors.line.medium,
                  color: tokens.colors.text.primary,
                  "&:hover": {
                    borderColor: tokens.colors.secondary.main,
                    color: tokens.colors.secondary.main,
                  },
                }}
              >
                See the food
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ── Locations ─────────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: tokens.colors.bg.inverse,
          color: tokens.colors.dark.textPrimary,
          py: { xs: 7, md: 10 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 } }}>
          <SectionHeading
            eyebrow="Locations"
            title="Choose your nearest counter"
            align="center"
            dark
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2.5,
              mt: 4,
            }}
          >
            {locations.map((location) => (
              <Box
                key={location.id}
                sx={{
                  bgcolor: tokens.colors.dark.surface,
                  border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  transition: tokens.transitions.spring,
                  "&:hover": {
                    borderColor: tokens.colors.primary.main,
                    boxShadow: tokens.shadows.orange,
                  },
                  "&:hover .loc-img": { transform: "scale(1.04)" },
                }}
              >
                <Box
                  sx={{
                    height: { xs: 200, md: 240 },
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={location.image}
                    alt={`${location.name} restaurant counter`}
                    className="loc-img image-cover"
                    sx={{ transition: "transform 0.7s ease" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 30%, rgba(23,27,23,0.85) 100%)",
                    }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 18,
                      left: 22,
                      fontFamily: tokens.fonts.display,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      color: tokens.colors.dark.textPrimary,
                      lineHeight: 1,
                    }}
                  >
                    {location.name}
                  </Typography>
                </Box>
                <Stack gap={1.5} sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography
                    sx={{
                      color: tokens.colors.dark.textSecondary,
                      fontSize: "0.9rem",
                    }}
                  >
                    {location.address}, {location.city}
                  </Typography>
                  <Typography
                    sx={{
                      color: tokens.colors.dark.textTertiary,
                      fontSize: "0.82rem",
                    }}
                  >
                    {location.hours}
                  </Typography>
                  <Stack
                    direction="row"
                    gap={1.2}
                    flexWrap="wrap"
                    sx={{ pt: 0.5 }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setOrderOpen(true)}
                      sx={{
                        bgcolor: tokens.colors.primary.main,
                        color: tokens.colors.text.primary,
                        fontWeight: 700,
                        "&:hover": { bgcolor: tokens.colors.primary.light },
                      }}
                    >
                      Order here
                    </Button>
                    <Button
                      component="a"
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<MapOutlinedIcon />}
                      sx={{
                        borderColor: tokens.colors.dark.borderLight,
                        color: tokens.colors.dark.textSecondary,
                        "&:hover": {
                          borderColor: tokens.colors.dark.textPrimary,
                          color: tokens.colors.dark.textPrimary,
                        },
                      }}
                    >
                      Map
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{ py: { xs: 7, md: 10 }, bgcolor: tokens.colors.bg.warm }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2.5, md: 6 } }}>
          <Box
            sx={{
              bgcolor: tokens.colors.bg.inverse,
              borderRadius: tokens.radius.xl,
              p: { xs: 3.5, md: 6 },
              border: `1px solid ${tokens.colors.dark.borderSubtle}`,
              textAlign: "center",
            }}
          >
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
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: tokens.colors.primary.main,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: tokens.colors.primary.light,
                }}
              >
                Updates
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: tokens.fonts.display,
                fontSize: { xs: "2rem", md: "2.8rem" },
                lineHeight: 1.05,
                color: tokens.colors.dark.textPrimary,
                mb: 1.5,
              }}
            >
              Get specials before lunch
            </Typography>
            <Typography
              sx={{
                color: tokens.colors.dark.textSecondary,
                mb: 4,
                maxWidth: 480,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Join the email list for specials, menu additions, and catering
              notes. No spam — unsubscribe any time.
            </Typography>

            {subscribed ? (
              <Stack alignItems="center" gap={1}>
                <VerifiedOutlinedIcon
                  sx={{ color: tokens.colors.primary.main, fontSize: "2rem" }}
                />
                <Typography
                  sx={{
                    color: tokens.colors.dark.textPrimary,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  You're on the list.
                </Typography>
                <Typography
                  sx={{
                    color: tokens.colors.dark.textTertiary,
                    fontSize: "0.88rem",
                  }}
                >
                  We'll be in touch with specials and news.
                </Typography>
              </Stack>
            ) : (
              <Box
                component="form"
                onSubmit={subscribe}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: { xs: "column", sm: "row" },
                  maxWidth: 480,
                  mx: "auto",
                }}
              >
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: tokens.colors.dark.card,
                      "& fieldset": {
                        borderColor: tokens.colors.dark.borderLight,
                      },
                      "&:hover fieldset": {
                        borderColor: tokens.colors.dark.borderLight,
                      },
                      "& input": { color: tokens.colors.dark.textPrimary },
                    },
                    "& .MuiInputLabel-root": {
                      color: tokens.colors.dark.textTertiary,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 4,
                    flexShrink: 0,
                    bgcolor: tokens.colors.primary.main,
                    color: tokens.colors.text.primary,
                    fontWeight: 700,
                    "&:hover": { bgcolor: tokens.colors.primary.light },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <LocationSelectionModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
      />
    </Box>
  );
}
