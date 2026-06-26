const tokens = {
  palette: {
    light: {
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
        surface: '#e8e8e8',
      },
      primary: {
        main: '#0d2240',
        light: '#1a3a6b',
        dark: '#091a33',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#1565c0',
        light: '#42a5f5',
        dark: '#0d47a1',
        contrastText: '#ffffff',
      },
      text: {
        primary: '#1a1a1a',
        secondary: '#555555',
        disabled: '#999999',
      },
      divider: '#e0e0e0',
      error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
      },
      warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
      },
      info: {
        main: '#1565c0',
        light: '#42a5f5',
        dark: '#0d47a1',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
    dark: {
      background: {
        default: '#0d1117',
        paper: '#161b22',
        surface: '#21262d',
      },
      primary: {
        main: '#58a6ff',
        light: '#79c0ff',
        dark: '#1f6feb',
        contrastText: '#0d1117',
      },
      secondary: {
        main: '#79c0ff',
        light: '#a5d6ff',
        dark: '#58a6ff',
        contrastText: '#0d1117',
      },
      text: {
        primary: '#e6edf3',
        secondary: '#8b949e',
        disabled: '#484f58',
      },
      divider: '#30363d',
      error: {
        main: '#f85149',
        light: '#ff7b72',
        dark: '#da3633',
      },
      warning: {
        main: '#d29922',
        light: '#e3b341',
        dark: '#9e6a03',
      },
      info: {
        main: '#58a6ff',
        light: '#79c0ff',
        dark: '#1f6feb',
      },
      success: {
        main: '#3fb950',
        light: '#56d364',
        dark: '#238636',
      },
      grey: {
        50: '#161b22',
        100: '#21262d',
        200: '#30363d',
        300: '#484f58',
        400: '#6e7681',
        500: '#8b949e',
        600: '#b1bac4',
        700: '#c9d1d9',
        800: '#e6edf3',
        900: '#ffffff',
      },
    },
  },
  typography: {
    fontFamily: "var(--font-body), sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  },
  spacing: 8,
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export default tokens;
