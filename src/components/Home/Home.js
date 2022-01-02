import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Banner from "./Banner";
import Articles from "./Articles";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    display: "flex",
    height: "100vh",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    objectFit: "contain",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.imgContainer} id="home">
        <Banner />
      </Box>
      <Articles id="articles" />
    </>
  );
}
