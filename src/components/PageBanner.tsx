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
      pb:       { xs: 8,  md: 11, lg: 13 },
      bgcolor:  tokens.colors.dark.bg,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Animated background gradient */}
    <Box
      aria-hidden="true"
      sx={{
        position:      "absolute",
        inset:         0,
        background:    `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(184,134,11,0.07) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 80% at 85% 20%, rgba(184,134,11,0.04) 0%, transparent 55%)`,
        pointerEvents: "none",
      }}
    />

    {/* Animated subtle dot grid */}
    <Box
      aria-hidden="true"
      sx={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `radial-gradient(circle, rgba(184,134,11,0.14) 1px, transparent 1px)`,
        backgroundSize:  "28px 28px",
        opacity:         0.22,
        pointerEvents:   "none",
        maskImage:       "radial-gradient(ellipse 70% 100% at 85% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 85% 50%, black 0%, transparent 100%)",
      }}
    />

    {/* Full-width gold line at bottom */}
    <Box
      aria-hidden="true"
      sx={{
        position:   "absolute",
        bottom:     0, left: 0, right: 0,
        height:     "1px",
        background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.primary.main} 25%, ${tokens.colors.primary.light} 50%, ${tokens.colors.primary.main} 75%, transparent 100%)`,
        opacity:    0.4,
      }}
    />

    {/* Animated diagonal light beam — primary */}
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scaleY: 0.6 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, pointerEvents: "none" }}
    >
      <Box
        sx={{
          position:   "absolute",
          top:        "-20%",
          right:      "12%",
          width:      "1px",
          height:     "140%",
          background: `linear-gradient(180deg, transparent 0%, ${tokens.colors.primary.main} 35%, ${tokens.colors.primary.light} 50%, ${tokens.colors.primary.main} 65%, transparent 100%)`,
          opacity:    0.10,
          transform:  "rotate(18deg)",
        }}
      />
      <Box
        sx={{
          position:   "absolute",
          top:        "-20%",
          right:      "28%",
          width:      "1px",
          height:     "140%",
          background: `linear-gradient(180deg, transparent 0%, ${tokens.colors.primary.main} 35%, ${tokens.colors.primary.main} 65%, transparent 100%)`,
          opacity:    0.05,
          transform:  "rotate(18deg)",
        }}
      />
    </motion.div>

    {/* Watermark — large ghost text right side */}
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:      "absolute",
        top:           "50%",
        right:         "-1%",
        transform:     "translateY(-50%)",
        fontFamily:    tokens.fonts.display,
        lineHeight:    1,
        userSelect:    "none",
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      <Box
        sx={{
          fontFamily:       tokens.fonts.display,
          fontSize:         { xs: "28vw", sm: "22vw", md: "18vw", lg: "15vw" },
          color:            "transparent",
          WebkitTextStroke: `1px ${tokens.colors.primary.main}`,
          opacity:          0.07,
          textTransform:    "uppercase",
          letterSpacing:    "-0.04em",
        }}
      >
        {watermark}
      </Box>
    </motion.div>

    <Container
      maxWidth="xl"
      sx={{ position: "relative", zIndex: 1, px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}
    >
      <motion.div variants={container} initial="hidden" animate="visible">

        {/* Eyebrow */}
        <motion.div variants={item}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: { xs: 2.5, md: 3.5 } }}>
            <Box sx={{
              width:   { xs: 24, md: 40 },
              height:  "1px",
              background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
            }} />
            <Typography
              variant="overline"
              sx={{
                color:         tokens.colors.primary.main,
                letterSpacing: "0.32em",
                fontSize:      { xs: "0.6rem", md: "0.67rem" },
              }}
            >
              {eyebrow}
            </Typography>
            <Box sx={{
              flex:       1,
              maxWidth:   { xs: 40, md: 80 },
              height:     "1px",
              background: `linear-gradient(90deg, rgba(184,134,11,0.35), transparent)`,
            }} />
          </Box>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item}>
          <Typography
            component="h1"
            sx={{
              fontFamily:    tokens.fonts.display,
              fontSize:      { xs: "3rem", sm: "4rem", md: "5.5rem", lg: "6.5rem" },
              fontWeight:    400,
              textTransform: "uppercase",
              lineHeight:    0.88,
              letterSpacing: "-0.03em",
            }}
          >
            <Box component="span" sx={{
              color:            "transparent",
              WebkitTextStroke: `1px rgba(245,240,228,0.28)`,
            }}>
              {title}
            </Box>
            {highlight && (
              <>
                {" "}
                <Box component="span" sx={{
                  color:      tokens.colors.primary.main,
                  textShadow: `0 0 80px rgba(184,134,11,0.40), 0 0 24px rgba(184,134,11,0.20)`,
                  display:    "inline-block",
                }}>
                  {highlight}
                </Box>
              </>
            )}
          </Typography>
        </motion.div>

        {/* Gold ornament */}
        <motion.div variants={item}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: { xs: 3.5, md: 4 } }}>
            <Box sx={{
              width:      { xs: 52, md: 72 },
              height:     "1px",
              background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
            }} />
            <Box sx={{
              width: 5, height: 5, borderRadius: "50%",
              bgcolor: tokens.colors.primary.main, opacity: 0.8,
              boxShadow: `0 0 8px rgba(184,134,11,0.5)`,
            }} />
            <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: tokens.colors.primary.main, opacity: 0.4 }} />
            <Box sx={{ width: 24, height: "1px", bgcolor: tokens.colors.primary.main, opacity: 0.28 }} />
          </Box>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.div variants={item}>
            <Typography
              sx={{
                color:      tokens.colors.dark.textTertiary,
                fontSize:   { xs: "0.88rem", md: "0.97rem", lg: "1.05rem" },
                lineHeight: 1.85,
                maxWidth:   { xs: "100%", md: 520, lg: 600 },
                letterSpacing: "0.01em",
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}

        {/* Extra slot */}
        {children && (
          <motion.div variants={item}>
            <Box sx={{ mt: { xs: 3.5, md: 4.5 } }}>{children}</Box>
          </motion.div>
        )}

      </motion.div>
    </Container>
  </Box>
);

export default PageBanner;
