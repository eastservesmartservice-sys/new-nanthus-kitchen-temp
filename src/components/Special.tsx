import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { tokens } from "../theme";

interface SpecialItemType {
  title: string;
  description: string;
  price: string;
  image: string;
  tag: string;
  availability?: string;
}

const todaySpecials: SpecialItemType[] = [
  {
    title: "Everyday Lunch Boxes",
    description:
      "Enjoy a complete meal with your choice of rice, curry, and accompaniments. Perfect for a quick and satisfying lunch that brings the authentic taste of Jaffna cuisine to your day.",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200",
    tag: "Daily Special",
    availability: "Available Every Day",
  },
  {
    title: "Sri Lankan Chicken Soup",
    description:
      "Warm, comforting, and bursting with authentic Sri Lankan spices. Our traditional chicken soup is slowly simmered to perfection with aromatic herbs and tender chicken pieces.",
    price: "Market Price",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200",
    tag: "Weekend Special",
    availability: "Saturday & Sunday Only",
  },
];

interface SpecialItemProps {
  item: SpecialItemType;
  index: number;
}

const SpecialItem: React.FC<SpecialItemProps> = ({ item, index }) => {
  const ref = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const isEven = index % 2 === 0;

  const scrollToOrder = () => {
    const element = document.getElementById("take-away");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      ref={ref}
      component="article"
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: isEven ? "row" : "row-reverse" },
            alignItems: "center",
            gap: { xs: 5, md: 10 },
          }}
        >
          {/* Image Side */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              height: { xs: 350, md: 500 },
              width: "100%",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <motion.div
              style={{
                scale: isMobile ? 1 : imgScale,
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.95)",
                }}
              />
            </motion.div>
            {/* Tag Badge */}
            <Chip
              label={item.tag}
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                bgcolor: tokens.colors.primary.main,
                color: tokens.colors.neutral.black,
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
              }}
            />
          </Box>

          {/* Text Side */}
          <Box sx={{ flex: 1, position: "relative" }}>
            <motion.div style={{ y: isMobile ? 0 : y }}>
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
                Today's Special
              </Typography>
              <Typography
                component="h3"
                sx={{
                  color: "white",
                  fontFamily: tokens.fonts.display,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1,
                  mb: 3,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: tokens.colors.text.secondary,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: 450,
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </Typography>

              {/* Availability */}
              {item.availability && (
                <Box sx={{ mb: 3 }}>
                  <Chip
                    label={item.availability}
                    sx={{
                      bgcolor: "rgba(255,207,64,0.15)",
                      color: tokens.colors.primary.main,
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      px: 1,
                    }}
                  />
                </Box>
              )}

              {/* Price Display */}
              <Box
                sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 5 }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: tokens.fonts.display,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 500,
                  }}
                >
                  {item.price}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={scrollToOrder}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: tokens.colors.neutral.black,
                }}
              >
                Order Now
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const Special: React.FC = () => {
  return (
    <Box
      component="section"
      id="special"
      aria-label="Today's Specials"
      sx={{
        bgcolor: tokens.colors.neutral.black,
        position: "relative",
        py: { xs: 8, md: 0 },
      }}
    >
      {/* Background Title - Desktop Only */}
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: 100,
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "15vw",
            fontFamily: tokens.fonts.display,
            fontWeight: 400,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          SPECIAL
        </Typography>
      </Box>

      {/* Section Header - Mobile */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          component="h2"
          sx={{
            color: "white",
            fontFamily: tokens.fonts.display,
            fontSize: "2.5rem",
            textTransform: "uppercase",
          }}
        >
          Specials
        </Typography>
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {todaySpecials.map((item, index) => (
          <SpecialItem key={item.title} item={item} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Special;
