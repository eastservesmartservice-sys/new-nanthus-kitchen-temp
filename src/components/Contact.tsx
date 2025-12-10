import React from 'react';
import { Box, Typography, Container, Grid, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <Box 
      id="contact"
      sx={{ 
        py: { xs: 10, lg: 20 }, 
        bgcolor: '#050505', 
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'primary.main', 
                  letterSpacing: '0.2em', 
                  mb: 2, 
                  display: 'block',
                  fontFamily: '"Manrope", sans-serif'
                }}
              >
                CONNECT
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 400, 
                  textTransform: 'uppercase', 
                  mb: 8,
                  fontSize: { xs: '3rem', md: '6rem' },
                  lineHeight: 0.9,
                  fontFamily: '"Tenor Sans", sans-serif'
                }}
              >
                Get in <br />
                <Box component="span" sx={{ color: 'transparent', WebkitTextStroke: '1px #FFCF40' }}>Touch</Box>
              </Typography>

              <Box sx={{ mb: 6, pl: 0 }}>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Manrope", sans-serif', letterSpacing: '0.1em' }}>LOCATION</Typography>
                <Typography variant="h5" sx={{ color: 'white', mt: 1, fontFamily: '"Manrope", sans-serif', fontWeight: 300 }}>
                  456 Spice Avenue, Toronto<br />
                  Ontario M5V 2T6
                </Typography>
              </Box>

              <Box sx={{ mb: 6, pl: 0 }}>
                 <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Manrope", sans-serif', letterSpacing: '0.1em' }}>CONTACT</Typography>
                 <Typography variant="h5" sx={{ color: 'white', mt: 1, fontFamily: '"Manrope", sans-serif', fontWeight: 300 }}>
                   hello@nanthus.com<br />
                   +1 (416) 555-0123
                 </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box component="form" sx={{ mt: { xs: 0, md: 10 } }}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      placeholder="NAME" 
                      variant="standard" 
                      sx={{ 
                        input: { color: 'white', fontSize: '1.2rem', py: 2, fontFamily: '"Manrope", sans-serif' },
                        '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' },
                        '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      placeholder="EMAIL" 
                      variant="standard" 
                      sx={{ 
                        input: { color: 'white', fontSize: '1.2rem', py: 2, fontFamily: '"Manrope", sans-serif' },
                        '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' },
                        '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      placeholder="MESSAGE" 
                      multiline
                      rows={4}
                      variant="standard" 
                      sx={{ 
                        textarea: { color: 'white', fontSize: '1.2rem', py: 2, fontFamily: '"Manrope", sans-serif' },
                        '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.1)' },
                        '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button 
                      variant="outlined" 
                      size="large"
                      sx={{ 
                        color: 'white', 
                        borderColor: 'rgba(255,255,255,0.3)',
                        fontSize: '1rem', 
                        textTransform: 'uppercase',
                        borderRadius: 0,
                        py: 2,
                        px: 6,
                        fontFamily: '"Manrope", sans-serif',
                        letterSpacing: '0.1em',
                        transition: 'all 0.3s',
                        '&:hover': { bgcolor: 'white', color: 'black', borderColor: 'white' }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
