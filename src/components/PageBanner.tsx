import type { ReactNode } from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { tokens } from "../theme";

interface PageBannerProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}

export default function PageBanner({
  eyebrow,
  title,
  highlight,
  subtitle,
  image,
  imageAlt,
  children,
}: PageBannerProps) {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "52vh", sm: "60vh", md: "66.67vh" },
        height: { xs: "52vh", sm: "60vh", md: "66.67vh" },
        display: "flex",
        alignItems: "flex-end",
        bgcolor: tokens.colors.bg.inverse,
        color: tokens.colors.dark.textPrimary,
      }}
    >
      {image && (
        <>
          <Box
            component="img"
            src={image}
            alt={imageAlt ?? title}
            className="image-cover"
            sx={{ position: "absolute", inset: 0, opacity: 0.72 }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(23,27,23,0.1) 0%, rgba(23,27,23,0.55) 70%, rgba(23,27,23,0.82) 100%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(23,27,23,0.35) 0%, transparent 60%)",
            }}
          />
        </>
      )}

      <Container
        maxWidth="xl"
        sx={{ position: "relative", px: { xs: 2.5, md: 6 }, pt: { xs: 7, md: 9 }, pb: { xs: 6, md: 8 } }}
      >
        <Stack gap={2.5} alignItems="flex-start" sx={{ maxWidth: 780 }}>
          <Chip
            label={eyebrow}
            size="small"
            sx={{
              bgcolor: "rgba(245, 166, 35, 0.18)",
              color: tokens.colors.primary.light,
              fontWeight: 700,
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              border: `1px solid rgba(245, 166, 35, 0.28)`,
              borderRadius: "999px",
            }}
          />
          <Typography
            component="h1"
            sx={{
              fontFamily: tokens.fonts.display,
              fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.8rem" },
              lineHeight: 1,
              color: tokens.colors.dark.textPrimary,
            }}
          >
            {title}
            {highlight && (
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: tokens.colors.primary.main,
                  WebkitTextStroke: "0px",
                }}
              >
                {highlight}
              </Box>
            )}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                color: tokens.colors.dark.textSecondary,
                maxWidth: 580,
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                lineHeight: 1.8,
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children && (
            <Box sx={{ "& .MuiChip-root": { bgcolor: "rgba(251,250,246,0.1)", color: tokens.colors.dark.textSecondary, borderColor: tokens.colors.dark.borderSubtle } }}>
              {children}
            </Box>
          )}
        </Stack>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.secondary.main} 60%, transparent 100%)`,
            opacity: 0.6,
          }}
        />
      </Container>
    </Box>
  );
}
