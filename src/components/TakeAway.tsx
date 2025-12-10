import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const TakeAway: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Box 
      id="take-away"
      sx={{ 
        py: { xs: 10, lg: 25 }, 
        bgcolor: '#080808', 
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'primary.main', 
                  letterSpacing: '0.2em', 
                  mb: 4, 
                  display: 'block' 
                }}
              >
                At Home
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  lineHeight: 0.9,
                  mb: 6,
                  fontSize: { xs: '3rem', md: '5rem' }
                }}
              >
                Flavors <br />
                <Box component="span" sx={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>Delivered</Box>
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
                  pl: 4
                }}
              >
                Enjoy our culinary masterpieces in the comfort of your own home. 
                Seamless online ordering for pickup or delivery.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
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
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 1,
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Order Online
                </Button>
                <Button 
                  variant="text" 
                  size="large"
                  sx={{ 
                    px: 5, 
                    py: 2,
                    color: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      color: 'white',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  UberEats &rarr;
                </Button>
              </Box>
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
                  src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200"
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
                  bottom: -40,
                  left: -40,
                  background: '#1a1a1a',
                  padding: '40px',
                  maxWidth: '300px'
                }}
              >
                <Typography variant="h3" sx={{ color: 'primary.main', mb: 0, fontWeight: 900 }}>
                  20%
                </Typography>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}>
                  Off First Order
                </Typography>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TakeAway;
