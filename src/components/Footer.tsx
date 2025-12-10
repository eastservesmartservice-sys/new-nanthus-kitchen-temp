import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: <FacebookIcon fontSize="large" />, label: 'Facebook' },
  { icon: <InstagramIcon fontSize="large" />, label: 'Instagram' },
  { icon: <TwitterIcon fontSize="large" />, label: 'Twitter' },
];

const BigLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
  <motion.a
    href={href}
    whileHover={{ x: 20 }}
    style={{
      textDecoration: 'none',
      display: 'block',
      color: 'white',
      marginBottom: '1rem',
    }}
  >
      <Typography
      variant="h2"
      sx={{
        fontWeight: 400,
        textTransform: 'uppercase',
        fontSize: { xs: '3rem', md: '6rem' },
        lineHeight: 0.9,
        fontFamily: '"Tenor Sans", sans-serif',
        transition: 'color 0.3s ease',
        '&:hover': {
          color: 'transparent',
          WebkitTextStroke: '1px #fff',
        }
      }}
    >
      {children}
    </Typography>
  </motion.a>
);

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#050505', color: 'common.white', pt: 10, pb: 5, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <BigLink href="#menu">Menu</BigLink>
            <BigLink href="#about">Story</BigLink>
            <BigLink href="#events">Events</BigLink>
            <BigLink href="#contact">Contact</BigLink>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
             <Box 
                component="img" 
                src="/new_nanthus_kitchen_logo.png" 
                alt="Nanthus Kitchen" 
                sx={{ height: 40, mb: 4, filter: 'brightness(0) invert(1)' }} 
             />
             <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2, fontFamily: '"Manrope", sans-serif' }}>
               Location
             </Typography>
             <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, fontWeight: 300, fontFamily: '"Manrope", sans-serif' }}>
               456 Spice Avenue<br />
               Toronto, ON M5V 2T6
             </Typography>

             <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2 }}>
               Connect
             </Typography>
             <Stack direction="row" spacing={2}>
               {socialLinks.map((social) => (
                 <IconButton 
                   key={social.label} 
                   sx={{ 
                     color: 'white',
                     border: '1px solid rgba(255,255,255,0.1)',
                     '&:hover': { bgcolor: 'white', color: 'black' }
                    }}
                  >
                   {social.icon}
                 </IconButton>
               ))}
             </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 15, borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, display: 'flex', justifyContent: 'space-between', opacity: 0.4 }}>
          <Typography variant="body2">© {new Date().getFullYear()} Nanthu's Kitchen</Typography>
          <Typography variant="body2">Designed by AK Vision Systems</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;