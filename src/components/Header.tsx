import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = navItems.map(item => item.sectionId);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'HOME', sectionId: 'hero' },
    { label: 'MENU', sectionId: 'menu' },
    { label: 'TODAY SPECIAL', sectionId: 'special' },
    { label: 'OFFERS', sectionId: 'offers' },
    { label: 'DINE IN', sectionId: 'dine-in' },
    { label: 'TAKE AWAY', sectionId: 'take-away' },
    { label: 'CATERING', sectionId: 'catering' },
    { label: 'CONTACT US', sectionId: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', bgcolor: 'background.default', height: '100%' }}>
      <Box sx={{ my: 2 }}>
        <Box 
          component="img" 
          src="/new_nanthus_kitchen_logo.png" 
          alt="New Nanthu's Kitchen" 
          sx={{ height: 50, filter: 'brightness(0) invert(1)' }} 
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(item.sectionId)}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  color: activeSection === item.sectionId ? 'primary.main' : 'white', 
                  '& .MuiTypography-root': { fontWeight: 'bold' }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      elevation={isScrolled ? 0 : 0}
      sx={{ 
        top: 0,
        left: 0,
        right: 0,
        transition: 'all 0.3s ease-in-out',
        backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        zIndex: 1100,
        py: isScrolled ? 1 : 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4, lg: 6 } }}>
        {/* Logo Area */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            component="img" 
            src="/new_nanthus_kitchen_logo.png" 
            alt="New Nanthu's Kitchen" 
            sx={{ 
              height: { xs: 40, md: isScrolled ? 45 : 55 },
              transition: 'height 0.3s ease',
              filter: 'brightness(0) invert(1)'
            }} 
          />
        </Box>

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: { md: 2, lg: 4 }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                sx={{
                  color: activeSection === item.sectionId ? 'primary.main' : 'white',
                  fontWeight: 500,
                  fontSize: { md: '0.75rem', lg: '0.85rem' },
                  letterSpacing: '0.1em',
                  px: 0,
                  minWidth: 'auto',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'primary.main',
                    transform: activeSection === item.sectionId ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: activeSection === item.sectionId ? 'left' : 'right',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  },
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                    '&::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'left',
                    }
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, bgcolor: 'background.default' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
