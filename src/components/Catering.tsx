import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Chip, Card, CardContent, TextField, MenuItem } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const cateringPackages = [
  {
    title: 'WEDDING PACKAGE',
    icon: <CelebrationIcon sx={{ fontSize: 50 }} />,
    price: 'From $35',
    perPerson: '/person',
    description: 'Make your special day unforgettable with authentic Sri Lankan flavors',
    features: [
      'Customized Menu Planning',
      'Traditional Wedding Specials',
      'Professional Service Staff',
      'Elegant Presentation',
      'Dessert Station Included',
    ],
    popular: true,
    minGuests: 100,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
  },
  {
    title: 'CORPORATE EVENTS',
    icon: <BusinessCenterIcon sx={{ fontSize: 50 }} />,
    price: 'From $25',
    perPerson: '/person',
    description: 'Impress clients and colleagues with exquisite Sri Lankan cuisine',
    features: [
      'Business Lunch Packages',
      'Conference Catering',
      'Executive Buffet Setup',
      'Dietary Options Available',
      'Timely Delivery Guaranteed',
    ],
    popular: false,
    minGuests: 20,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    title: 'FAMILY GATHERINGS',
    icon: <FamilyRestroomIcon sx={{ fontSize: 50 }} />,
    price: 'From $20',
    perPerson: '/person',
    description: 'Bring the family together with our home-style Sri Lankan cooking',
    features: [
      'Traditional Family Recipes',
      'Kid-Friendly Options',
      'Flexible Portions',
      'Home Delivery Available',
      'Setup & Cleanup Service',
    ],
    popular: false,
    minGuests: 15,
    image: 'https://images.unsplash.com/photo-1529543544277-625f6e5de5bf?w=400',
  },
];

const popularDishes = [
  { name: 'Hoppers & Egg Hoppers', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200' },
  { name: 'Kottu Roti', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { name: 'String Hoppers', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200' },
  { name: 'Lamprais', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=200' },
  { name: 'Fish Ambul Thiyal', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200' },
  { name: 'Pol Sambol', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200' },
];

const stats = [
  { number: '500+', label: 'Events Catered' },
  { number: '50K+', label: 'Happy Guests' },
  { number: '100%', label: 'Satisfaction' },
  { number: '25+', label: 'Years Experience' },
];

const Catering: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <Box 
      id="catering"
      sx={{ 
        py: { xs: 10, lg: 16 }, 
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        style={{ y: backgroundY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: `
              radial-gradient(circle at 10% 20%, rgba(21, 101, 192, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(255, 143, 0, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              icon={<RestaurantIcon />}
              label="CATERING SERVICES" 
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
              AUTHENTIC SRI LANKAN CATERING
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary', 
                maxWidth: 700, 
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.8
              }}
            >
              Bring the rich flavors of Sri Lanka to your special events. From intimate 
              gatherings to grand celebrations, we deliver exceptional taste and service.
            </Typography>
          </Box>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Grid container spacing={3} sx={{ mb: 10 }}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.05), rgba(255, 143, 0, 0.05))',
                      border: '1px solid rgba(21, 101, 192, 0.1)',
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 800, 
                        color: 'secondary.main',
                        mb: 0.5
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Catering Packages */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {cateringPackages.map((pkg, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={pkg.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    border: pkg.popular ? '2px solid' : '1px solid',
                    borderColor: pkg.popular ? 'secondary.main' : 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(21, 101, 192, 0.15)',
                    }
                  }}
                >
                  {pkg.popular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: -35,
                        bgcolor: 'secondary.main',
                        color: 'white',
                        px: 5,
                        py: 0.5,
                        transform: 'rotate(45deg)',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        zIndex: 1,
                      }}
                    >
                      POPULAR
                    </Box>
                  )}
                  
                  {/* Package Image */}
                  <Box
                    sx={{
                      height: 150,
                      background: `linear-gradient(rgba(21, 101, 192, 0.8), rgba(21, 101, 192, 0.9)), url(${pkg.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    >
                      {pkg.icon}
                    </motion.div>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                      {pkg.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                        {pkg.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {pkg.perPerson}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {pkg.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      {pkg.features.map((feature) => (
                        <Box 
                          key={feature} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1, 
                            mb: 1 
                          }}
                        >
                          <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>

                    <Chip 
                      icon={<GroupsIcon />}
                      label={`Min. ${pkg.minGuests} guests`}
                      size="small"
                      sx={{ mb: 3 }}
                    />

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={pkg.popular ? 'contained' : 'outlined'}
                        color={pkg.popular ? 'secondary' : 'primary'}
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        sx={{ 
                          py: 1.5, 
                          fontWeight: 'bold',
                          borderRadius: 2
                        }}
                      >
                        GET QUOTE
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Popular Catering Dishes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                mb: 2
              }}
            >
              POPULAR CATERING DISHES
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A preview of our most requested dishes for events
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={2} sx={{ mb: 10 }}>
          {popularDishes.map((dish, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={dish.name}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      mb: 2,
                      border: '3px solid',
                      borderColor: 'secondary.main',
                    }}
                  >
                    <Box
                      component="img"
                      src={dish.image}
                      alt={dish.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {dish.name}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Request Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.03), rgba(255, 143, 0, 0.03))',
              border: '1px solid rgba(21, 101, 192, 0.1)',
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LocalDiningIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    REQUEST A QUOTE
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Planning an event? Let us create a customized catering package 
                  that fits your needs and budget. Our team will get back to you 
                  within 24 hours with a detailed proposal.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip icon={<CheckCircleIcon />} label="Free Consultation" color="primary" variant="outlined" />
                  <Chip icon={<CheckCircleIcon />} label="Custom Menus" color="primary" variant="outlined" />
                  <Chip icon={<CheckCircleIcon />} label="Tasting Sessions" color="primary" variant="outlined" />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        select
                        label="Event Type"
                        defaultValue=""
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      >
                        <MenuItem value="wedding">Wedding</MenuItem>
                        <MenuItem value="corporate">Corporate Event</MenuItem>
                        <MenuItem value="family">Family Gathering</MenuItem>
                        <MenuItem value="birthday">Birthday Party</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Event Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Number of Guests"
                        type="number"
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Additional Details"
                        placeholder="Tell us about your event and any special requirements..."
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Grid>
                  </Grid>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      endIcon={<EventIcon />}
                      sx={{ 
                        py: 2, 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        borderRadius: 2
                      }}
                    >
                      REQUEST FREE QUOTE
                    </Button>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Catering;
