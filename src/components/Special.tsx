import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid, Chip, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const todaySpecials = [
  {
    title: 'THALI SPECIAL',
    description: 'Complete Sri Lankan Thali with rice, sambar, rasam, 2 vegetable curries, papad, pickle, and sweet. A complete meal experience!',
    originalPrice: '$24.99',
    discountPrice: '$18.99',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    discount: '25% OFF',
    timeLeft: '8 hours',
    available: 'Today Only',
  },
  {
    title: 'BIRYANI FEAST',
    description: 'Premium Hyderabadi Dum Biryani with choice of chicken, mutton, or paneer. Served with raita, mirchi ka salan, and boiled egg.',
    originalPrice: '$22.99',
    discountPrice: '$17.99',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    discount: '22% OFF',
    timeLeft: '12 hours',
    available: 'Weekend Special',
  },
  {
    title: 'FAMILY COMBO',
    description: '2 Curries + 6 Naan/Roti + Rice + 4 Drinks + Dessert. Perfect for family of 4. Mix & match your favorite dishes!',
    originalPrice: '$79.99',
    discountPrice: '$59.99',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    discount: '$20 OFF',
    timeLeft: '3 days',
    available: 'This Week',
  },
];

// Countdown timer component
const CountdownTimer: React.FC<{ endTime: string }> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const hours = parseInt(endTime) || 8;
    const endTimestamp = Date.now() + hours * 60 * 60 * 1000;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = endTimestamp - now;
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      {[
        { value: timeLeft.hours, label: 'HRS' },
        { value: timeLeft.minutes, label: 'MIN' },
        { value: timeLeft.seconds, label: 'SEC' },
      ].map((item) => (
        <Box key={item.label}>
          <motion.div
            key={item.value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Paper
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 1,
                minWidth: 45,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                {String(item.value).padStart(2, '0')}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
                {item.label}
              </Typography>
            </Paper>
          </motion.div>
        </Box>
      ))}
    </Box>
  );
};

const Special: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate featured special
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % todaySpecials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      id="special"
      sx={{ 
        py: { xs: 10, lg: 16 }, 
        background: 'linear-gradient(180deg, #fff 0%, #f8f9fa 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231565C0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Chip 
                icon={<WhatshotIcon />}
                label="HOT DEALS" 
                color="error" 
                sx={{ mb: 2, fontWeight: 'bold', fontSize: '0.9rem' }}
              />
            </motion.div>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                color: 'primary.main',
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2
              }}
            >
              TODAY'S SPECIALS
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Limited time offers you don't want to miss. Fresh deals updated daily!
            </Typography>
          </Box>
        </motion.div>

        {/* Featured Special - Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              mb: 6,
              background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
              position: 'relative',
            }}
          >
            <Grid container>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ position: 'relative', height: { xs: 300, md: 400 } }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '100%' }}
                    >
                      <Box
                        component="img"
                        src={todaySpecials[activeIndex].image}
                        alt={todaySpecials[activeIndex].title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Discount badge */}
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'white',
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 20px rgba(255,143,0,0.4)',
                      }}
                    >
                      {todaySpecials[activeIndex].discount}
                    </Box>
                  </motion.div>
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Box 
                  sx={{ 
                    p: { xs: 4, md: 6 }, 
                    color: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Chip 
                        icon={<AccessTimeIcon />}
                        label={todaySpecials[activeIndex].available}
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)', 
                          color: 'white',
                          mb: 2 
                        }}
                      />
                      
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                        {todaySpecials[activeIndex].title}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                        {todaySpecials[activeIndex].description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            textDecoration: 'line-through', 
                            opacity: 0.6 
                          }}
                        >
                          {todaySpecials[activeIndex].originalPrice}
                        </Typography>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: 'secondary.main'
                          }}
                        >
                          {todaySpecials[activeIndex].discountPrice}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                          Offer ends in:
                        </Typography>
                        <CountdownTimer endTime={todaySpecials[activeIndex].timeLeft} />
                      </Box>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          startIcon={<LocalOfferIcon />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 20px rgba(255,143,0,0.4)',
                          }}
                        >
                          CLAIM THIS DEAL
                        </Button>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </Grid>
            </Grid>
            
            {/* Carousel indicators */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 20, 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
              }}
            >
              {todaySpecials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    width: index === activeIndex ? 30 : 10,
                    height: 10,
                    borderRadius: 5,
                    bgcolor: index === activeIndex ? 'secondary.main' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Quick Deals Grid */}
        <Grid container spacing={3}>
          {todaySpecials.map((special, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={special.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    border: activeIndex === index ? '2px solid' : '1px solid',
                    borderColor: activeIndex === index ? 'primary.main' : 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    }
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={special.image}
                      alt={special.title}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {special.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                        >
                          {special.originalPrice}
                        </Typography>
                        <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 'bold' }}>
                          {special.discountPrice}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={special.discount} 
                      size="small" 
                      color="error"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Special;
