import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import theme from "../theme";
import Header from "./Header";
import Footer from "./Footer";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

const pageTitleKeys: Record<string, string> = {
  "/":          "layout.pageTitles.home",
  "/menu":      "layout.pageTitles.menu",
  "/specials":  "layout.pageTitles.specials",
  "/order":     "layout.pageTitles.order",
  "/catering":  "layout.pageTitles.catering",
  "/contact":   "layout.pageTitles.contact",
  "/gallery":   "layout.pageTitles.gallery",
  "*":          "layout.pageTitles.notFound",
};

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  // Document title
  useEffect(() => {
    const key = pageTitleKeys[location.pathname] ?? pageTitleKeys["/"];
    document.title = t(key);
  }, [location.pathname, t]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="grain-overlay" aria-hidden="true" />
      <a href="#main-content" className="skip-link">{t("layout.skipToContent")}</a>

      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />

        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            id="main-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ flex: 1 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
