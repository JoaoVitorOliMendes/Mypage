import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Divider } from "@mui/material";
import Banner from "./Banner";
import Articles from "../Articles/Articles";
import AboutMe from "../AboutMe/AboutMe";

const useClasses = makeStyles((theme) => ({
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
  const classes = useClasses();

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
