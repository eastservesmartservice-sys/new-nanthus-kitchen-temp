import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Stepper, Step, StepLabel, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const orderSteps = [
  { 
    label: 'Browse Menu', 
    description: 'Explore our delicious selection',
    icon: <RestaurantMenuIcon />
  },
  { 
    label: 'Place Order', 
    description: 'Customize and add to cart',
    icon: <ShoppingBagIcon />
  },
  { 
    label: 'Pay Securely', 
    description: 'Multiple payment options',
    icon: <PaymentIcon />
  },
  { 
    label: 'Pick Up', 
    description: 'Ready in 15-20 minutes',
    icon: <CheckCircleIcon />
  },
];

const features = [
  {
    title: 'Quick Pickup',
    description: 'Skip the wait! Order ahead and your food will be ready when you arrive.',
    icon: <AccessTimeIcon sx={{ fontSize: 50 }} />,
    color: '#1565C0',
    stat: '15 min',
    statLabel: 'Avg. pickup time'
  },
  {
    title: 'Delivery Available',
    description: 'Can\'t make it? We deliver to your doorstep through our delivery partners.',
    icon: <DeliveryDiningIcon sx={{ fontSize: 50 }} />,
    color: '#FF8F00',
    stat: '3 mi',
    statLabel: 'Delivery radius'
  },
  {
    title: 'Special Discounts',
    description: 'Exclusive online-only deals and loyalty rewards for takeaway orders.',
    icon: <LocalOfferIcon sx={{ fontSize: 50 }} />,
    color: '#4CAF50',
    stat: '10%',
    statLabel: 'Online discount'
  },
];

const TakeAway: React.FC = () => {
  return (
    <Box 
      id="take-away"
      sx={{ 
        py: { xs: 10, lg: 16 }, 
        background: 'linear-gradient(180deg, #f8f9fa 0%, #fff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background elements */}
      <Box
        component={motion.div}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 200,
          height: 200,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.1), rgba(255, 143, 0, 0.1))',
          filter: 'blur(40px)',
        }}
      />

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
              icon={<ShoppingBagIcon />}
              label="ORDER AHEAD" 
              color="secondary" 
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
              TAKEAWAY & DELIVERY
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Enjoy our delicious dishes in the comfort of your home. 
              Order online for quick pickup or delivery!
            </Typography>
          </Box>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              mb: 8,
              borderRadius: 4,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #FF8F00 0%, #F57C00 100%)',
              position: 'relative',
            }}
          >
            <Grid container alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: { xs: 4, md: 6 }, color: 'white' }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                    ORDER NOW, 
                    <br />
                    PICK UP LATER
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                    Skip the line! Place your order online and pick it up at your convenience. 
                    Fresh, hot, and ready when you are.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<PhoneAndroidIcon />}
                        sx={{
                          bgcolor: 'white',
                          color: 'secondary.main',
                          fontWeight: 'bold',
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                        }}
                      >
                        ORDER NOW
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          color: 'white',
                          borderColor: 'white',
                          fontWeight: 'bold',
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          '&:hover': { 
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)' 
                          }
                        }}
                      >
                        CALL US
                      </Button>
                    </motion.div>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ position: 'relative', height: { xs: 250, md: 350 } }}>
                  {/* Floating food images */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '20%',
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=150"
                      alt="Food"
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      }}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: '30%',
                      right: '15%',
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=150"
                      alt="Food"
                      sx={{
                        width: 140,
                        height: 140,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      }}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '35%',
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=150"
                      alt="Food"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      }}
                    />
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* How it Works */}
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
              How It Works
            </Typography>
            <Stepper 
              alternativeLabel 
              sx={{ 
                '& .MuiStepConnector-line': { 
                  borderColor: 'primary.main',
                  borderTopWidth: 2
                }
              }}
            >
              {orderSteps.map((step, index) => (
                <Step key={step.label} completed>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <StepLabel
                      StepIconComponent={() => (
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 20px rgba(21, 101, 192, 0.3)',
                            }}
                          >
                            {step.icon}
                          </Box>
                        </motion.div>
                      )}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {step.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                  </motion.div>
                </Step>
              ))}
            </Stepper>
          </Box>
        </motion.div>

        {/* Features */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 4,
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 20px 40px ${feature.color}20`,
                      borderColor: feature.color,
                    }
                  }}
                >
                  <Box sx={{ color: feature.color, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {feature.description}
                  </Typography>
                  <Box 
                    sx={{ 
                      pt: 2, 
                      borderTop: '1px dashed',
                      borderColor: 'divider'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ fontWeight: 800, color: feature.color }}
                    >
                      {feature.stat}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {feature.statLabel}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Download App CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box
            sx={{
              mt: 10,
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              bgcolor: 'primary.main',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.1)',
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h4" 
                sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
              >
                Download Our App
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 500, mx: 'auto' }}
              >
                Get exclusive app-only deals, earn loyalty points, and enjoy faster ordering!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Box
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                    alt="Google Play"
                    sx={{ height: 50, cursor: 'pointer' }}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Box
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/512px-Download_on_the_App_Store_Badge.svg.png"
                    alt="App Store"
                    sx={{ height: 50, cursor: 'pointer' }}
                  />
                </motion.div>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TakeAway;
