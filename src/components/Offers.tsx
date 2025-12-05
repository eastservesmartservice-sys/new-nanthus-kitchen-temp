import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GroupsIcon from '@mui/icons-material/Groups';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const offers = [
  {
    title: 'FIRST ORDER',
    discount: '20% OFF',
    description: 'New to New Nanthu\'s? Get 20% off on your first order with us!',
    code: 'WELCOME20',
    icon: <CelebrationIcon sx={{ fontSize: 40 }} />,
    color: '#1565C0',
    validTill: 'Valid for new customers only',
  },
  {
    title: 'FAMILY PACK',
    discount: '$25 OFF',
    description: 'Order for 4+ people and save $25 on orders above $100',
    code: 'FAMILY25',
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    color: '#FF8F00',
    validTill: 'Valid on orders above $100',
  },
  {
    title: 'GIFT CARD',
    discount: 'FREE $10',
    description: 'Buy a $50 gift card and get an extra $10 free!',
    code: 'GIFT10',
    icon: <CardGiftcardIcon sx={{ fontSize: 40 }} />,
    color: '#4CAF50',
    validTill: 'Limited time offer',
  },
];

const CouponCard: React.FC<{ offer: typeof offers[0]; index: number }> = ({ offer, index }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10, scale: 1.02 }}
      style={{ perspective: 1000 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(135deg, ${offer.color}15, ${offer.color}05)`,
          border: `2px dashed ${offer.color}40`,
          transition: 'all 0.3s ease',
          '&:hover': {
            border: `2px dashed ${offer.color}`,
            boxShadow: `0 20px 40px ${offer.color}20`,
          }
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: -15,
            width: 30,
            height: 30,
            bgcolor: 'background.default',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: -15,
            width: 30,
            height: 30,
            bgcolor: 'background.default',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: `${offer.color}20`,
                color: offer.color,
              }}
            >
              {offer.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: offer.color, 
                  fontWeight: 'bold',
                  letterSpacing: 2
                }}
              >
                {offer.title}
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  color: offer.color,
                  lineHeight: 1
                }}
              >
                {offer.discount}
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 3, minHeight: 48 }}
          >
            {offer.description}
          </Typography>

          {/* Coupon code box */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'white',
              borderRadius: 2,
              border: '1px dashed',
              borderColor: 'divider',
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Use Code:
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontFamily: 'monospace',
                  letterSpacing: 2
                }}
              >
                {offer.code}
              </Typography>
            </Box>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton 
                onClick={handleCopy}
                sx={{ 
                  bgcolor: copied ? 'success.main' : offer.color,
                  color: 'white',
                  '&:hover': { bgcolor: copied ? 'success.dark' : offer.color }
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </motion.div>
          </Box>

          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block', mt: 2, textAlign: 'center' }}
          >
            {offer.validTill}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

const Offers: React.FC = () => {
  return (
    <Box 
      id="offers"
      sx={{ 
        py: { xs: 10, lg: 16 }, 
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 143, 0, 0.08) 0%, transparent 70%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21, 101, 192, 0.08) 0%, transparent 70%)',
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
            <Chip 
              icon={<CardGiftcardIcon />}
              label="EXCLUSIVE DEALS" 
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
              SPECIAL OFFERS & COUPONS
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Use these exclusive codes to save on your next order. 
              Don't miss out on these limited-time deals!
            </Typography>
          </Box>
        </motion.div>

        {/* Offers Grid */}
        <Grid container spacing={4}>
          {offers.map((offer, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={offer.code}>
              <CouponCard offer={offer} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              mt: 10,
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated background shapes */}
            <Box
              component={motion.div}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
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
            <Box
              component={motion.div}
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.1)',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                Get Exclusive Offers in Your Inbox!
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                Subscribe to our newsletter and never miss a deal. 
                Plus, get 15% off your first order!
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  maxWidth: 500, 
                  mx: 'auto',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'grey.400' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'white',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                    }
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      px: 4,
                      py: 1.8,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 20px rgba(255,143,0,0.4)',
                    }}
                  >
                    SUBSCRIBE
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Offers;
