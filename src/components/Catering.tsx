import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../theme";
import GroupsIcon from "@mui/icons-material/Groups";
import CelebrationIcon from "@mui/icons-material/Celebration";

const Catering: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <GroupsIcon />,
      title: "Corporate Events",
      desc: "Business lunches & meetings",
    },
    {
      icon: <CelebrationIcon />,
      title: "Private Parties",
      desc: "Weddings & celebrations",
    },
  ];

  return (
    <Box
      component="section"
      id="catering"
      aria-label="Catering Services"
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: tokens.colors.neutral.black,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
          direction="row-reverse"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
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
                Catering Services
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
                Curated <br />
                <Box
                  component="span"
                  sx={{ color: tokens.colors.primary.main }}
                >
                  Events
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: tokens.colors.text.secondary,
                  mb: 5,
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: 450,
                }}
              >
                Elevate your next gathering with the distinct flavors of
                Nanthus. From corporate luncheons to grand weddings, we bring a
                touch of culinary excellence to every occasion.
              </Typography>

              {/* Services */}
              <Box sx={{ display: "flex", gap: 4, mb: 5, flexWrap: "wrap" }}>
                {services.map((service, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 0.5,
                      }}
                    >
                      <Box sx={{ color: tokens.colors.primary.main }}>
                        {service.icon}
                      </Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: tokens.colors.text.tertiary,
                        fontSize: "0.85rem",
                        pl: 4.5,
                      }}
                    >
                      {service.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={scrollToContact}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: tokens.colors.neutral.black,
                }}
              >
                Inquire Now
              </Button>
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
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
                  alt="Elegant catering setup for events"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: { xs: 350, md: 500 },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </motion.div>

              {/* Stats Badge */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 20, md: -20 },
                    right: { xs: 20, md: -20 },
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
                    500+
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
                    Events Catered
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

export default Catering;
