import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const Catering: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Box 
      id="catering"
      sx={{ 
        py: { xs: 10, lg: 25 }, 
        bgcolor: '#050505',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center" direction="row-reverse">
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
                <Typography 
                variant="overline" 
                sx={{ 
                  color: 'primary.main', 
                  letterSpacing: '0.2em', 
                  mb: 4, 
                  display: 'block',
                  fontFamily: '"Manrope", sans-serif'
                }}
              >
                // Catering
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 400, 
                  textTransform: 'uppercase', 
                  lineHeight: 0.9,
                  mb: 6,
                  fontSize: { xs: '3rem', md: '5rem' },
                  fontFamily: '"Tenor Sans", sans-serif'
                }}
              >
                Curated <br />
                <Box component="span" sx={{ color: 'transparent', WebkitTextStroke: '1px #fff' }}>Events</Box>
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  mb: 6, 
                  fontWeight: 300, 
                  lineHeight: 1.8,
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderLeft: '1px solid',
                  pl: 4,
                  fontFamily: '"Manrope", sans-serif'
                }}
              >
                Elevate your next gathering with the distinct flavors of Nanthus. 
                From corporate luncheons to grand weddings, we bring a touch of 
                culinary excellence to every occasion.
              </Typography>
              
              <Button 
                variant="outlined" 
                color="secondary" 
                size="large"
                sx={{ 
                  borderRadius: 0, 
                  borderWidth: 1, 
                  px: 5, 
                  py: 2,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  fontFamily: '"Manrope", sans-serif',
                  letterSpacing: '0.1em',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 1,
                    bgcolor: 'transparent'
                  }
                }}
              >
                Inquire Now
              </Button>
            </motion.div>
          </Grid>
          
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: 'relative' }}>
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.2, delay: 0.2 }}
                 style={{ y }}
              >
                <Box 
                  component="img" 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
                  sx={{ width: '100%', height: 600, objectFit: 'cover', filter: 'brightness(0.6) contrast(1.2)' }}
                />
              </motion.div>

              {/* Stats/Float Element */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  background: '#1a1a1a',
                  padding: '40px',
                  maxWidth: '300px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Typography variant="h3" sx={{ color: 'primary.main', mb: 0, fontWeight: 400, fontFamily: '"Tenor Sans", sans-serif' }}>
                  500+
                </Typography>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', fontFamily: '"Manrope", sans-serif' }}>
                  Events Catered
                </Typography>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Catering;
