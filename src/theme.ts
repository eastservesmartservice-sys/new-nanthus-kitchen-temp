import { createTheme } from "@mui/material/styles";

/**
 * NEW NANTHUS KITCHEN — Design System v2
 * Warm light theme with dark-gold palette — Elevated
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
    sm:       '0 2px 12px rgba(0,0,0,0.08)',
    md:       '0 6px 24px rgba(0,0,0,0.12)',
    lg:       '0 12px 48px rgba(0,0,0,0.16)',
    xl:       '0 24px 64px rgba(0,0,0,0.20)',
    gold:     '0 0 24px rgba(184,134,11,0.28), 0 4px 20px rgba(0,0,0,0.12)',
    goldLg:   '0 0 52px rgba(184,134,11,0.22), 0 12px 40px rgba(0,0,0,0.14)',
    goldDeep: '0 0 0 1px rgba(184,134,11,0.15), 0 8px 32px rgba(184,134,11,0.12), 0 24px 64px rgba(0,0,0,0.20)',
    inner:    'inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  radius: {
    xs:   '4px',
    sm:   '8px',
    md:   '12px',
    lg:   '20px',
    xl:   '28px',
    xxl:  '40px',
    pill: '9999px',
  },
  gradients: {
    gold:        'linear-gradient(135deg, #B8860B 0%, #E6B800 50%, #B8860B 100%)',
    goldShimmer: 'linear-gradient(90deg, #8B6200 0%, #E6B800 30%, #FFF8DC 50%, #E6B800 70%, #8B6200 100%)',
    darkFade:    'linear-gradient(180deg, rgba(13,11,8,0) 0%, rgba(13,11,8,0.9) 100%)',
    glassLight:  'linear-gradient(135deg, rgba(253,250,244,0.85) 0%, rgba(245,240,228,0.70) 100%)',
    glassDark:   'linear-gradient(135deg, rgba(26,22,16,0.85) 0%, rgba(13,11,8,0.70) 100%)',
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
          position:      'relative',
          overflow:      'hidden',
          '&::after': {
            content:    '""',
            position:   'absolute',
            top:        0,
            left:       '-100%',
            width:      '60%',
            height:     '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transition: 'none',
          },
          '&:hover::after': {
            animation: 'btnShimmer 0.55s ease forwards',
          },
          '&:focus-visible': {
            outline:       `2px solid ${tokens.colors.primary.main}`,
            outlineOffset: 2,
          },
        },
        contained: {
          boxShadow: 'none',
          background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
          '&:hover': {
            boxShadow: tokens.shadows.gold,
            transform: 'translateY(-2px)',
            background: `linear-gradient(135deg, ${tokens.colors.primary.light} 0%, ${tokens.colors.primary.main} 100%)`,
          },
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
            transition: tokens.transitions.normal,
            '& fieldset':             { borderColor: tokens.colors.border.subtle, transition: tokens.transitions.normal },
            '&:hover fieldset':       { borderColor: tokens.colors.border.medium },
            '&.Mui-focused fieldset': {
              borderColor: tokens.colors.primary.main,
              boxShadow:   `0 0 0 3px ${tokens.colors.primary.glow}`,
            },
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: tokens.transitions.normal,
          '&:focus-visible': {
            outline:       `2px solid ${tokens.colors.primary.main}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.colors.dark.elevated,
          color:           tokens.colors.dark.textPrimary,
          border:          `1px solid ${tokens.colors.dark.borderSubtle}`,
          borderRadius:    tokens.radius.xs,
          fontSize:        '0.72rem',
          letterSpacing:   '0.04em',
        },
        arrow: {
          color: tokens.colors.dark.elevated,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius:    tokens.radius.pill,
          backgroundColor: tokens.colors.bg.card,
        },
        bar: {
          borderRadius:    tokens.radius.pill,
          background:      `linear-gradient(90deg, ${tokens.colors.primary.dark}, ${tokens.colors.primary.light})`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: tokens.colors.border.faint,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
        },
      },
    },
  },
});

export default theme;
