import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565C0", // Brand Blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF8F00", // Brand Orange
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF", // White BG
      paper: "#F5F5F5",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    success: {
      main: "#388E3C",
    },
    warning: {
      main: "#F9A825",
    },
    info: {
      main: "#0D47A1", // Dark Blue for footer/accents
    },
  },
  typography: {
    fontFamily: '"Poppins", "sans-serif"',
    h1: {
      fontWeight: 800,
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontWeight: 800,
      textTransform: "uppercase",
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h3: {
      fontWeight: 800,
      textTransform: "uppercase",
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h4: {
      fontWeight: 800,
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    h6: {
      fontWeight: 700,
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "0.95rem",
      },
    },
    body1: {
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
    body2: {
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },
    button: {
      fontWeight: 800,
      textTransform: "uppercase",
    },
    subtitle1: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "8px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#0D47A1", // Darker Blue
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1565C0",
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      },
    },
  },
});

export default theme;
