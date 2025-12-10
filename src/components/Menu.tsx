import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const menuItems = [
  { category: 'Starters', title: 'Chicken 65', price: '$12.99', description: 'Spicy, deep-fried chicken bites', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800' },
  { category: 'Starters', title: 'Mutton Rolls', price: '$8.99', description: 'Crispy rolls stuffed with spiced mutton', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
  { category: 'Mains', title: 'Chicken Biryani', price: '$16.99', description: 'Basmati rice, saffron, exotic spices', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
  { category: 'Mains', title: 'Butter Chicken', price: '$14.99', description: 'Creamy tomato sauce, aromatic spices', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
  { category: 'Mains', title: 'Lamb Rogan Josh', price: '$19.99', description: 'Slow-cooked lamb, Kashmiri spices', image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800' },
  { category: 'Mains', title: 'Fish Curry', price: '$17.99', description: 'Coconut curry, mustard, curry leaves', image: 'https://images.unsplash.com/photo-1626777553635-be342a766ed0?w=800' },
  { category: 'Vegetarian', title: 'Masala Dosa', price: '$12.99', description: 'Rice crepe, potato masala, sambar', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800' },
  { category: 'Vegetarian', title: 'Paneer Tikka', price: '$13.99', description: 'Grilled cheese cubes, bell peppers', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800' },
  { category: 'Desserts', title: 'Gulab Jamun', price: '$6.99', description: 'Sweet milk solids in rose syrup', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=800' },
];

const categories = ['All', ...new Set(menuItems.map(item => item.category))];

const MenuItem: React.FC<{ item: any; index: number; onHover: (img: string | null) => void }> = ({ item, index, onHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => onHover(item.image)}
      onMouseLeave={() => onHover(null)}
      style={{ position: 'relative', cursor: 'none' }} // Hide default cursor for immersion
    >
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr auto', md: '2fr 3fr 1fr' },
          gap: 2,
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          py: 4,
          px: 2,
          transition: 'all 0.4s ease',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.02)',
            pl: 4, // Slide effect
            borderBottomColor: 'rgba(255,207,64, 0.3)'
          }
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: '"Tenor Sans", sans-serif',
            fontWeight: 400, 
            color: 'white',
            letterSpacing: '0.02em',
            fontSize: { xs: '1.2rem', md: '1.8rem' },
          }}
        >
          {item.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.5)', 
            fontFamily: '"Manrope", sans-serif',
            display: { xs: 'none', md: 'block' } 
          }}
        >
          {item.description}
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 400,
            fontFamily: '"Manrope", sans-serif',
            textAlign: 'right'
          }}
        >
          {item.price}
        </Typography>
      </Box>
    </motion.div>
  );
};

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  
  // Cursor follower logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Offset by a bit so it doesn't block text
    mouseX.set(e.clientX + 20); 
    mouseY.set(e.clientY - 100);
  };

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <Box 
      id="menu"
      onMouseMove={handleMouseMove}
      sx={{ 
        py: { xs: 15, lg: 25 }, 
        bgcolor: '#050505', 
        position: 'relative',
        minHeight: '100vh',
        cursor: hoveredImage ? 'none' : 'default' // Custom cursor feel
      }}
    >
      {/* Floating Image Follower */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          pointerEvents: 'none',
          zIndex: 99,
          opacity: hoveredImage ? 1 : 0,
          scale: hoveredImage ? 1 : 0.8,
        }}
      >
         <Box
           sx={{
             width: 300,
             height: 400,
             overflow: 'hidden',
             borderRadius: '4px', // Slight radius for elegance
             border: '1px solid rgba(255,207,64,0.3)',
             boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
           }}
         >
           <AnimatePresence mode="wait">
             {hoveredImage && (
               <motion.img
                 key={hoveredImage}
                 src={hoveredImage}
                 initial={{ opacity: 0, scale: 1.2 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.4 }}
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               />
             )}
           </AnimatePresence>
         </Box>
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 12, textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'primary.main', 
              fontFamily: '"Manrope", sans-serif',
              mb: 2, 
              display: 'block',
              letterSpacing: '0.3em'
            }}
          >
            OUR SELECTION
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontWeight: 400, 
              textTransform: 'uppercase', 
              fontSize: { xs: '3rem', md: '6rem' },
              fontFamily: '"Tenor Sans", sans-serif'
            }}
          >
            The Menu
          </Typography>

          {/* Elegant Tabs */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 6, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Typography 
                key={category}
                onClick={() => setActiveCategory(category)}
                variant="body1"
                sx={{ 
                  cursor: 'pointer',
                  color: activeCategory === category ? 'primary.main' : 'rgba(255,255,255,0.5)', 
                  fontWeight: 600, 
                  textTransform: 'uppercase',
                  fontFamily: '"Manrope", sans-serif',
                  letterSpacing: '0.1em',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: activeCategory === category ? '100%' : '0%',
                    height: '1px',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ minHeight: 600 }}>
          <AnimatePresence mode="wait">
             <motion.div
               key={activeCategory}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5 }}
             >
                {filteredItems.map((item, index) => (
                  <MenuItem key={item.title} item={item} index={index} onHover={setHoveredImage} />
                ))}
             </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

export default Menu;
