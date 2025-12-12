import { createTheme } from "@mui/material/styles";

/**
 * ENHANCED DESIGN SYSTEM FOR NEW NANTHUS KITCHEN
 * Consistent spacing, typography, colors, and accessibility
 */

// Design Tokens - Exported for use in components
export const tokens = {
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
    xxxl: 96,
    section: { xs: 80, md: 120, lg: 160 }
  },
  colors: {
    primary: { main: '#FFCF40', light: '#FFE080', dark: '#E6BB00' },
    secondary: { main: '#4FC3F7', light: '#80D8FF', dark: '#0091EA' },
    neutral: { black: '#050505', darker: '#080808', dark: '#0D0D0D', medium: '#1A1A1A', light: '#2A2A2A' },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.85)',
      tertiary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.05)',
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      strong: 'rgba(255, 255, 255, 0.3)',
    }
  },
  fonts: {
    display: '"Tenor Sans", serif',
    body: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.15)',
    md: '0 4px 16px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.3)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.4)',
  }
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      dark: tokens.colors.primary.dark,
      contrastText: "#000000",
    },
    secondary: {
      main: tokens.colors.secondary.main,
      light: tokens.colors.secondary.light,
      dark: tokens.colors.secondary.dark,
      contrastText: "#000000",
    },
    background: {
      default: tokens.colors.neutral.black,
      paper: tokens.colors.neutral.medium,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
      disabled: tokens.colors.text.disabled,
    },
    divider: tokens.colors.border.light,
  },
  spacing: 8,
  typography: {
    fontFamily: tokens.fonts.body,
    h1: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize: '6rem',
      lineHeight: 0.9,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      '@media (max-width:900px)': { fontSize: '4rem' },
      '@media (max-width:600px)': { fontSize: '2.75rem' },
    },
    h2: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize: '4.5rem',
      lineHeight: 0.95,
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
      '@media (max-width:900px)': { fontSize: '3rem' },
      '@media (max-width:600px)': { fontSize: '2.25rem' },
    },
    h3: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize: '3rem',
      lineHeight: 1,
      textTransform: 'uppercase',
      '@media (max-width:900px)': { fontSize: '2.25rem' },
      '@media (max-width:600px)': { fontSize: '1.75rem' },
    },
    h4: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize: '2rem',
      lineHeight: 1.1,
      textTransform: 'uppercase',
      '@media (max-width:600px)': { fontSize: '1.5rem' },
    },
    h5: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      textTransform: 'uppercase',
      '@media (max-width:600px)': { fontSize: '1.25rem' },
    },
    h6: {
      fontFamily: tokens.fonts.body,
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      '@media (max-width:600px)': { fontSize: '1rem' },
    },
    body1: {
      fontFamily: tokens.fonts.body,
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: tokens.fonts.body,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: tokens.fonts.body,
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: tokens.fonts.body,
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontFamily: tokens.fonts.body,
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 2.66,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          minHeight: 44,
          padding: '12px 32px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          transition: tokens.transitions.normal,
          '&:focus-visible': {
            outline: `2px solid ${tokens.colors.primary.main}`,
            outlineOffset: 2,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: tokens.shadows.md, transform: 'translateY(-2px)' },
          '&:active': { transform: 'translateY(0)', boxShadow: tokens.shadows.sm },
        },
        outlined: {
          borderWidth: 1,
          '&:hover': { borderWidth: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)' },
        },
        sizeLarge: { padding: '16px 40px', fontSize: '1rem' },
        sizeSmall: { padding: '8px 24px', fontSize: '0.75rem' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiInputBase-root': { minHeight: 48 } },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          '&:focus-visible': {
            outline: `2px solid ${tokens.colors.primary.main}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: tokens.transitions.fast,
          '&:hover': { textDecoration: 'underline' },
          '&:focus-visible': {
            outline: `2px solid ${tokens.colors.primary.main}`,
            outlineOffset: 2,
            borderRadius: 2,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { '@media (max-width:600px)': { paddingLeft: 16, paddingRight: 16 } },
      },
    },
  },
});

export default theme;
