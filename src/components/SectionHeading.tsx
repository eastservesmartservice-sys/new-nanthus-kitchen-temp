import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  const eyebrowColor = dark ? tokens.colors.dark.textTertiary : tokens.colors.text.tertiary;
  const titleColor = dark ? tokens.colors.dark.textPrimary : tokens.colors.text.primary;
  const bodyColor = dark ? tokens.colors.dark.textSecondary : tokens.colors.text.secondary;

  return (
    <Box sx={{ textAlign: centered ? "center" : "left", maxWidth: centered ? 720 : 620, mx: centered ? "auto" : 0 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: tokens.colors.primary.main,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: eyebrowColor,
          }}
        >
          {eyebrow}
        </Typography>
      </Box>
      <Typography
        component="h2"
        sx={{
          fontFamily: tokens.fonts.display,
          fontSize: { xs: "2.1rem", md: "3rem" },
          lineHeight: 1.05,
          color: titleColor,
          mb: body ? 2 : 0,
        }}
      >
        {title}
      </Typography>
      {body && (
        <Typography sx={{ color: bodyColor, fontSize: "0.98rem", lineHeight: 1.8 }}>
          {body}
        </Typography>
      )}
    </Box>
  );
}
