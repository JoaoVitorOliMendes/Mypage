import * as React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#009900",
    height: "100vh",
    width: "100%",
  },
}));

export default function Articles() {
  const classes = useStyles();
  return <div className={classes.main}></div>;
}
