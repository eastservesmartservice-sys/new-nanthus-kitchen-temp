import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFCF40", // Premium Gold
      contrastText: "#000000",
    },
    secondary: {
      main: "#4FC3F7", // keeping the blue/cyan requested
      contrastText: "#000000",
    },
    background: {
      default: "#050505", // Deepest Black
      paper: "#121212", // Surface Black
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: '"Manrope", "Roboto", "sans-serif"',
    h1: {
      fontFamily: '"Tenor Sans", "sans-serif"',
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: '"Tenor Sans", "sans-serif"',
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: '"Tenor Sans", "sans-serif"',
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h4: {
      fontFamily: '"Tenor Sans", "sans-serif"',
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h5: {
      fontFamily: '"Tenor Sans", "sans-serif"',
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: '"Manrope", "sans-serif"',
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: '0.05em'
    },
    body1: {
      fontFamily: '"Manrope", "sans-serif"',
      fontSize: "1rem",
    },
    body2: {
      fontFamily: '"Manrope", "sans-serif"',
      fontSize: "0.875rem",
    },
    button: {
      fontFamily: '"Manrope", "sans-serif"',
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    overline: {
      fontFamily: '"Manrope", "sans-serif"',
      letterSpacing: "0.2em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sharper corners for tech feel
          padding: "10px 30px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
