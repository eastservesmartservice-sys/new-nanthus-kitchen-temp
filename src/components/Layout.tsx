import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import theme, { tokens } from "../theme";
import FloatingCallButton from "./FloatingCallButton";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";
import SplashScreen from "./SplashScreen";

const pageTitles: Record<string, string> = {
  "/": "layout.pageTitles.home",
  "/menu": "layout.pageTitles.menu",
  "/specials": "layout.pageTitles.specials",
  "/order": "layout.pageTitles.order",
  "/catering": "layout.pageTitles.catering",
  "/contact": "layout.pageTitles.contact",
  "/gallery": "layout.pageTitles.gallery",
  "*": "layout.pageTitles.notFound",
};

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const key = pageTitles[location.pathname] ?? pageTitles["*"];
    document.title = t(key);
  }, [location.pathname, t]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SplashScreen />
      <a href="#main-content" className="skip-link">
        {t("layout.skipToContent")}
      </a>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: tokens.colors.bg.base }}>
        <Header />
        <Box component="main" id="main-content" key={location.pathname} className="route-main" sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Footer />
        <FloatingCallButton />
        <ScrollToTop />
      </Box>
    </ThemeProvider>
  );
}
