import { Box, CircularProgress } from "@mui/material";
import { tokens } from "../theme";

export default function PageLoader() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
      <CircularProgress sx={{ color: tokens.colors.primary.main }} />
    </Box>
  );
}
