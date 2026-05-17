import { Link } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { tokens } from "../theme";

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", bgcolor: tokens.colors.bg.warm }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2.5, md: 6 }, py: 8, textAlign: "center" }}>
        <Stack alignItems="center" gap={2.5}>
          <Box sx={{ width: 64, height: 64, borderRadius: tokens.radius.xl, display: "grid", placeItems: "center", bgcolor: tokens.colors.primary.pale, color: tokens.colors.primary.dark }}>
            <RestaurantMenuOutlinedIcon />
          </Box>
          <Typography className="stat-num" sx={{ fontSize: { xs: "5rem", md: "7rem" }, color: tokens.colors.primary.main }}>
            404
          </Typography>
          <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: { xs: "2rem", md: "2.6rem" }, lineHeight: 1 }}>
            This page is off the menu.
          </Typography>
          <Typography sx={{ color: tokens.colors.text.secondary }}>
            The link may have moved, but the kitchen is still open.
          </Typography>
          <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackIcon />} sx={{ bgcolor: tokens.colors.text.primary, color: tokens.colors.text.inverse }}>
            Back home
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
