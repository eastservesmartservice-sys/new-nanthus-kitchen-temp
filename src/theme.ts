import { createTheme } from "@mui/material/styles";

export const tokens = {
  colors: {
    bg: {
      base: "#fbfaf6",
      warm: "#f4f0e8",
      surface: "#eee8dc",
      card: "#ffffff",
      elevated: "#fff8ee",
      inverse: "#171b17",
    },
    primary: {
      main: "#F5A623",
      light: "#F8C45A",
      dark: "#C07A10",
      pale: "#FFF8E0",
      glow: "rgba(245, 166, 35, 0.15)",
      glow2: "rgba(245, 166, 35, 0.08)",
    },
    secondary: {
      main: "#19766f",
      light: "#55a69c",
      dark: "#0f4f4a",
      pale: "#e8f4f1",
      glow: "rgba(25, 118, 111, 0.13)",
      glow2: "rgba(25, 118, 111, 0.07)",
    },
    saffron: {
      main: "#d89627",
      light: "#f0bf66",
      pale: "#fff6dd",
    },
    text: {
      primary: "#1d211c",
      secondary: "rgba(29, 33, 28, 0.74)",
      tertiary: "rgba(29, 33, 28, 0.56)",
      disabled: "rgba(29, 33, 28, 0.34)",
      inverse: "#fbfaf6",
    },
    border: {
      faint: "rgba(29, 33, 28, 0.06)",
      subtle: "rgba(29, 33, 28, 0.1)",
      light: "rgba(29, 33, 28, 0.16)",
      medium: "rgba(29, 33, 28, 0.26)",
      strong: "rgba(29, 33, 28, 0.42)",
    },
    line: {
      faint: "rgba(29, 33, 28, 0.06)",
      subtle: "rgba(29, 33, 28, 0.1)",
      light: "rgba(29, 33, 28, 0.16)",
      medium: "rgba(29, 33, 28, 0.26)",
    },
    dark: {
      bg: "#171b17",
      surface: "#20261f",
      card: "#283026",
      elevated: "#30392e",
      textPrimary: "#fbfaf6",
      textSecondary: "rgba(251, 250, 246, 0.76)",
      textTertiary: "rgba(251, 250, 246, 0.54)",
      borderSubtle: "rgba(251, 250, 246, 0.12)",
      borderLight: "rgba(251, 250, 246, 0.22)",
      borderFaint: "rgba(251, 250, 246, 0.08)",
    },
  },
  fonts: {
    display: '"Georgia", "Times New Roman", serif',
    heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SFMono-Regular", Consolas, monospace',
  },
  transitions: {
    fast: "140ms ease",
    normal: "240ms ease",
    slow: "420ms ease",
    spring: "360ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    bounce: "420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
  shadows: {
    xs: "0 1px 3px rgba(29, 33, 28, 0.08)",
    sm: "0 4px 12px rgba(29, 33, 28, 0.08)",
    md: "0 10px 28px rgba(29, 33, 28, 0.1)",
    lg: "0 16px 44px rgba(29, 33, 28, 0.12)",
    xl: "0 24px 64px rgba(29, 33, 28, 0.14)",
    orange: "0 8px 24px rgba(245, 166, 35, 0.22)",
    orangeLg: "0 14px 34px rgba(245, 166, 35, 0.28)",
    blue: "0 8px 24px rgba(25, 118, 111, 0.2)",
    card: "0 1px 0 rgba(29, 33, 28, 0.08), 0 10px 26px rgba(29, 33, 28, 0.08)",
    float: "0 18px 48px rgba(29, 33, 28, 0.16)",
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "8px",
    xl: "8px",
    xxl: "8px",
    pill: "999px",
    blob: "8px",
  },
  gradients: {
    orange: "linear-gradient(135deg, #F5A623 0%, #F8C45A 100%)",
    orangeDeep: "linear-gradient(135deg, #C07A10 0%, #F5A623 100%)",
    blue: "linear-gradient(135deg, #19766f 0%, #55a69c 100%)",
    blueDeep: "linear-gradient(135deg, #0f4f4a 0%, #19766f 100%)",
    hero: "linear-gradient(135deg, rgba(23, 27, 23, 0.84), rgba(23, 27, 23, 0.3))",
    warmFade: "linear-gradient(180deg, #fbfaf6 0%, #eee8dc 100%)",
    heroMesh: "linear-gradient(135deg, rgba(23, 27, 23, 0.82), rgba(23, 27, 23, 0.2))",
    textOrange: "linear-gradient(135deg, #C07A10 0%, #F5A623 100%)",
    darkCard: "linear-gradient(135deg, #20261f 0%, #171b17 100%)",
    cinematic: "linear-gradient(180deg, rgba(23, 27, 23, 0) 0%, rgba(23, 27, 23, 0.72) 100%)",
  },
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      dark: tokens.colors.primary.dark,
      contrastText: tokens.colors.text.primary,
    },
    secondary: {
      main: tokens.colors.secondary.main,
      light: tokens.colors.secondary.light,
      dark: tokens.colors.secondary.dark,
      contrastText: "#ffffff",
    },
    background: {
      default: tokens.colors.bg.base,
      paper: tokens.colors.bg.card,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
      disabled: tokens.colors.text.disabled,
    },
    divider: tokens.colors.line.subtle,
    error: { main: "#b42318" },
    success: { main: "#19766f" },
  },
  spacing: 8,
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: tokens.fonts.body,
    h1: {
      fontFamily: tokens.fonts.display,
      fontWeight: 700,
      fontSize: "4.75rem",
      lineHeight: 1,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: tokens.fonts.display,
      fontWeight: 700,
      fontSize: "3.25rem",
      lineHeight: 1.05,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: tokens.fonts.display,
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.1,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: tokens.fonts.heading,
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.2,
      letterSpacing: 0,
    },
    h5: {
      fontFamily: tokens.fonts.heading,
      fontWeight: 700,
      fontSize: "1.15rem",
      letterSpacing: 0,
    },
    h6: {
      fontFamily: tokens.fonts.heading,
      fontWeight: 700,
      fontSize: "0.95rem",
      letterSpacing: 0,
    },
    body1: { fontSize: "1rem", lineHeight: 1.75, letterSpacing: 0 },
    body2: { fontSize: "0.875rem", lineHeight: 1.7, letterSpacing: 0 },
    button: {
      fontFamily: tokens.fonts.heading,
      fontWeight: 700,
      fontSize: "0.84rem",
      textTransform: "none",
      letterSpacing: 0,
    },
    caption: {
      fontSize: "0.74rem",
      letterSpacing: 0,
      color: tokens.colors.text.tertiary,
    },
    overline: {
      fontFamily: tokens.fonts.heading,
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          minHeight: 42,
          boxShadow: "none",
          textTransform: "none",
          transition: tokens.transitions.spring,
          "&:focus-visible": {
            outline: `2px solid ${tokens.colors.secondary.main}`,
            outlineOffset: 3,
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: tokens.shadows.md,
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderWidth: "1px",
          "&:hover": { borderWidth: "1px" },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: tokens.radius.md,
            background: tokens.colors.bg.card,
            "& fieldset": { borderColor: tokens.colors.line.light },
            "&:hover fieldset": { borderColor: tokens.colors.line.medium },
            "&.Mui-focused fieldset": {
              borderColor: tokens.colors.secondary.main,
              borderWidth: "1px",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: tokens.radius.sm, fontWeight: 700 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          "&:focus-visible": {
            outline: `2px solid ${tokens.colors.secondary.main}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          "&:focus-visible": {
            outline: `2px solid ${tokens.colors.secondary.main}`,
            outlineOffset: 3,
            borderRadius: tokens.radius.sm,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.colors.secondary.main,
          },
        },
      },
    },
  },
});

export default theme;
