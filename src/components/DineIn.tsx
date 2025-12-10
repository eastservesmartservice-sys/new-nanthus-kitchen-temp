import React, { useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const DineIn: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["inset(10% 20% 10% 20%)", "inset(0% 0% 0% 0%)"]
  );

  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1]);

  return (
    <Box 
      id="dine-in"
      ref={containerRef}
      sx={{ 
        py: { xs: 10, lg: 0 }, 
        bgcolor: '#050505',
        position: 'relative',
        minHeight: '120vh', // Extra height for scroll effect
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Full Width Background Image with Reveal */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          clipPath,
          scale,
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.5)'
          }}
        />
        {/* Cinematic Grain/Overlay */}
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.3)' }} />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'primary.main', 
              letterSpacing: '0.3em', 
              mb: 2, 
              display: 'block',
              fontFamily: '"Manrope", sans-serif'
            }}
          >
            THE EXPERIENCE
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontWeight: 400, 
              textTransform: 'uppercase', 
              mb: 4,
              fontSize: { xs: '3rem', md: '7rem' },
              fontFamily: '"Tenor Sans", sans-serif',
              lineHeight: 0.9
            }}
          >
            Senses <br />
            Awakened
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              mb: 6, 
              fontWeight: 300, 
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
              fontFamily: '"Manrope", sans-serif'
            }}
          >
            Immerse yourself in an atmosphere where traditional Sri Lankan heritage meets modern luxury. 
            Our dining space is designed to be an extension of the culinary artistry on your plate.
          </Typography>
          
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderRadius: 0, 
              borderWidth: 1, 
              px: 6, 
              py: 2,
              color: 'white',
              borderColor: 'white',
              fontFamily: '"Manrope", sans-serif',
              letterSpacing: '0.1em',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                bgcolor: 'white',
                color: 'black',
                borderColor: 'white'
              }
            }}
          >
            Reserve Your Table
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DineIn;
