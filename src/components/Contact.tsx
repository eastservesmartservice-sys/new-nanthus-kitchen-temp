import React from 'react';
import { Box, Typography, Button, Container, Grid, TextField, Paper, Chip, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DirectionsIcon from '@mui/icons-material/Directions';
import { motion } from 'framer-motion';

const contactInfo = [
  {
    icon: <LocationOnIcon />,
    title: 'Visit Us',
    details: ['456 Spice Avenue', 'Toronto, ON M5V 2T6'],
    action: 'Get Directions',
    actionIcon: <DirectionsIcon />,
  },
  {
    icon: <CallIcon />,
    title: 'Call Us',
    details: ['+1 (416) 555-0123', '+1 (416) 555-0124'],
    action: 'Call Now',
    actionIcon: <CallIcon />,
  },
  {
    icon: <EmailIcon />,
    title: 'Email Us',
    details: ['info@nanthuskitchen.com', 'reservations@nanthuskitchen.com'],
    action: 'Send Email',
    actionIcon: <EmailIcon />,
  },
  {
    icon: <ScheduleIcon />,
    title: 'Opening Hours',
    details: ['Mon - Fri: 11am - 10pm', 'Sat - Sun: 10am - 11pm'],
    action: 'Book Table',
    actionIcon: <ScheduleIcon />,
  },
];

const socialLinks = [
  { icon: <FacebookIcon />, color: '#1877F2', label: 'Facebook' },
  { icon: <InstagramIcon />, color: '#E4405F', label: 'Instagram' },
  { icon: <TwitterIcon />, color: '#1DA1F2', label: 'Twitter' },
  { icon: <WhatsAppIcon />, color: '#25D366', label: 'WhatsApp' },
];

const Contact: React.FC = () => {
  return (
    <Box 
      id="contact"
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
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(21, 101, 192, 0.03) 0%, transparent 100%)',
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
              icon={<ContactMailIcon />}
              label="GET IN TOUCH" 
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
              CONTACT & RESERVATIONS
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Have questions? Want to book a table? We'd love to hear from you. 
              Reach out to us through any of the channels below.
            </Typography>
          </Box>
        </motion.div>
        
        {/* Contact Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={info.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(21, 101, 192, 0.15)',
                    }
                  }}
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
                      mx: 'auto',
                      mb: 2,
                      '& svg': { fontSize: 28 }
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {info.title}
                  </Typography>
                  {info.details.map((detail, i) => (
                    <Typography 
                      key={i} 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      {detail}
                    </Typography>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="text"
                      color="primary"
                      startIcon={info.actionIcon}
                      sx={{ mt: 2, fontWeight: 'bold' }}
                    >
                      {info.action}
                    </Button>
                  </motion.div>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Grid container spacing={6}>
          {/* Map & Social */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Map placeholder */}
              <Paper
                sx={{
                  height: 300,
                  borderRadius: 4,
                  overflow: 'hidden',
                  mb: 4,
                  position: 'relative',
                }}
              >
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0868143908186!2d-122.41941568468204!3d37.77492977975892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1679900000000!5m2!1sen!2sus"
                  sx={{
                    border: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Paper>

              {/* Social Links */}
              <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: social.color,
                          color: 'white',
                          '&:hover': { bgcolor: social.color, opacity: 0.9 }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Stay connected for daily specials & events!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Reservation Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                  Make a Reservation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Book your table online and we'll confirm within 30 minutes.
                </Typography>
                
                <form noValidate autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        fullWidth 
                        label="Full Name" 
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        fullWidth 
                        label="Email Address" 
                        type="email" 
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        fullWidth 
                        label="Phone Number" 
                        type="tel" 
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        fullWidth 
                        label="Number of Guests" 
                        type="number"
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                          inputProps: { min: 1, max: 20 }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        fullWidth 
                        type="date" 
                        variant="outlined" 
                        InputLabelProps={{ shrink: true }} 
                        label="Preferred Date"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        fullWidth 
                        type="time" 
                        variant="outlined" 
                        InputLabelProps={{ shrink: true }} 
                        label="Preferred Time"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField 
                        fullWidth 
                        label="Special Requests (Optional)" 
                        multiline 
                        rows={3}
                        variant="outlined"
                        placeholder="Dietary requirements, celebration, seating preferences..."
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          fullWidth 
                          variant="contained" 
                          color="primary" 
                          size="large" 
                          sx={{ 
                            py: 2, 
                            fontWeight: 'bold',
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 20px rgba(21, 101, 192, 0.3)',
                          }}
                        >
                          CONFIRM RESERVATION
                        </Button>
                      </motion.div>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ display: 'block', textAlign: 'center', mt: 2 }}
                      >
                        We'll send a confirmation to your email within 30 minutes
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
