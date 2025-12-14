import { useEffect, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import Lenis from "lenis";
import theme from "./theme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Special from "./components/Special";
import TakeAway from "./components/TakeAway";
import Catering from "./components/Catering";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && lenisRef.current) {
        const element = document.getElementById(hash);
        if (element) {
          lenisRef.current.scrollTo(element);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // On initial load
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" id="main-content">
          <Box id="hero">
            <Hero />
          </Box>
          <Box id="menu">
            <Menu />
          </Box>
          <Box id="special">
            <Special />
          </Box>
          <Box id="takeaway">
            <TakeAway />
          </Box>
          <Box id="catering">
            <Catering />
          </Box>
          <Box id="contact">
            <Contact />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
