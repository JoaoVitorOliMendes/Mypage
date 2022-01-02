import { createTheme } from "@mui/material";

const theme = createTheme({
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
    },
    warning: {
      main: "#ffff00",
    },
  },
});

export default theme;
