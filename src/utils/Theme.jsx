import { createTheme } from "@mui/material/styles";

const fontFamilySettings = {
  fontFamily: '"Inter", sans-serif',
  fontOpticalSizing: "auto",
  fontStyle: "normal",
};

export function createLightTheme() {
  return createTheme({
    palette: {
      mode: "light",
    },
    typography: {
      ...fontFamilySettings,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: "linear-gradient(180deg, #BBDCFD, #FFF)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100vw 25vh",
          },
        },
      },
    },
  });
}

export function createDarkTheme() {
  return createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      ...fontFamilySettings,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: "linear-gradient(#02294F, #090E1000)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100vw 25vh",
          },
        },
      },
    },
  });
}
