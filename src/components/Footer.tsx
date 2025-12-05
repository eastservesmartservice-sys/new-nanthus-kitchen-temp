import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, Button, TextField, InputAdornment } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Menu', href: '#menu' },
  { label: 'Today Special', href: '#special' },
  { label: 'Offers', href: '#offers' },
  { label: 'Dine In', href: '#dine-in' },
  { label: 'Take Away', href: '#take-away' },
  { label: 'Contact Us', href: '#contact' },
];

const socialLinks = [
  { icon: <FacebookIcon />, label: 'Facebook', color: '#1877F2' },
  { icon: <InstagramIcon />, label: 'Instagram', color: '#E4405F' },
  { icon: <TwitterIcon />, label: 'Twitter', color: '#1DA1F2' },
  { icon: <YouTubeIcon />, label: 'YouTube', color: '#FF0000' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0A66C2' },
];

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#0a0a0a', color: 'common.white', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative top wave */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(180deg, rgba(21, 101, 192, 0.1) 0%, transparent 100%)',
        }}
      />

      {/* Newsletter Section */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Grid container alignItems="center" spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Stay Updated
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Subscribe to our newsletter for exclusive offers and updates
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
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
                      sx={{
                        px: 4,
                        py: 1.8,
                        borderRadius: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      <SendIcon />
                    </Button>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Main Footer */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Grid container spacing={4}>
            {/* Brand */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Box 
                  component="img" 
                  src="/new_nanthus_kitchen_logo.png" 
                  alt="New Nanthu's Kitchen" 
                  sx={{ height: 70, mb: 3 }} 
                />
                <Typography variant="body1" sx={{ color: 'grey.400', mb: 3, lineHeight: 1.8 }}>
                  Experience the authentic taste of Sri Lanka at New Nanthu's Kitchen. 
                  Every dish is crafted with love, tradition, and the finest ingredients.
                </Typography>
                
                {/* Social Links */}
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                    >
                      <IconButton 
                        aria-label={social.label}
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'white',
                          '&:hover': { 
                            bgcolor: social.color,
                            color: 'white'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'secondary.main' }}>
                  QUICK LINKS
                </Typography>
                <Stack spacing={1.5}>
                  {quickLinks.map((link) => (
                    <motion.div
                      key={link.label}
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        href={link.href} 
                        color="inherit" 
                        underline="none"
                        sx={{ 
                          color: 'grey.400',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            color: 'secondary.main',
                          }
                        }}
                      >
                        <ArrowForwardIcon sx={{ fontSize: 14, opacity: 0.5 }} />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'secondary.main' }}>
                  CONTACT INFO
                </Typography>
                <Stack spacing={2.5}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <LocationOnIcon sx={{ color: 'secondary.main', mt: 0.5 }} />
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                      456 Spice Avenue,
                      <br />
                      Toronto, ON M5V 2T6
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <PhoneIcon sx={{ color: 'secondary.main' }} />
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                      +1 (416) 555-0123
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <EmailIcon sx={{ color: 'secondary.main' }} />
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                      info@nanthuskitchen.com
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>

            {/* Opening Hours */}
            <Grid size={{ xs: 12, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'secondary.main' }}>
                  OPENING HOURS
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>Monday - Friday</Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>11am - 10pm</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>Saturday</Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>10am - 11pm</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>Sunday</Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>10am - 11pm</Typography>
                  </Box>
                </Stack>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 3, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                  >
                    BOOK A TABLE
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Bottom Bar */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" sx={{ color: 'grey.500', textAlign: { xs: 'center', md: 'left' } }}>
                © {new Date().getFullYear()} New Nanthu's Kitchen. All rights reserved.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'grey.500', 
                  textAlign: { xs: 'center', md: 'right' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  gap: 0.5,
                  mt: { xs: 1, md: 0 }
                }}
              >
                Made with passion in Canada | Authentic Sri Lankan Cuisine
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;