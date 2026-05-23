import { useNavigate } from "react-router-dom";
import { Box, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { locations } from "../data/site";
import { tokens } from "../theme";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MenuLocationModal({ open, onClose }: Props) {
  const navigate = useNavigate();

  const goToMenu = (locationId: string) => {
    navigate(`/menu?location=${locationId}`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: tokens.radius.xl,
          overflow: "hidden",
          bgcolor: tokens.colors.bg.base,
          border: `1px solid ${tokens.colors.line.subtle}`,
        },
      }}
      slotProps={{
        backdrop: {
          sx: { bgcolor: "rgba(23, 27, 23, 0.58)", backdropFilter: "blur(8px)" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: { xs: 2.5, md: 3.5 },
          borderBottom: `1px solid ${tokens.colors.line.subtle}`,
        }}
      >
        <Box>
          <Box className="eyebrow-pill" sx={{ mb: 1.5 }}>
            View menu
          </Box>
          <Typography
            sx={{
              fontFamily: tokens.fonts.display,
              fontSize: { xs: "1.9rem", md: "2.4rem" },
              lineHeight: 1.05,
            }}
          >
            Choose your location
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="Close menu location modal">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Typography sx={{ color: tokens.colors.text.secondary, mb: 3 }}>
          Each counter has its own menu. Select a location to browse what's available.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {locations.map((location) => {
            const accent =
              location.accent === "tomato"
                ? tokens.colors.primary.main
                : tokens.colors.secondary.main;
            const accentDark =
              location.accent === "tomato"
                ? tokens.colors.primary.dark
                : tokens.colors.secondary.dark;
            const accentPale =
              location.accent === "tomato"
                ? tokens.colors.primary.pale
                : tokens.colors.secondary.pale;

            return (
              <Box
                key={location.id}
                onClick={() => goToMenu(location.id)}
                sx={{
                  border: `1px solid ${tokens.colors.line.subtle}`,
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  bgcolor: tokens.colors.bg.card,
                  cursor: "pointer",
                  transition: tokens.transitions.spring,
                  "&:hover": {
                    borderColor: accent,
                    boxShadow: `0 0 0 3px ${accentPale}`,
                    transform: "translateY(-3px)",
                  },
                  "&:hover .loc-img": { transform: "scale(1.04)" },
                }}
              >
                <Box sx={{ height: 170, position: "relative", overflow: "hidden" }}>
                  <Box
                    component="img"
                    src={location.image}
                    alt={`${location.name} counter`}
                    className="loc-img image-cover"
                    sx={{ transition: "transform 0.6s ease" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 20%, rgba(23, 27, 23, 0.72) 100%)",
                    }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      left: 18,
                      bottom: 16,
                      color: tokens.colors.text.inverse,
                      fontFamily: tokens.fonts.display,
                      fontSize: "1.8rem",
                    }}
                  >
                    {location.name}
                  </Typography>
                </Box>
                <Stack gap={1.2} sx={{ p: 2.5 }}>
                  <Stack direction="row" gap={1.2} alignItems="flex-start">
                    <LocationOnIcon sx={{ color: accent, fontSize: "1rem", mt: 0.25 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{location.address}</Typography>
                      <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.84rem" }}>
                        {location.city}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" gap={1.2} alignItems="center">
                    <RestaurantMenuIcon sx={{ color: accent, fontSize: "0.95rem" }} />
                    <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.86rem" }}>
                      Full menu available
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      mt: 0.5,
                      color: accentDark,
                      fontWeight: 700,
                      fontSize: "0.84rem",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: "0.84rem", color: "inherit" }}>
                      Browse {location.name} menu
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: "0.9rem" }} />
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
