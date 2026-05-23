import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const updateScrollState = () => {
      frame.current = null;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setVisible(scrollTop > 320);
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      onClick={scrollUp}
      role="button"
      tabIndex={0}
      aria-label="Scroll back to top"
      onKeyDown={(e) => e.key === "Enter" && scrollUp()}
      sx={{
        position: "fixed",
        right: 0,
        bottom: { xs: 160, md: 180 },
        zIndex: 1198,
        width: 36,
        height: 130,
        cursor: "pointer",
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.45s cubic-bezier(0.2,0.8,0.2,1)",
        /* left-side rounded tab shape */
        borderRadius: "8px 0 0 8px",
        overflow: "hidden",
        boxShadow: "-3px 0 18px rgba(0,0,0,0.13)",
        "&:hover .fill-bar": {
          bgcolor: tokens.colors.primary.light,
        },
        "&:hover .tab-label": {
          letterSpacing: "0.18em",
        },
        "&:active": {
          transform: "translateX(3px)",
        },
      }}
    >
      {/* Background track */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: tokens.colors.bg.inverse,
        }}
      />

      {/* Progress fill — grows from bottom to top */}
      <Box
        className="fill-bar"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: `${progress * 100}%`,
          bgcolor: tokens.colors.primary.main,
          transition: "height 0.1s linear, background-color 0.25s ease",
        }}
      />

      {/* Rotated label */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.2,
          zIndex: 1,
        }}
      >
        {/* Arrow */}
        <Box
          sx={{
            width: 18,
            height: 18,
            borderTop: `2px solid ${tokens.colors.dark.textSecondary}`,
            borderLeft: `2px solid ${tokens.colors.dark.textSecondary}`,
            transform: "rotate(45deg) translateY(3px)",
            transition: tokens.transitions.fast,
          }}
        />
        {/* Text */}
        <Typography
          className="tab-label"
          sx={{
            fontSize: "0.58rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: tokens.colors.dark.textSecondary,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            transition: "letter-spacing 0.25s ease",
            lineHeight: 1,
          }}
        >
          Top
        </Typography>
      </Box>
    </Box>
  );
}
