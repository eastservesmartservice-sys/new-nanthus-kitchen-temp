import React, { useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import type { Variants } from "framer-motion";
import ThreeBackground from "./ThreeBackground";



const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollY } = useScroll();
  const textScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing
      },
    },
  };

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="hero"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#050505",
        color: "white",
      }}
    >
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Dark Overlay for readability */}
       <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />

      {/* Data Grid Overlay */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
         {/* Vertical Lines */}
         <Box sx={{ position: 'absolute', left: '10%', height: '100%', width: '1px', bgcolor: 'rgba(255,255,255,0.03)' }} />
         <Box sx={{ position: 'absolute', right: '10%', height: '100%', width: '1px', bgcolor: 'rgba(255,255,255,0.03)' }} />
         {/* Corner Data */}
         <Box sx={{ position: 'absolute', top: '15%', left: '10%', pl: 2, borderLeft: '2px solid #FFCF40' }}>
            <Typography variant="caption" sx={{ fontFamily: '"Manrope", monospace', color: 'primary.main', display: 'block' }}>LAT 6.9271° N</Typography>
            <Typography variant="caption" sx={{ fontFamily: '"Manrope", monospace', color: 'rgba(255,255,255,0.5)' }}>LON 79.8612° E</Typography>
         </Box>
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            textAlign: "center" 
          }}
        >
          {/* Top Tagline */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 4,
                opacity: 0.9
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontFamily: '"Manrope", sans-serif',
                  letterSpacing: "0.2em",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                New Nanthu's Kitchen
              </Typography>
            </Box>
          </motion.div>

          {/* Large Hero Text with Masking Effect */}
          <Box sx={{ position: 'relative', mb: 2 }}>
            <motion.div 
              variants={itemVariants}
              style={{ scale: textScale }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontSize: { xs: "3rem", md: "8rem", lg: "11rem" },
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  textTransform: "uppercase",
                  textAlign: "center",
                  fontFamily: '"Tenor Sans", sans-serif',
                }}
              >
                AUTHENTIC
              </Typography>
              <Typography
                variant="h1"
                component="span"
                sx={{
                  fontSize: { xs: "3rem", md: "8rem", lg: "11rem" },
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  textTransform: "uppercase",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                  position: "relative",
                  display: "block",
                  fontFamily: '"Tenor Sans", sans-serif',
                }}
              >
                CEYLON
              </Typography>
            </motion.div>
          </Box>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 600,
                mx: "auto",
                color: "rgba(255,255,255,0.8)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.6,
                mb: 6,
                letterSpacing: "0.05em",
                fontFamily: '"Manrope", sans-serif',
              }}
            >
              Experience the true taste of Jaffna. From our signature Mutton Rolls to the rich aroma of Chicken 65, 
              we bring the heart of Sri Lankan cuisine to your table.
            </Typography>
          </motion.div>

          {/* Minimalist Action Buttons */}
          <motion.div 
            variants={itemVariants} 
            style={{ display: "flex", gap: 40, justifyContent: "center" }}
          >
            <Button
              variant="text"
              href="#dine-in"
              sx={{
                color: "white",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                borderBottom: "1px solid transparent",
                borderRadius: 0,
                px: 0,
                pb: 1,
                fontFamily: '"Manrope", sans-serif',
                "&:hover": {
                  bgcolor: "transparent",
                  borderBottom: "1px solid #FFCF40",
                  color: "primary.main",
                },
              }}
            >
              RESERVE TABLE
            </Button>
            <Button
              variant="text"
              href="#menu"
              sx={{
                color: "white",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                borderBottom: "1px solid transparent",
                borderRadius: 0,
                px: 0,
                pb: 1,
                fontFamily: '"Manrope", sans-serif',
                "&:hover": {
                  bgcolor: "transparent",
                  borderBottom: "1px solid #4FC3F7",
                  color: "secondary.main",
                },
              }}
            >
              VIEW MENU
            </Button>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Scroll Indicator - Minimal Line */}
      <motion.div
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
      >
      </motion.div>
    </Box>
  );
};

export default Hero;
