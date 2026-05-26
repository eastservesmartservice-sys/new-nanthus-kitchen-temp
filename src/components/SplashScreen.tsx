import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { logoImage, logoImageSrcSet } from "../data/site";
import css from "./SplashScreen.module.css";

const SPLASH_KEY = "nk_splash_seen_v5";
const HOLD_MS = 1800;
const EXIT_MS = 420;

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
    <div
      className={css.mote}
      style={
        {
          left: `${x}%`,
          top: `${y}%`,
          width: r * 2,
          height: r * 2,
          "--mote-rise": `${38 + r * 12}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${dur}s`,
        } as CSSProperties
      }
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

  const motes = [
    { x: 22, y: 72, r: 1.4, delay: 0.35, dur: 2.9 },
    { x: 38, y: 80, r: 1.0, delay: 0.7, dur: 2.5 },
    { x: 52, y: 75, r: 1.8, delay: 0.25, dur: 3.2 },
    { x: 66, y: 69, r: 1.2, delay: 0.85, dur: 2.7 },
    { x: 76, y: 65, r: 1.5, delay: 0.55, dur: 3.0 },
    { x: 30, y: 63, r: 1.0, delay: 1.05, dur: 2.4 },
    { x: 60, y: 82, r: 1.7, delay: 0.6, dur: 3.1 },
    { x: 48, y: 59, r: 1.0, delay: 1.25, dur: 2.6 },
    { x: 78, y: 77, r: 1.3, delay: 0.35, dur: 2.8 },
    { x: 15, y: 55, r: 1.1, delay: 0.9, dur: 2.5 },
  ];
  const rays = [-48, -32, -18, 0, 18, 32, 48];

  return (
    <div
      className={`${css.overlay} ${exiting ? css.overlayExit : ""}`}
      style={{ "--exit-ms": `${EXIT_MS}ms`, "--hold-ms": `${HOLD_MS}ms` } as CSSProperties}
    >
      <div className={css.backgroundImage} />
      <div className={css.darkOverlay} />
      <div className={css.gradientWash} />

      <div className={css.raysContainer}>
        {rays.map((angle, i) => (
          <div
            key={angle}
            className={css.ray}
            style={
              {
                "--ray-angle": `${angle}deg`,
                "--ray-opacity": 0.1 + (3 - Math.abs(i - 3)) * 0.04,
                animationDelay: `${0.25 + i * 0.05}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {motes.map((mote, i) => (
        <Mote key={i} {...mote} />
      ))}

      <div className={css.rulerTop} />
      <div className={css.rulerBottom} />

      <div className={css.content}>
        <div className={css.logoWrapper}>
          <div className={css.logoGlow} />
          <img
            src={logoImage}
            srcSet={logoImageSrcSet}
            sizes="88px"
            alt="New Nanthus Kitchen"
            loading="eager"
            decoding="async"
            className={css.logo}
          />
        </div>

        <div className={css.rule} />

        <div className={css.tamilText}>வணக்கம்</div>

        <p className={css.welcomeLabel}>Welcome to New Nanthus Kitchen</p>

        <p className={css.welcomeCaption}>
          யாழ்ப்பாணத்தின் உண்மையான பாரம்பரிய சுவையும், மனதை கவரும் சமையல்
          அனுபவமும் இங்கே உங்களை வரவேற்கிறது.
        </p>
      </div>

      <div className={css.progressBar} />
    </div>
  );
}
