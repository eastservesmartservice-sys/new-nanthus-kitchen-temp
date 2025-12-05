import React, { useRef } from "react";
import { Box, Typography, Button, Container, Chip } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

// Floating food images for 3D effect
const floatingItems = [
  {
    src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200",
    alt: "Biryani",
    delay: 0,
    x: "10%",
    y: "20%",
    size: 120,
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200",
    alt: "Samosa",
    delay: 0.2,
    x: "85%",
    y: "15%",
    size: 100,
  },
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200",
    alt: "Curry",
    delay: 0.4,
    x: "5%",
    y: "70%",
    size: 90,
  },
  {
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200",
    alt: "Naan",
    delay: 0.6,
    x: "90%",
    y: "65%",
    size: 110,
  },
];

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <Box
      id="hero"
      ref={ref}
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {/* Parallax Background with zoom effect */}
      <motion.div
        style={{
          y,
          scale,
          position: "absolute",
          top: "-10%",
          left: "-10%",
          right: "-10%",
          bottom: "-10%",
          backgroundImage: `linear-gradient(135deg, rgba(21, 101, 192, 0.7), rgba(255, 143, 0, 0.5)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />

      {/* Animated floating food items for 3D depth - hidden on mobile for cleaner UI */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {floatingItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: 0.9,
              scale: 1,
              rotate: 0,
              y: [0, -20, 0],
            }}
            transition={{
              delay: item.delay + 0.5,
              duration: 0.8,
              y: {
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              zIndex: 0,
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))",
            }}
          >
            <Box
              component="img"
              src={item.src}
              alt={item.alt}
              sx={{
                width: item.size,
                height: item.size,
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid rgba(255,255,255,0.3)",
              }}
            />
          </motion.div>
        ))}
      </Box>

      {/* Animated particles/sparkles - reduced on mobile */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -100],
            x: Math.random() * 20 - 10,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            bottom: "10%",
            width: 4 + Math.random() * 4,
            height: 4 + Math.random() * 4,
            backgroundColor: "rgba(255, 200, 100, 0.8)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Tagline chip */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Chip
                label="AUTHENTIC SRI LANKAN CUISINE"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  fontSize: "1rem",
                  py: 2.5,
                  px: 1,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "4rem", md: "6rem" },
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                }}
              >
                TASTE THE
                <br />
                <Box
                  component="span"
                  sx={{
                    color: "secondary.main",
                    textShadow: "0 0 40px rgba(255, 143, 0, 0.5)",
                  }}
                >
                  TRADITION
                </Box>
              </Typography>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                fontSize: "1.2rem",
                maxWidth: 600,
                margin: "0 auto",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              Experience the rich flavors of authentic Sri Lankan cuisine, crafted
              with passion and tradition at New Nanthu's Kitchen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                padding: "0 16px",
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 40px rgba(21, 101, 192, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: '1', maxWidth: 200, minWidth: 150 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                    px: { xs: 3, sm: 5 },
                    py: 1.5,
                    borderRadius: "50px",
                    boxShadow: "0 4px 20px rgba(21, 101, 192, 0.4)",
                  }}
                >
                  ORDER NOW
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: '1', maxWidth: 200, minWidth: 150 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                    px: { xs: 3, sm: 5 },
                    py: 1.5,
                    borderRadius: "50px",
                    borderColor: "white",
                    color: "white",
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "secondary.main",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  VIEW MENU
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{ marginTop: 40 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 2, sm: 3, md: 6 },
                  justifyContent: "center",
                  flexWrap: "wrap",
                  px: { xs: 2, sm: 0 },
                }}
              >
                {[
                  { value: "25+", label: "Years of Excellence" },
                  { value: "100+", label: "Signature Dishes" },
                  { value: "50K+", label: "Happy Customers" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <Box sx={{ textAlign: "center", minWidth: { xs: 80, sm: 100 } }}>
                      <Typography
                        variant="h3"
                        sx={{ 
                          fontWeight: 800, 
                          color: "secondary.main",
                          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.8,
                          fontSize: { xs: '0.7rem', sm: '0.875rem' }
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

    </Box>
  );
};

export default Hero;
