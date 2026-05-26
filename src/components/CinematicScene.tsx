import { Box } from "@mui/material";
import { heroImage, heroImageSet } from "../data/site";
import { tokens } from "../theme";

interface CinematicSceneProps {
  image?: string;
  tone?: "dark" | "light";
}

export default function CinematicScene({ image = heroImage, tone = "dark" }: CinematicSceneProps) {
  const dark = tone === "dark";

  return (
    <Box className="cinematic-canvas" aria-hidden="true" sx={{ overflow: "hidden" }}>
      <Box
        component="img"
        src={image}
        srcSet={image === heroImage ? heroImageSet.srcSet : undefined}
        sizes={image === heroImage ? heroImageSet.sizes : undefined}
        alt=""
        loading="lazy"
        decoding="async"
        className="image-cover"
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: dark
            ? "linear-gradient(90deg, rgba(23, 27, 23, 0.82), rgba(23, 27, 23, 0.22))"
            : `linear-gradient(90deg, ${tokens.colors.bg.base}, rgba(251, 250, 246, 0.35))`,
        }}
      />
    </Box>
  );
}
