import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import PageBanner from "../components/PageBanner";
import { motion, useScroll, useTransform } from "framer-motion";
import { tokens } from "../theme";

interface Special {
  tag:          string;
  title:        string;
  description:  string;
  price:        string;
  image:        string;
  availability: string;
  badge?:       string;
}

const specials: Special[] = [
  {
    tag:         "Daily Special",
    title:       "Everyday Lunch Boxes",
    description: "A complete meal with your choice of rice, curry, and accompaniments. Made fresh every morning — affordable, filling, and full of heritage.",
    price:       "$10",
    image:       "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",
    availability:"Available Every Day",
    badge:       "Best Value",
  },
  {
    tag:         "Weekend Special",
    title:       "Sri Lankan Chicken Soup",
    description: "Slow-simmered with aromatic spices, pandan, and lemongrass. Deeply comforting — a Nanthus weekend tradition that keeps our regulars coming back.",
    price:       "Market Price",
    image:       "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80",
    availability:"Saturday & Sunday Only",
  },
];

interface SpecialCardProps { special: Special; index: number; }

const SpecialCard: React.FC<SpecialCardProps> = ({ special, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY     = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);

  return (
    <Box
      ref={ref}
      component="article"
      sx={{
        minHeight:     { xs: "auto", md: "100vh" },
        display:       "flex",
        alignItems:    "center",
        py:            { xs: 8, md: 0 },
        position:      "relative",
      }}
    >
      {/* Large index number */}
      <Box
        aria-hidden="true"
        sx={{
          display:      { xs: "none", md: "block" },
          position:     "absolute",
          top:          "50%",
          [isEven ? "right" : "left"]: "1.5%",
          transform:    "translateY(-50%)",
          fontFamily:   tokens.fonts.display,
          fontSize:     "18rem",
          color:        tokens.colors.primary.main,
          opacity:      0.04,
          lineHeight:   1,
          pointerEvents:"none",
          userSelect:   "none",
        }}
      >
        0{index + 1}
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            display:       "flex",
            flexDirection: { xs: "column", md: isEven ? "row" : "row-reverse" },
            alignItems:    "center",
            gap:           { xs: 5, md: 10 },
          }}
        >
          {/* Image */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                position:     "relative",
                height:       { xs: 260, sm: 340, md: 480, lg: 540 },
                borderRadius: tokens.radius.lg,
                overflow:     "hidden",
                border:       `1px solid ${tokens.colors.border.subtle}`,
                boxShadow:    tokens.shadows.md,
              }}
            >
              <motion.div style={{ scale: imgScale, y: imgY, width: "100%", height: "100%" }}>
                <Box
                  component="img"
                  src={special.image}
                  alt={special.title}
                  loading="lazy"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              {/* Tag */}
              <Chip
                label={special.tag}
                sx={{
                  position:     "absolute",
                  top:          20, left: 20,
                  bgcolor:      tokens.colors.primary.main,
                  color:        tokens.colors.bg.base,
                  fontWeight:   700, fontSize: "0.7rem",
                  letterSpacing:"0.06em",
                  borderRadius: tokens.radius.xs,
                  height:       28,
                }}
              />
              {special.badge && (
                <Chip
                  label={special.badge}
                  sx={{
                    position:     "absolute",
                    top:          20, right: 20,
                    bgcolor:      "rgba(253,250,244,0.92)",
                    color:        tokens.colors.text.secondary,
                    fontWeight:   600, fontSize: "0.68rem",
                    borderRadius: tokens.radius.xs,
                    height:       28,
                    border:       `1px solid ${tokens.colors.border.subtle}`,
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? 32 : -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
                Chef's Special
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "2.2rem", md: "3rem", lg: "3.8rem" },
                  fontWeight:    400,
                  textTransform: "uppercase",
                  color:         tokens.colors.text.primary,
                  lineHeight:    0.92,
                  letterSpacing: "-0.01em",
                  mb:            3,
                }}
              >
                {special.title}
              </Typography>

              {/* Gold rule */}
              <Box sx={{ width: 48, height: "1.5px", bgcolor: tokens.colors.primary.main, opacity: 0.5, mb: 3 }} />

              <Typography sx={{ color: tokens.colors.text.secondary, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 440, mb: 4 }}>
                {special.description}
              </Typography>

              <Chip
                label={special.availability}
                sx={{
                  bgcolor:      tokens.colors.primary.glow,
                  color:        tokens.colors.primary.main,
                  fontWeight:   600,
                  fontSize:     "0.72rem",
                  height:       28,
                  border:       `1px solid ${tokens.colors.border.subtle}`,
                  borderRadius: tokens.radius.xs,
                  mb:           4,
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />

              {/* Price */}
              <Box sx={{ mb: 5 }}>
                <Typography
                  sx={{
                    color:      tokens.colors.primary.main,
                    fontFamily: tokens.fonts.display,
                    fontSize:   { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {special.price}
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/order"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.6, fontWeight: 700, color: tokens.colors.bg.base, fontSize: "0.82rem" }}
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

const SpecialsPage: React.FC = () => (
  <Box sx={{ bgcolor: tokens.colors.bg.surface }}>
    <PageBanner
      eyebrow="Chef's Selection"
      title="Today's"
      highlight="Specials"
      subtitle="Fresh, seasonal offerings made with care — every single day."
      watermark="Specials"
    />

    {/* Specials */}
    {specials.map((special, i) => (
      <Box
        key={special.title}
        sx={{ bgcolor: i % 2 === 0 ? tokens.colors.bg.surface : tokens.colors.bg.base }}
      >
        <SpecialCard special={special} index={i} />
      </Box>
    ))}

    {/* Bottom CTA */}
    <Box
      sx={{
        bgcolor:  tokens.colors.bg.card,
        py:       { xs: 10, md: 14 },
        textAlign:"center",
        borderTop:`1px solid ${tokens.colors.border.subtle}`,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="overline" sx={{ color: tokens.colors.primary.main, display: "block", mb: 2 }}>
          Full Menu
        </Typography>
        <Typography
          sx={{
            fontFamily:    tokens.fonts.display,
            fontSize:      { xs: "2rem", md: "2.75rem" },
            textTransform: "uppercase",
            color:         tokens.colors.text.primary,
            mb:            2,
          }}
        >
          Explore Everything
        </Typography>
        <Typography sx={{ color: tokens.colors.text.tertiary, mb: 4, fontSize: "0.9rem" }}>
          50+ dishes crafted with authentic Jaffna recipes.
        </Typography>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 5, py: 1.7, fontWeight: 700, color: tokens.colors.bg.base }}
        >
          View Full Menu
        </Button>
      </Container>
    </Box>
  </Box>
);

export default SpecialsPage;
