import { createTheme } from "@mui/material/styles";

/**
 * NEW NANTHUS KITCHEN — Design System
 * Warm light theme with dark-gold palette
 */

export const tokens = {
  colors: {
    // Warm cream — premium restaurant feel on light backgrounds
    bg: {
      base:     '#FDFAF4',   // warm cream white — page background
      surface:  '#F5F0E4',   // slightly warmer — section backgrounds
      card:     '#EDE7D6',   // card background
      elevated: '#E3DBC8',   // elevated / hover
      overlay:  '#FAF7EE',   // footer / lightest overlays
    },
    primary: {
      main:  '#B8860B',                    // dark goldenrod — readable on cream
      dark:  '#8B6200',
      light: '#E6B800',
      cream: '#FFF8DC',
      glow:  'rgba(184,134,11,0.10)',
      glow2: 'rgba(184,134,11,0.05)',
    },
    text: {
      primary:   '#1A1208',                // warm near-black
      secondary: 'rgba(26,18,8,0.72)',
      tertiary:  'rgba(26,18,8,0.48)',
      disabled:  'rgba(26,18,8,0.28)',
    },
    border: {
      faint:  'rgba(120,90,20,0.10)',
      subtle: 'rgba(120,90,20,0.16)',
      light:  'rgba(120,90,20,0.24)',
      medium: 'rgba(120,90,20,0.36)',
      strong: 'rgba(120,90,20,0.55)',
    },
    // Dark sections — hero, footer, page headers, cinematic blocks
    dark: {
      bg:            '#0D0B08',
      surface:       '#1A1610',
      card:          '#242018',
      elevated:      '#2E2820',
      textPrimary:   '#F5F0E4',
      textSecondary: 'rgba(245,240,228,0.72)',
      textTertiary:  'rgba(245,240,228,0.48)',
      borderFaint:   'rgba(184,134,11,0.08)',
      borderSubtle:  'rgba(184,134,11,0.15)',
      borderLight:   'rgba(184,134,11,0.25)',
    },
  },
  fonts: {
    display: '"Tenor Sans", "Poppins", serif',
    body:    '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  transitions: {
    fast:   '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow:   '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '650ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
  shadows: {
    sm:     '0 2px 12px rgba(0,0,0,0.08)',
    md:     '0 6px 24px rgba(0,0,0,0.12)',
    lg:     '0 12px 48px rgba(0,0,0,0.16)',
    gold:   '0 0 24px rgba(184,134,11,0.22), 0 4px 16px rgba(0,0,0,0.10)',
    goldLg: '0 0 48px rgba(184,134,11,0.18), 0 8px 32px rgba(0,0,0,0.12)',
  },
  radius: {
    xs:   '4px',
    sm:   '8px',
    md:   '12px',
    lg:   '20px',
    xl:   '28px',
    pill: '9999px',
  },
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main:         tokens.colors.primary.main,
      light:        tokens.colors.primary.light,
      dark:         tokens.colors.primary.dark,
      contrastText: '#FDFAF4',
    },
    background: {
      default: tokens.colors.bg.base,
      paper:   tokens.colors.bg.card,
    },
    text: {
      primary:   tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
      disabled:  tokens.colors.text.disabled,
    },
    divider: tokens.colors.border.subtle,
  },
  spacing: 8,
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: tokens.fonts.body,
    h1: {
      fontFamily:    tokens.fonts.display,
      fontWeight:    400,
      fontSize:      '6rem',
      lineHeight:    0.92,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': { fontSize: '3.75rem' },
      '@media (max-width:600px)': { fontSize: '2.75rem' },
    },
    h2: {
      fontFamily:    tokens.fonts.display,
      fontWeight:    400,
      fontSize:      '4rem',
      lineHeight:    0.95,
      letterSpacing: '-0.015em',
      '@media (max-width:900px)': { fontSize: '2.75rem' },
      '@media (max-width:600px)': { fontSize: '2.1rem' },
    },
    h3: {
      fontFamily:    tokens.fonts.display,
      fontWeight:    400,
      fontSize:      '2.5rem',
      lineHeight:    1.05,
      '@media (max-width:600px)': { fontSize: '1.8rem' },
    },
    h4: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize:   '1.75rem',
      lineHeight: 1.15,
    },
    h5: {
      fontFamily: tokens.fonts.display,
      fontWeight: 400,
      fontSize:   '1.35rem',
    },
    h6: {
      fontFamily:    tokens.fonts.body,
      fontWeight:    600,
      fontSize:      '1rem',
      letterSpacing: '0.04em',
    },
    body1: {
      fontFamily: tokens.fonts.body,
      fontSize:   '1rem',
      lineHeight: 1.75,
    },
    body2: {
      fontFamily: tokens.fonts.body,
      fontSize:   '0.875rem',
      lineHeight: 1.65,
    },
    button: {
      fontFamily:    tokens.fonts.body,
      fontWeight:    600,
      fontSize:      '0.8rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily:    tokens.fonts.body,
      fontSize:      '0.72rem',
      letterSpacing: '0.06em',
    },
    overline: {
      fontFamily:    tokens.fonts.body,
      fontSize:      '0.68rem',
      fontWeight:    700,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius:  tokens.radius.sm,
          minHeight:     44,
          padding:       '12px 28px',
          fontWeight:    600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize:      '0.78rem',
          transition:    tokens.transitions.normal,
          '&:focus-visible': {
            outline:       `2px solid ${tokens.colors.primary.main}`,
            outlineOffset: 2,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: tokens.shadows.gold, transform: 'translateY(-2px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': { borderWidth: '1px', backgroundColor: tokens.colors.primary.glow2 },
        },
        sizeLarge: { padding: '14px 36px', fontSize: '0.85rem' },
        sizeSmall: { padding: '8px 20px',  fontSize: '0.72rem' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: tokens.radius.sm,
            color: tokens.colors.text.primary,
            '& fieldset':             { borderColor: tokens.colors.border.subtle },
            '&:hover fieldset':       { borderColor: tokens.colors.border.light },
            '&.Mui-focused fieldset': { borderColor: tokens.colors.primary.main },
          },
          '& .MuiInputLabel-root': {
            color: tokens.colors.text.tertiary,
            '&.Mui-focused': { color: tokens.colors.primary.main },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: { backgroundImage: 'none', '&:before': { display: 'none' } },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: tokens.radius.xs },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundImage: 'none' },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': { paddingLeft: 20, paddingRight: 20 },
        },
      },
    },
  },
});

export default theme;
