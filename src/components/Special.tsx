import React, { useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const todaySpecials = [
  {
    title: 'Thali Special',
    description: 'A complete culinary journey on a single platter. Rice, sambar, rasam, 2 vegetable curries, and sweet.',
    price: '$18.99',
    originalPrice: '$24.99',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200',
    tag: 'Limited Time'
  },
  {
    title: 'Biryani Feast',
    description: 'Royal Hyderabadi flavors. Served with raita, mirchi ka salan, and boiled egg.',
    price: '$17.99',
    originalPrice: '$22.99',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200',
    tag: 'Weekend Exclusive'
  }
];

const SpecialItem: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax text
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  const isEven = index % 2 === 0;

  return (
    <Box 
      ref={ref} 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        py: 10
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' }, alignItems: 'center', gap: { xs: 8, md: 15 } }}>
          
          {/* Image Side */}
          <Box sx={{ flex: 1, position: 'relative', height: { xs: '50vh', md: '80vh' }, width: '100%', overflow: 'hidden' }}>
             <motion.div style={{ scale: imgScale, width: '100%', height: '100%' }}>
                <Box 
                  component="img" 
                  src={item.image} 
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(20%) brightness(0.9)',
                    borderRadius: '4px'
                  }} 
                />
             </motion.div>
             {/* Tech Overlay lines */}
             <Box sx={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
          </Box>

          {/* Text Side */}
          <Box sx={{ flex: 1, position: 'relative' }}>
             <motion.div style={{ y }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontFamily: '"Manrope", sans-serif', letterSpacing: '0.3em', mb: 2, display: 'block' }}>
                  — {item.tag}
                </Typography>
                <Typography variant="h1" sx={{ color: 'white', fontFamily: '"Tenor Sans", sans-serif', fontSize: { xs: '4rem', md: '7rem' }, lineHeight: 0.9, mb: 4 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Manrope", sans-serif', fontSize: '1.2rem', maxWidth: 500, mb: 6, lineHeight: 1.8 }}>
                  {item.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
                  <Typography variant="h3" sx={{ color: 'white', fontFamily: '"Tenor Sans", sans-serif' }}>
                    {item.price}
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', fontFamily: '"Manrope", sans-serif' }}>
                    {item.originalPrice}
                  </Typography>
                </Box>

                <Button
                   variant="contained" 
                   color="primary"
                   size="large"
                   sx={{ 
                     borderRadius: 0, 
                     px: 6,
                     py: 2,
                     color: 'black',
                     fontFamily: '"Manrope", sans-serif',
                     fontWeight: 700,
                     letterSpacing: '0.1em',
                     bgcolor: 'primary.main',
                     '&:hover': { 
                        bgcolor: 'white'
                     }
                   }}
                >
                  ORDER NOW
                </Button>
             </motion.div>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

const Special: React.FC = () => {
  return (
    <Box id="special" sx={{ bgcolor: '#050505', position: 'relative' }}>
      {/* Sticky Background Title */}
      <Box sx={{ position: 'sticky', top: 50, left: 0, width: '100%', textAlign: 'center', opacity: 0.05, pointerEvents: 'none', zIndex: 0 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '20vw', 
            fontFamily: '"Tenor Sans", sans-serif', 
            fontWeight: 900, 
            color: 'white',
            lineHeight: 1
          }}
        >
          SPECIAL
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, mt: -20 }}>
        {todaySpecials.map((item, index) => (
          <SpecialItem key={item.title} item={item} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Special;
