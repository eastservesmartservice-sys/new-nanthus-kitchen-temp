import { Box, Button, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { locations } from "../data/site";
import { tokens } from "../theme";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LocationSelectionModal({ open, onClose }: Props) {
  const openOrder = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", p: { xs: 2.5, md: 3.5 }, borderBottom: `1px solid ${tokens.colors.line.subtle}` }}>
        <Box>
          <Box className="eyebrow-pill" sx={{ mb: 1.5 }}>
            Online pickup
          </Box>
          <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "1.9rem", md: "2.4rem" }, lineHeight: 1.05 }}>
            Choose your counter
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="Close order location modal">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Typography sx={{ color: tokens.colors.text.secondary, mb: 3 }}>
          Select the location you want to pick up from. You will continue through our ordering partner.
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          {locations.map((location) => {
            const accent = location.accent === "tomato" ? tokens.colors.primary.main : tokens.colors.secondary.main;
            return (
              <Box
                key={location.id}
                sx={{
                  border: `1px solid ${tokens.colors.line.subtle}`,
                  borderRadius: tokens.radius.xl,
                  overflow: "hidden",
                  bgcolor: tokens.colors.bg.card,
                }}
              >
                <Box sx={{ height: 170, position: "relative" }}>
                  <Box component="img" src={location.image} alt={`${location.name} pickup counter`} className="image-cover" />
                  <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(23, 27, 23, 0.72) 100%)" }} />
                  <Typography sx={{ position: "absolute", left: 18, bottom: 16, color: tokens.colors.text.inverse, fontFamily: tokens.fonts.display, fontSize: "1.8rem" }}>
                    {location.name}
                  </Typography>
                </Box>
                <Stack gap={1.4} sx={{ p: 2.5 }}>
                  <Stack direction="row" gap={1.2} alignItems="flex-start">
                    <LocationOnIcon sx={{ color: accent, fontSize: "1rem", mt: 0.25 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{location.address}</Typography>
                      <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.84rem" }}>{location.city}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" gap={1.2} alignItems="center">
                    <PhoneIcon sx={{ color: accent, fontSize: "0.95rem" }} />
                    <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.86rem" }}>
                      {location.phones.join(" / ")}
                    </Typography>
                  </Stack>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => openOrder(location.orderLink)}
                    sx={{
                      mt: 1,
                      bgcolor: accent,
                      color: "#fff",
                      "&:hover": { bgcolor: location.accent === "tomato" ? tokens.colors.primary.dark : tokens.colors.secondary.dark },
                    }}
                  >
                    Order from {location.name}
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
