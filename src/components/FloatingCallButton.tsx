import { useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { locations } from "../data/site";
import { tokens } from "../theme";

export default function FloatingCallButton() {
  const [open, setOpen] = useState(false);

  const call = (phone: string) => {
    window.location.assign(`tel:${phone.replace(/\D/g, "")}`);
    setOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <Tooltip title="Call us" placement="left">
        <Box
          onClick={() => setOpen(true)}
          aria-label="Call the restaurant"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          sx={{
            position: "fixed",
            bottom: { xs: 24, md: 32 },
            right: { xs: 20, md: 28 },
            zIndex: 1200,
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: tokens.colors.primary.main,
            color: tokens.colors.text.primary,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            boxShadow: `0 4px 20px rgba(245, 166, 35, 0.45), 0 2px 8px rgba(0,0,0,0.2)`,
            transition: tokens.transitions.spring,
            "&:hover": {
              bgcolor: tokens.colors.primary.light,
              transform: "scale(1.1)",
              boxShadow: `0 6px 28px rgba(245, 166, 35, 0.6), 0 4px 12px rgba(0,0,0,0.22)`,
            },
            "&:active": { transform: "scale(0.96)" },
            /* Pulse ring */
            "&::before": {
              content: '""',
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: `2px solid ${tokens.colors.primary.main}`,
              opacity: 0,
              animation: "call-pulse 2.4s ease-out infinite",
            },
          }}
        >
          <CallIcon sx={{ fontSize: "1.4rem" }} />
        </Box>
      </Tooltip>

      {/* Branch selection dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: tokens.radius.xl,
            overflow: "hidden",
            bgcolor: tokens.colors.bg.base,
            border: `1px solid ${tokens.colors.line.subtle}`,
            m: 2,
          },
        }}
        slotProps={{
          backdrop: {
            sx: { bgcolor: "rgba(23,27,23,0.55)", backdropFilter: "blur(6px)" },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            px: 3,
            pt: 3,
            pb: 2,
            borderBottom: `1px solid ${tokens.colors.line.subtle}`,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.2,
                py: 0.5,
                borderRadius: "999px",
                bgcolor: tokens.colors.primary.pale,
                border: `1px solid rgba(245,166,35,0.3)`,
                mb: 1,
              }}
            >
              <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: tokens.colors.primary.main }} />
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: tokens.colors.primary.dark }}>
                Call us
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: tokens.fonts.display,
                fontSize: "1.5rem",
                lineHeight: 1.1,
                color: tokens.colors.text.primary,
              }}
            >
              Choose a branch
            </Typography>
            <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.82rem", mt: 0.4 }}>
              Select a location to call directly
            </Typography>
          </Box>
          <IconButton
            onClick={() => setOpen(false)}
            size="small"
            aria-label="Close"
            sx={{ mt: -0.5, color: tokens.colors.text.tertiary }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Location cards */}
        <Stack gap={1.5} sx={{ p: 2.5 }}>
          {locations.map((location) => {
            const isPrimary = location.accent === "tomato";
            const accent = isPrimary ? tokens.colors.primary.main : tokens.colors.secondary.main;
            const accentPale = isPrimary ? tokens.colors.primary.pale : tokens.colors.secondary.pale;
            const accentDark = isPrimary ? tokens.colors.primary.dark : tokens.colors.secondary.dark;

            return (
              <Box key={location.id}>
                {/* Location header */}
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: accent }} />
                  <Typography
                    sx={{
                      fontFamily: tokens.fonts.display,
                      fontSize: "1.15rem",
                      color: tokens.colors.text.primary,
                      lineHeight: 1,
                    }}
                  >
                    {location.name}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 1.2, pl: 0.3 }}>
                  <LocationOnIcon sx={{ fontSize: "0.82rem", color: tokens.colors.text.disabled }} />
                  <Typography sx={{ fontSize: "0.8rem", color: tokens.colors.text.tertiary }}>
                    {location.address}, {location.city}
                  </Typography>
                </Stack>

                {/* Phone number buttons */}
                <Stack gap={0.8}>
                  {location.phones.map((phone) => (
                    <Box
                      key={phone}
                      onClick={() => call(phone)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Call ${location.name} at ${phone}`}
                      onKeyDown={(e) => e.key === "Enter" && call(phone)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 2,
                        py: 1.4,
                        borderRadius: tokens.radius.md,
                        border: `1px solid ${tokens.colors.line.subtle}`,
                        bgcolor: tokens.colors.bg.card,
                        cursor: "pointer",
                        transition: tokens.transitions.fast,
                        "&:hover": {
                          bgcolor: accentPale,
                          borderColor: accent,
                          transform: "translateX(3px)",
                        },
                        "&:active": { transform: "translateX(1px)" },
                      }}
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: tokens.radius.sm,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: accentPale,
                          color: accentDark,
                          flexShrink: 0,
                          transition: tokens.transitions.fast,
                        }}
                      >
                        <PhoneIcon sx={{ fontSize: "1rem" }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: tokens.colors.text.primary, letterSpacing: "0.02em" }}>
                          {phone}
                        </Typography>
                      </Box>
                      <CallIcon sx={{ fontSize: "1rem", color: accent, opacity: 0.7 }} />
                    </Box>
                  ))}
                </Stack>

                {/* Divider between locations */}
                {location.id !== locations[locations.length - 1]?.id && (
                  <Box sx={{ height: "1px", bgcolor: tokens.colors.line.faint, mt: 2 }} />
                )}
              </Box>
            );
          })}
        </Stack>
      </Dialog>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes call-pulse {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.7); }
        }
      `}</style>
    </>
  );
}
