import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Divider } from "@mui/material";
import Banner from "./Banner";
import Articles from "../Articles/Articles";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";

const useClasses = makeStyles((theme) => ({
  imgContainer: {
    display: "flex",
    height: "105vh",
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
      <div name="projects">
        <Projects />
      </div>
      <div name="articles">
        <Articles />
      </div>
      <div name="aboutme">
        <AboutMe />
      </div>
    </>
  );
}
