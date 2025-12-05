import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Chip, Tab, Tabs, Rating } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';

const menuCategories = {
  'All': [
    {
      title: 'CHICKEN BIRYANI',
      description: 'Aromatic basmati rice layered with tender chicken, exotic spices, and saffron. Served with raita.',
      price: '$16.99',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
      badge: 'BEST SELLER',
      badgeColor: 'secondary' as const,
      rating: 4.9,
      reviews: 324,
      spiceLevel: 2,
    },
    {
      title: 'BUTTER CHICKEN',
      description: 'Succulent chicken in a creamy tomato-based sauce with butter and aromatic spices.',
      price: '$14.99',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
      badge: 'CHEF SPECIAL',
      badgeColor: 'primary' as const,
      rating: 4.8,
      reviews: 256,
      spiceLevel: 1,
    },
    {
      title: 'MASALA DOSA',
      description: 'Crispy rice crepe filled with spiced potato masala. Served with sambar and chutneys.',
      price: '$12.99',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600',
      badge: 'VEGETARIAN',
      badgeColor: 'success' as const,
      rating: 4.7,
      reviews: 189,
      spiceLevel: 1,
    },
    {
      title: 'LAMB ROGAN JOSH',
      description: 'Tender lamb slow-cooked in Kashmiri spices with a rich, aromatic gravy.',
      price: '$19.99',
      image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600',
      badge: 'PREMIUM',
      badgeColor: 'warning' as const,
      rating: 4.9,
      reviews: 145,
      spiceLevel: 3,
    },
    {
      title: 'PANEER TIKKA',
      description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.',
      price: '$13.99',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600',
      badge: 'POPULAR',
      badgeColor: 'info' as const,
      rating: 4.6,
      reviews: 198,
      spiceLevel: 2,
    },
    {
      title: 'FISH CURRY',
      description: 'Fresh fish cooked in a tangy coconut-based curry with curry leaves and mustard.',
      price: '$17.99',
      image: 'https://images.unsplash.com/photo-1626777553635-be342a766ed0?w=600',
      badge: 'SEAFOOD',
      badgeColor: 'primary' as const,
      rating: 4.7,
      reviews: 167,
      spiceLevel: 2,
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 60, opacity: 0, rotateX: -15 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

// 3D Card tilt effect component
const Card3D: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateY((x - centerX) / 10);
    setRotateX(-(y - centerY) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

const SpiceLevel: React.FC<{ level: number }> = ({ level }) => (
  <Box sx={{ display: 'flex', gap: 0.5 }}>
    {[1, 2, 3].map((i) => (
      <LocalFireDepartmentIcon 
        key={i} 
        sx={{ 
          fontSize: 16, 
          color: i <= level ? '#ff5722' : '#e0e0e0',
          filter: i <= level ? 'drop-shadow(0 0 3px #ff5722)' : 'none'
        }} 
      />
    ))}
  </Box>
);

const Menu: React.FC = () => {
  const [activeTab] = useState('All');
  const menuItems = menuCategories[activeTab as keyof typeof menuCategories];

  return (
    <Box 
      id="menu"
      sx={{ 
        py: { xs: 10, lg: 16 }, 
        bgcolor: 'background.default', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21, 101, 192, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 143, 0, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Chip 
            icon={<FavoriteIcon />}
            label="CUSTOMER FAVORITES" 
            color="secondary" 
            sx={{ mb: 2, fontWeight: 'bold' }}
          />
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: 'primary.main',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            OUR SIGNATURE DISHES
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 6, 
              color: 'text.secondary', 
              maxWidth: 600, 
              mx: 'auto',
              fontWeight: 400
            }}
          >
            Discover the authentic flavors of Sri Lanka with our carefully crafted dishes, 
            made with the finest ingredients and traditional recipes.
          </Typography>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Tabs 
            value={0} 
            centered 
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ 
              mb: 6,
              '& .MuiTab-root': {
                fontWeight: 'bold',
                fontSize: { xs: '0.8rem', sm: '1rem' },
                mx: { xs: 0.5, sm: 1, md: 2 },
                minWidth: { xs: 80, sm: 100 },
                px: { xs: 1, sm: 2 },
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: { xs: 'flex-start', md: 'center' },
              }
            }}
          >
            <Tab label="All Dishes" />
            <Tab label="Vegetarian" />
            <Tab label="Non-Veg" />
            <Tab label="Seafood" />
          </Tabs>
        </motion.div>

        <AnimatePresence mode="wait">
          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            key={activeTab}
          >
            {menuItems.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.title}>
                <motion.div 
                  variants={itemVariants}
                  custom={index}
                >
                  <Card3D>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        bgcolor: 'white',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 20px 60px rgba(21, 101, 192, 0.2)',
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <motion.div 
                          whileHover={{ scale: 1.1 }} 
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                          <CardMedia
                            component="div"
                            sx={{ 
                              pt: '75%', 
                              backgroundSize: 'cover', 
                              backgroundPosition: 'center',
                            }}
                            image={item.image}
                            title={item.title}
                          />
                        </motion.div>
                        
                        {/* Gradient overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
                          }}
                        />
                        
                        {item.badge && (
                          <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <Chip
                              label={item.badge}
                              color={item.badgeColor}
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                              }}
                            />
                          </motion.div>
                        )}
                        
                        {/* Price tag */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 12,
                            left: 12,
                            bgcolor: 'secondary.main',
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                          }}
                        >
                          {item.price}
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 800, 
                              textTransform: 'uppercase',
                              fontSize: '1rem'
                            }}
                          >
                            {item.title}
                          </Typography>
                          <SpiceLevel level={item.spiceLevel} />
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mb: 2, minHeight: 40 }}
                        >
                          {item.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating 
                            value={item.rating} 
                            precision={0.1} 
                            readOnly 
                            size="small"
                            emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                          />
                          <Typography variant="body2" color="text.secondary">
                            ({item.reviews})
                          </Typography>
                        </Box>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            fullWidth 
                            variant="outlined" 
                            color="primary"
                            sx={{ 
                              mt: 2, 
                              borderRadius: 2,
                              fontWeight: 'bold',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white',
                              }
                            }}
                          >
                            ADD TO ORDER
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Card3D>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, gap: 2, flexWrap: 'wrap' }}>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(21, 101, 192, 0.3)' }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ px: 6, py: 1.5, borderRadius: '50px', fontWeight: 'bold' }}
              >
                VIEW FULL MENU
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outlined" 
                color="secondary" 
                size="large" 
                sx={{ px: 6, py: 1.5, borderRadius: '50px', fontWeight: 'bold' }}
              >
                DOWNLOAD PDF
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Menu;
