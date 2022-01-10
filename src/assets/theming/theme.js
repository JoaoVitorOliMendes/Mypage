import { createTheme, responsiveFontSizes } from "@mui/material";

var theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#111111",
    },
    secondary: {
      main: "#ff751a",
    },
    background: {
      default: "#d6d3d5",
      paper: "#f3f1f2"
    },
    warning: {
      main: "#ffff00",
    },
  },
  typography: {
    fontFamily: ["Times New Roman"],
    body2: {
      textIndent: "50px",
      fontSize: 20,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
