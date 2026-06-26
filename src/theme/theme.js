import { extendTheme } from "@mui/material/styles";
import tokens from "./tokens";

const theme = extendTheme({
  cssVarPrefix: "ps",
  colorSchemeSelector: "class",
  colorSchemes: {
    light: {
      palette: {
        ...tokens.palette.light,
      },
    },
    dark: {
      palette: {
        ...tokens.palette.dark,
      },
    },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--ps-palette-background-default)',
          color: 'var(--ps-palette-text-primary)',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
