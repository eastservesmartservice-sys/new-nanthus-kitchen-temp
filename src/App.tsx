import { useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Lenis from 'lenis';
import theme from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Special from './components/Special';
import Offers from './components/Offers';
import DineIn from './components/DineIn';
import TakeAway from './components/TakeAway';
import Catering from './components/Catering';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Global Noise Overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.04,
          zIndex: 9998,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Header />
        <Hero />
        <Menu />
        <Special />
        <Offers />
        <DineIn />
        <TakeAway />
        <Catering />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
