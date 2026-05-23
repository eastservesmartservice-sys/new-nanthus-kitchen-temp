import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";

interface EyebrowPillProps {
  label: string;
  dark?: boolean;
  color?: "primary" | "secondary" | "neutral";
}

export default function EyebrowPill({ label, dark = false, color = "primary" }: EyebrowPillProps) {
  const dotColor =
    color === "secondary"
      ? tokens.colors.secondary.main
      : color === "neutral"
        ? dark
          ? tokens.colors.dark.textTertiary
          : tokens.colors.text.tertiary
        : tokens.colors.primary.main;

  const textColor =
    color === "secondary"
      ? dark
        ? tokens.colors.secondary.light
        : tokens.colors.secondary.main
      : color === "neutral"
        ? dark
          ? tokens.colors.dark.textTertiary
          : tokens.colors.text.tertiary
        : dark
          ? tokens.colors.primary.light
          : tokens.colors.primary.dark;

  const borderColor =
    color === "secondary"
      ? dark
        ? "rgba(25,118,111,0.3)"
        : tokens.colors.secondary.glow
      : color === "neutral"
        ? dark
          ? tokens.colors.dark.borderSubtle
          : tokens.colors.border.subtle
        : dark
          ? "rgba(245,166,35,0.3)"
          : "rgba(245,166,35,0.4)";

  const bgColor =
    color === "secondary"
      ? dark
        ? "rgba(25,118,111,0.1)"
        : tokens.colors.secondary.glow2
      : color === "neutral"
        ? dark
          ? "rgba(251,250,246,0.06)"
          : tokens.colors.bg.warm
        : dark
          ? "rgba(245,166,35,0.1)"
          : "rgba(245,166,35,0.08)";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: "999px",
        border: `1px solid ${borderColor}`,
        bgcolor: bgColor,
        width: "fit-content",
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: dotColor,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: textColor,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
