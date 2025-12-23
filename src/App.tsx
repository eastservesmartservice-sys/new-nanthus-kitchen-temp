import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Lenis from 'lenis';
import theme from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Special from "./components/Special";
import TakeAway from "./components/TakeAway";
import Catering from "./components/Catering";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChristmasOffersModal from "./components/ChristmasOffersModal";
import { routeToSection } from "./router";

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle route-based scrolling
  useEffect(() => {
    const sectionId = routeToSection[location.pathname];

    if (sectionId) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Update document title based on route
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "New Nanthu's Kitchen | Authentic Sri Lankan Cuisine in Canada",
      "/home": "New Nanthu's Kitchen | Authentic Sri Lankan Cuisine in Canada",
      "/our-menu":
        "Our Menu | New Nanthu's Kitchen - Authentic Sri Lankan Food",
      "/menu": "Our Menu | New Nanthu's Kitchen - Authentic Sri Lankan Food",
      "/specials": "Special Dishes | New Nanthu's Kitchen",
      "/order": "Order Takeaway | New Nanthu's Kitchen",
      "/takeaway": "Order Takeaway | New Nanthu's Kitchen",
      "/take-away": "Order Takeaway | New Nanthu's Kitchen",
      "/catering": "Catering Services | New Nanthu's Kitchen",
      "/contact": "Contact Us | New Nanthu's Kitchen",
      "/contact-us": "Contact Us | New Nanthu's Kitchen",
    };

    document.title = titles[location.pathname] || titles["/"];
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Christmas Offers Modal */}
      <ChristmasOffersModal />

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" id="main-content">
          <Hero />
          <Menu />
          <Special />
          <TakeAway />
          <Catering />
          <Contact />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
