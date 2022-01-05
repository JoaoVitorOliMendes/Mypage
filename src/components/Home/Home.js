import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Banner from "./Banner";
import Articles from "../Articles/Articles";
import AboutMe from "./AboutMe";

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
      <Box className={classes.imgContainer} name="home">
        <Banner />
      </Box>
      <div name="articles">
        <Articles />
      </div>
      <div name="aboutme">
        <AboutMe />
      </div>
    </>
  );
}
