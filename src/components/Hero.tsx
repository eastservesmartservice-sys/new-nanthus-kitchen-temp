import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import LocationSelectionModal from "./LocationSelectionModal";
import { tokens } from "../theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const textScale = useTransform(scrollY, [0, 300], [1, isMobile ? 1 : 1.05]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <Box
      component="section"
      ref={containerRef}
      id="hero"
      aria-label="Welcome to New Nanthus Kitchen"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: tokens.colors.neutral.black,
        color: "white",
        py: { xs: 12, md: 0 },
      }}
    >
      {/* 3D Background */}
      <ThreeBackground />

      {/* Logo Watermark */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", md: "60%" },
          maxWidth: 800,
          opacity: 0.03,
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <Box
          component="img"
          src="/new_nanthus_kitchen_logo.png"
          alt=""
          sx={{
            width: "100%",
            height: "auto",
            filter: "brightness(2)",
          }}
        />
      </Box>

      {/* Dark Overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Brand Tag */}
          <motion.div variants={itemVariants}>
            <Typography
              component="span"
              sx={{
                color: tokens.colors.primary.main,
                letterSpacing: "0.25em",
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                fontWeight: 600,
                textTransform: "uppercase",
                display: "block",
                mb: 3,
              }}
            >
              Authentic Sri Lankan Cuisine
            </Typography>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} style={{ scale: textScale }}>
            <Typography
              component="h1"
              sx={{
                color: "white",
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "5rem",
                  lg: "6rem",
                },
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
                textTransform: "uppercase",
                fontFamily: tokens.fonts.display,
                mb: 1,
              }}
            >
              New Nanthus
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "5rem",
                  lg: "6rem",
                },
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
                textTransform: "uppercase",
                color: tokens.colors.primary.main,
                display: "block",
                fontFamily: tokens.fonts.display,
              }}
            >
              Kitchen
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                maxWidth: 550,
                mx: "auto",
                color: tokens.colors.text.secondary,
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.7,
                mt: 4,
                mb: 5,
              }}
            >
              Experience the true taste of Jaffna. Our official website will be launched soon.
            </Typography>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 3 },
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setLocationModalOpen(true)}
                sx={{
                  px: { xs: 4, md: 5 },
                  py: 1.5,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 600,
                  color: tokens.colors.neutral.black,
                }}
              >
                Order Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollToSection("menu")}
                sx={{
                  px: { xs: 4, md: 5 },
                  py: 1.5,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 600,
                  color: "white",
                  borderColor: tokens.colors.border.strong,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                View Menu
              </Button>
            </Box>
          </motion.div>

          {/* Location Badges */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                mt: 6,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  border: `1px solid ${tokens.colors.border.light}`,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: tokens.colors.text.tertiary,
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  MARKHAM
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: 500 }}
                >
                  72-30 Karachi Dr
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  border: `1px solid ${tokens.colors.border.light}`,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: tokens.colors.text.tertiary,
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  SCARBOROUGH
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: 500 }}
                >
                  80 Nashdene Rd
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Location Selection Modal */}
      <LocationSelectionModal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      {/* Scroll Indicator */}
      <motion.div
        style={{
          opacity: scrollIndicatorOpacity,
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <Box
          component="button"
          onClick={() => scrollToSection("menu")}
          aria-label="Scroll to menu section"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            bgcolor: "transparent",
            border: "none",
            cursor: "pointer",
            color: tokens.colors.text.tertiary,
            transition: "color 0.3s ease",
            "&:hover": { color: "white" },
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <KeyboardArrowDownIcon />
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Hero;
