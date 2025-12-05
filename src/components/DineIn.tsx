import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Rating, Avatar, AvatarGroup } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AccessibleIcon from '@mui/icons-material/Accessible';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const amenities = [
  { icon: <WifiIcon />, label: 'Free WiFi' },
  { icon: <LocalParkingIcon />, label: 'Parking' },
  { icon: <MusicNoteIcon />, label: 'Live Music (Weekends)' },
  { icon: <ChildCareIcon />, label: 'Kid Friendly' },
  { icon: <AccessibleIcon />, label: 'Wheelchair Access' },
  { icon: <EventSeatIcon />, label: 'Private Dining' },
];

const reviews = [
  {
    name: 'Priya S.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    text: 'The best Sri Lankan food in Canada! The ambiance is perfect for family dinners.',
    date: '2 weeks ago'
  },
  {
    name: 'Raj M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    text: 'Amazing biryani and the service is exceptional. Highly recommend the thali!',
    date: '1 month ago'
  },
  {
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    text: 'Such a warm and welcoming place. The staff made us feel right at home.',
    date: '3 weeks ago'
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
];

const DineIn: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Box 
      id="dine-in"
      sx={{ 
        py: { xs: 10, lg: 16 }, 
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              icon={<RestaurantIcon />}
              label="DINE WITH US" 
              color="primary" 
              sx={{ mb: 2, fontWeight: 'bold' }}
            />
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                color: 'primary.main',
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2
              }}
            >
              AN UNFORGETTABLE EXPERIENCE
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Step into our warm, elegantly designed space where traditional meets modern. 
              Perfect for family celebrations, romantic dinners, or casual gatherings.
            </Typography>
          </Box>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              position: 'relative',
              height: { xs: 300, md: 500 },
              borderRadius: 4,
              overflow: 'hidden',
              mb: 8,
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
              alt="Restaurant Interior"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                left: 40,
                color: 'white',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Reserve Your Table
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                Open Daily: 11:00 AM - 10:00 PM
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: '50px', px: 4, fontWeight: 'bold' }}
                >
                  BOOK A TABLE
                </Button>
              </motion.div>
            </Box>
            
            {/* Floating rating badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                top: 30,
                right: 30,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <StarIcon sx={{ color: '#FFD700' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>4.9</Typography>
                <Typography variant="body2" color="text.secondary">(500+ reviews)</Typography>
              </Paper>
            </motion.div>
          </Box>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h5" 
              sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
            >
              What We Offer
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {amenities.map((amenity, index) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={amenity.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          '& .MuiSvgIcon-root': { color: 'white' }
                        }
                      }}
                    >
                      <Box sx={{ color: 'primary.main', mb: 1 }}>
                        {amenity.icon}
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {amenity.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Gallery */}
        <Box sx={{ mb: 8, overflow: 'hidden' }}>
          <Typography 
            variant="h5" 
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
          >
            Gallery
          </Typography>
          <motion.div
            style={{ x }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[...galleryImages, ...galleryImages].map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, zIndex: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    sx={{
                      width: 280,
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              What Our Guests Say
            </Typography>
            <AvatarGroup max={5} sx={{ justifyContent: 'center', mb: 2 }}>
              {reviews.map((review) => (
                <Avatar key={review.name} src={review.avatar} alt={review.name} />
              ))}
            </AvatarGroup>
          </Box>
          
          <Grid container spacing={3}>
            {reviews.map((review, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={review.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: '100%',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <FormatQuoteIcon 
                      sx={{ 
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontSize: 40,
                        color: 'primary.main',
                        opacity: 0.2
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar src={review.avatar} alt={review.name} sx={{ width: 50, height: 50 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {review.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      "{review.text}"
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DineIn;
