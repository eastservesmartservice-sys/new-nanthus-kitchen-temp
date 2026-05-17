import { Box } from "@mui/material";
import { tokens } from "../theme";

interface ThreeBackgroundProps {
  opacity?: number;
}

export default function ThreeBackground({ opacity = 0.45 }: ThreeBackgroundProps) {
  return (
    <Box
      className="particle-canvas line-pattern"
      aria-hidden="true"
      sx={{
        opacity,
        backgroundColor: tokens.colors.bg.warm,
        maskImage: "linear-gradient(180deg, black, transparent)",
        WebkitMaskImage: "linear-gradient(180deg, black, transparent)",
      }}
    />
  );
}
