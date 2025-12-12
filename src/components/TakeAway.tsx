import React from 'react';
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../theme";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TakeAway: React.FC = () => {
  const features = [
    { icon: <StorefrontIcon />, text: "Pickup Only - Two Locations" },
    { icon: <AccessTimeIcon />, text: "Ready in 20-30 mins" },
  ];

  return (
    <Box
      component="section"
      id="take-away"
      aria-label="Order Online"
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: tokens.colors.neutral.dark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                component="span"
                sx={{
                  color: tokens.colors.primary.main,
                  letterSpacing: "0.2em",
                  mb: 2,
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Order Online
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  lineHeight: 1,
                  mb: 4,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontFamily: tokens.fonts.display,
                }}
              >
                Order for <br />
                <Box
                  component="span"
                  sx={{ color: tokens.colors.primary.main }}
                >
                  Pickup
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: tokens.colors.text.secondary,
                  mb: 4,
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: 450,
                }}
              >
                Enjoy our authentic Jaffna cuisine at home. Order online and
                pick up from either of our two convenient locations.
              </Typography>

              {/* Features */}
              <Box sx={{ display: "flex", gap: 4, mb: 5, flexWrap: "wrap" }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                  >
                    <Box sx={{ color: tokens.colors.primary.main }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      sx={{
                        color: tokens.colors.text.secondary,
                        fontSize: "0.9rem",
                      }}
                    >
                      {feature.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Order Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component="a"
                  href="https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=548c1a41-011d-488a-8876-d7815c9181d7&facebook=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: tokens.colors.neutral.black,
                  }}
                >
                  Order - Scarborough
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href="#contact"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "white",
                    borderColor: tokens.colors.border.medium,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  Order - Markham
                </Button>
              </Box>

              {/* Note */}
              <Typography
                sx={{
                  color: tokens.colors.text.tertiary,
                  fontSize: "0.85rem",
                  mt: 3,
                  fontStyle: "italic",
                }}
              >
                * Markham online ordering coming soon. Call to place orders.
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200"
                  alt="Delicious food ready for pickup"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: { xs: 350, md: 500 },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </motion.div>

              {/* Promo Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 20, md: -20 },
                    left: { xs: 20, md: -20 },
                    bgcolor: tokens.colors.neutral.black,
                    border: `1px solid ${tokens.colors.border.medium}`,
                    borderRadius: 2,
                    p: { xs: 3, md: 4 },
                  }}
                >
                  <Typography
                    sx={{
                      color: tokens.colors.primary.main,
                      fontFamily: tokens.fonts.display,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    20% Off
                  </Typography>
                  <Typography
                    sx={{
                      color: tokens.colors.text.secondary,
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      mt: 0.5,
                    }}
                  >
                    First Order
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TakeAway;
