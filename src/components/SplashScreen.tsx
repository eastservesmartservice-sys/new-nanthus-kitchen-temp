import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import css from "./SplashScreen.module.css";

const SPLASH_KEY = "nk_splash_seen_v5";
const HOLD_MS = 4600;
const EXIT_MS = 900;

function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_KEY) === "1";
  } catch {
    return false;
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_KEY, "1");
  } catch {
    // Storage can be unavailable in some privacy modes.
  }
}

function Mote({
  x,
  y,
  r,
  delay,
  dur,
}: {
  x: number;
  y: number;
  r: number;
  delay: number;
  dur: number;
}) {
  return (
    <motion.div
      className={css.mote}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.85, 0], y: -(38 + r * 12) }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        repeatDelay: dur + 1.4,
        ease: "easeOut",
      }}
      style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2 }}
    />
  );
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => !hasSeenSplash());
  const [exiting, setExiting] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    holdTimer.current = setTimeout(() => {
      setExiting(true);
      exitTimer.current = setTimeout(() => {
        setVisible(false);
        markSplashSeen();
        document.body.style.overflow = "";
      }, EXIT_MS);
    }, HOLD_MS);
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const MOTES = [
    { x: 22, y: 72, r: 1.4, delay: 0.6, dur: 2.9 },
    { x: 38, y: 80, r: 1.0, delay: 1.1, dur: 2.5 },
    { x: 52, y: 75, r: 1.8, delay: 0.4, dur: 3.2 },
    { x: 66, y: 69, r: 1.2, delay: 1.3, dur: 2.7 },
    { x: 76, y: 65, r: 1.5, delay: 0.8, dur: 3.0 },
    { x: 30, y: 63, r: 1.0, delay: 1.6, dur: 2.4 },
    { x: 60, y: 82, r: 1.7, delay: 0.9, dur: 3.1 },
    { x: 48, y: 59, r: 1.0, delay: 2.0, dur: 2.6 },
    { x: 78, y: 77, r: 1.3, delay: 0.5, dur: 2.8 },
    { x: 15, y: 55, r: 1.1, delay: 1.4, dur: 2.5 },
  ];

  const RAYS = [-48, -32, -18, 0, 18, 32, 48];

  return (
    <motion.div
      className={css.overlay}
      key="splash"
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background image + dark overlay */}
      <div className={css.backgroundImage} />
      <div className={css.darkOverlay} />

      {/* Warm gold radial wash */}
      <motion.div
        className={css.gradientWash}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0 }}
      />

      {/* Light rays from centre */}
      <div className={css.raysContainer}>
        {RAYS.map((angle, i) => (
          <motion.div
            key={i}
            className={css.ray}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: 1,
              opacity: 0.1 + (3 - Math.abs(i - 3)) * 0.04,
            }}
            transition={{
              duration: 2.0,
              delay: 0.5 + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transform: `rotate(${angle}deg)` }}
          />
        ))}
      </div>

      {/* Floating motes */}
      {MOTES.map((m, i) => (
        <Mote key={i} {...m} />
      ))}

      {/* Gold hairline rulers */}
      <motion.div
        className={css.rulerTop}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      />
      <motion.div
        className={css.rulerBottom}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      />

      {/* ── Core content ── */}
      <div className={css.content}>
        {/* Logo */}
        <motion.div
          className={css.logoWrapper}
          initial={{ opacity: 0, scale: 0.72, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
        >
          <div className={css.logoGlow} />
          <img
            src="/new_nanthus_kitchen_logo.png"
            alt="New Nanthus Kitchen"
            loading="eager"
            decoding="async"
            className={css.logo}
          />
        </motion.div>

        {/* Gold divider rule */}
        <motion.div
          className={css.rule}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        />

        <motion.div
          className={css.tamilText}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.4, ease: "easeOut" }}
        >
          வணக்கம்
        </motion.div>

        <motion.p
          className={css.welcomeLabel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.9, ease: "easeOut" }}
        >
          Welcome to New Nanthus Kitchen
        </motion.p>

        <motion.p
          className={css.welcomeCaption}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 2.2, ease: "easeOut" }}
        >
          யாழ்ப்பாணத்தின் உண்மையான பாரம்பரிய சுவையும், மனதை கவரும் சமையல்
          அனுபவமும் இங்கே உங்களை வரவேற்கிறது.
        </motion.p>
      </div>

      {/* Progress ticker */}
      <motion.div
        className={css.progressBar}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: HOLD_MS / 1000, ease: "linear", delay: 0.2 }}
        style={{ transformOrigin: "left center" }}
      />
    </motion.div>
  );
}
