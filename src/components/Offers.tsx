import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const offers = [
    {
      title: 'FIRST ORDER',
      description: 'Get 20% off on your first order with us!',
      code: 'WELCOME20'
    },
    {
      title: 'FAMILY PACK',
      description: 'Order for 4+ people and save $25 on orders above $100',
      code: 'FAMILY25'
    }
];

const Offers: React.FC = () => {
  return (
    <Box 
      id="offers"
      sx={{ 
        py: { xs: 15, lg: 25 }, 
        bgcolor: '#050505', 
        position: 'relative',
        minHeight: '80vh',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
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
                EXCLUSIVE ACCESS
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
                Member <br />
                <Box component="span" sx={{ color: 'transparent', WebkitTextStroke: '1px #fff' }}>Perks</Box>
              </Typography>
              
              <Box>
                  {offers.map((offer, index) => (
                      <Box 
                        key={index} 
                        component={motion.div}
                        whileHover={{ x: 10 }}
                        sx={{ 
                            mb: 4, 
                            borderLeft: '1px solid rgba(255,255,255,0.1)', 
                            pl: 3,
                            position: 'relative',
                            transition: 'all 0.3s',
                            cursor: 'default',
                            '&:hover': {
                                borderLeftColor: 'primary.main',
                                bgcolor: 'rgba(255,255,255,0.02)'
                            }
                        }}
                      >
                          <Typography variant="h5" sx={{ color: 'white', fontWeight: 400, mb: 1, fontFamily: '"Tenor Sans", sans-serif' }}>{offer.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2, fontFamily: '"Manrope", sans-serif' }}>{offer.description}</Typography>
                          <Typography variant="overline" sx={{ 
                              border: '1px solid rgba(255,255,255,0.2)', 
                              px: 2, 
                              py: 0.5, 
                              color: 'primary.main', 
                              letterSpacing: '2px',
                              fontFamily: '"Manrope", sans-serif',
                              fontSize: '0.75rem',
                              display: 'inline-block'
                           }}>
                              CODE: [{offer.code}]
                          </Typography>
                      </Box>
                  ))}
              </Box>

            </motion.div>
          </Grid>
          
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: 'relative', p: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
               {/* Decorative corners */}
               <Box sx={{ position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTop: '2px solid #FFCF40', borderLeft: '2px solid #FFCF40' }} />
               <Box sx={{ position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottom: '2px solid #FFCF40', borderRight: '2px solid #FFCF40' }} />

              <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1 }}
              >
                <Box 
                  component="img" 
                  src="https://images.unsplash.com/photo-1626202168015-6e2bb14bbe79?w=1200"
                  sx={{ width: '100%', height: 500, objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.8)' }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Offers;
