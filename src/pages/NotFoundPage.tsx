import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        bgcolor: tokens.colors.bg.base,
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 10 }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: tokens.fonts.display,
            fontSize: { xs: "5rem", md: "8rem" },
            color: tokens.colors.primary.main,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {t("notFound.title")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: tokens.colors.text.primary,
            mt: 2,
            mb: 1,
            fontFamily: tokens.fonts.display,
            textTransform: "uppercase",
          }}
        >
          {t("notFound.heading")}
        </Typography>
        <Typography
          sx={{ color: tokens.colors.text.tertiary, mb: 4, fontSize: "0.95rem" }}
        >
          {t("notFound.body")}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            bgcolor: tokens.colors.primary.main,
            "&:hover": { bgcolor: tokens.colors.primary.dark },
            px: 4,
            py: 1.5,
            borderRadius: tokens.radius.sm,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {t("notFound.backHome")}
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
