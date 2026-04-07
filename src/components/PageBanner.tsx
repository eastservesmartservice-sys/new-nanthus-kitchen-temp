import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../theme";

interface PageBannerProps {
  eyebrow:    string;
  title:      string;
  highlight?: string;
  subtitle?:  string;
  watermark:  string;
  children?:  React.ReactNode;
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const PageBanner: React.FC<PageBannerProps> = ({
  eyebrow, title, highlight, subtitle, watermark, children,
}) => (
  <Box
    component="section"
    sx={{
      pt:       { xs: 14, md: 16, lg: 18 },
      pb:       { xs: 7,  md: 10, lg: 12 },
      bgcolor:  tokens.colors.dark.bg,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Full-width horizontal rule at very bottom — gold gradient */}
    <Box
      aria-hidden="true"
      sx={{
        position:   "absolute",
        bottom:     0, left: 0, right: 0,
        height:     "1px",
        background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.primary.main} 30%, ${tokens.colors.primary.main} 70%, transparent 100%)`,
        opacity:    0.35,
      }}
    />

    {/* Diagonal light beam — top right */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        top:           "-20%",
        right:         "10%",
        width:         "1px",
        height:        "140%",
        background:    `linear-gradient(180deg, transparent 0%, ${tokens.colors.primary.main} 40%, ${tokens.colors.primary.main} 60%, transparent 100%)`,
        opacity:       0.06,
        transform:     "rotate(20deg)",
        pointerEvents: "none",
      }}
    />
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        top:           "-20%",
        right:         "25%",
        width:         "1px",
        height:        "140%",
        background:    `linear-gradient(180deg, transparent 0%, ${tokens.colors.primary.main} 40%, ${tokens.colors.primary.main} 60%, transparent 100%)`,
        opacity:       0.04,
        transform:     "rotate(20deg)",
        pointerEvents: "none",
      }}
    />

    {/* Watermark — large ghost text right side */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        top:           "50%",
        right:         "-1%",
        transform:     "translateY(-50%)",
        fontFamily:    tokens.fonts.display,
        fontSize:      { xs: "28vw", sm: "22vw", md: "18vw", lg: "15vw" },
        color:         "transparent",
        WebkitTextStroke: `1px ${tokens.colors.primary.main}`,
        opacity:       0.06,
        lineHeight:    1,
        userSelect:    "none",
        pointerEvents: "none",
        textTransform: "uppercase",
        letterSpacing: "-0.03em",
      }}
    >
      {watermark}
    </Box>

    {/* Radial gold glow — left */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        top:           "50%",
        left:          "-5%",
        transform:     "translateY(-50%)",
        width:         "55vw",
        height:        "200%",
        background:    "radial-gradient(ellipse at left center, rgba(184,134,11,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }}
    />

    {/* Subtle dot grid */}
    <Box
      aria-hidden="true"
      sx={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `radial-gradient(circle, rgba(184,134,11,0.12) 1px, transparent 1px)`,
        backgroundSize:  "32px 32px",
        opacity:         0.18,
        pointerEvents:   "none",
        maskImage:       "radial-gradient(ellipse 60% 100% at 80% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 100% at 80% 50%, black 0%, transparent 100%)",
      }}
    />

    <Container
      maxWidth="xl"
      sx={{ position: "relative", zIndex: 1, px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}
    >
      <motion.div variants={container} initial="hidden" animate="visible">

        {/* Eyebrow */}
        <motion.div variants={item}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: { xs: 2.5, md: 3 } }}>
            <Box sx={{
              width:   { xs: 24, md: 36 },
              height:  "1px",
              background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
            }} />
            <Typography
              variant="overline"
              sx={{
                color:         tokens.colors.primary.main,
                letterSpacing: "0.3em",
                fontSize:      { xs: "0.6rem", md: "0.65rem" },
              }}
            >
              {eyebrow}
            </Typography>
            <Box sx={{
              flex:       1,
              maxWidth:   80,
              height:     "1px",
              background: `linear-gradient(90deg, rgba(184,134,11,0.3), transparent)`,
            }} />
          </Box>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item}>
          <Typography
            component="h1"
            sx={{
              fontFamily:    tokens.fonts.display,
              fontSize:      { xs: "3rem", sm: "4rem", md: "5rem", lg: "6rem" },
              fontWeight:    400,
              textTransform: "uppercase",
              lineHeight:    0.88,
              letterSpacing: "-0.03em",
            }}
          >
            <Box component="span" sx={{
              color:            "transparent",
              WebkitTextStroke: `1px rgba(245,240,228,0.3)`,
            }}>
              {title}
            </Box>
            {highlight && (
              <>
                {" "}
                <Box component="span" sx={{
                  color:      tokens.colors.primary.main,
                  textShadow: "0 0 60px rgba(184,134,11,0.3)",
                }}>
                  {highlight}
                </Box>
              </>
            )}
          </Typography>
        </motion.div>

        {/* Gold ornament */}
        <motion.div variants={item}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: { xs: 3, md: 3.5 } }}>
            <Box sx={{
              width:      { xs: 48, md: 64 },
              height:     "1px",
              background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
            }} />
            <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: tokens.colors.primary.main, opacity: 0.7 }} />
            <Box sx={{ width: 20, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.3 }} />
          </Box>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.div variants={item}>
            <Typography
              sx={{
                color:      tokens.colors.dark.textTertiary,
                fontSize:   { xs: "0.88rem", md: "0.95rem", lg: "1rem" },
                lineHeight: 1.8,
                maxWidth:   { xs: "100%", md: 500, lg: 580 },
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}

        {/* Extra slot */}
        {children && (
          <motion.div variants={item}>
            <Box sx={{ mt: { xs: 3.5, md: 4 } }}>{children}</Box>
          </motion.div>
        )}

      </motion.div>
    </Container>
  </Box>
);

export default PageBanner;
