import { ThemeProvider, CssBaseline, Box } from '@mui/material';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
