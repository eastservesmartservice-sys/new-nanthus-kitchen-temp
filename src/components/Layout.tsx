import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import theme from "../theme";
import Header from "./Header";
import Footer from "./Footer";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

const pageTitles: Record<string, string> = {
  "/":          "New Nanthu's Kitchen | Authentic Sri Lankan Cuisine",
  "/menu":      "Our Menu | New Nanthu's Kitchen",
  "/specials":  "Specials | New Nanthu's Kitchen",
  "/order":     "Order Pickup | New Nanthu's Kitchen",
  "/catering":  "Catering | New Nanthu's Kitchen",
  "/contact":   "Contact Us | New Nanthu's Kitchen",
};

export default function Layout() {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  // Document title
  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? pageTitles["/"];
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="grain-overlay" aria-hidden="true" />
      <a href="#main-content" className="skip-link">Skip to main content</a>

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
