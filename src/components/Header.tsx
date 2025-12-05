import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <Box component="img" src="/new_nanthus_kitchen_logo.png" alt="New Nanthu's Kitchen" sx={{ height: 50 }} />
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
                  color: 'primary.main', 
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
      elevation={isScrolled ? 4 : 0}
      sx={{ 
        top: 0,
        left: 0,
        right: 0,
        transition: 'all 0.3s ease-in-out',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        zIndex: 1100,
        py: isScrolled ? 0 : 1
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
              height: { xs: 40, md: isScrolled ? 50 : 60 },
              transition: 'height 0.3s ease'
            }} 
          />
        </Box>

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: isScrolled ? 'primary.main' : 'white' }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: { md: 1, lg: 2 }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                sx={{
                  color: isScrolled ? 'primary.main' : 'white',
                  fontWeight: 700,
                  fontSize: { md: '0.75rem', lg: '0.85rem' },
                  px: { md: 1, lg: 1.5 },
                  minWidth: 'auto',
                  textShadow: isScrolled ? 'none' : '0px 2px 4px rgba(0,0,0,0.5)',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'transparent',
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
