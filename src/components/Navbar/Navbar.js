import * as React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as ScLink, animateScroll as scroll } from "react-scroll";
import { useLocation, Link } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "stretch !important",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position="fixed">
      {location.pathname == "/article" ? (
        <Toolbar className={classes.root}>
          <Link to="/" className="link">
            <Typography color="secondary">Home</Typography>
          </Link>
        </Toolbar>
      ) : (
        <Toolbar className={classes.root}>
          <ScLink
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="link"
          >
            <Typography color="secondary">Home</Typography>
          </ScLink>

          <ScLink
            to="projects"
            spy={true}
            smooth={true}
            duration={500}
            className="link"
          >
            <Typography color="secondary">Projects</Typography>
          </ScLink>

          <ScLink
            to="articles"
            spy={true}
            smooth={true}
            duration={500}
            className="link"
          >
            <Typography color="secondary">Articles</Typography>
          </ScLink>

          <ScLink
            to="aboutme"
            spy={true}
            smooth={true}
            duration={500}
            className="link"
          >
            <Typography color="secondary">About Me</Typography>
          </ScLink>
        </Toolbar>
      )}
    </AppBar>
  );
}
