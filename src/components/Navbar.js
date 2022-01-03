import * as React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link as ScLink, animateScroll as scroll } from "react-scroll";
import Link from "@mui/material/Link";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "stretch !important",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root}>
        <ScLink
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="link"
        >
          <Link href="#" underline="none" color="secondary">
            Home
          </Link>
        </ScLink>

        <ScLink
          to="articles"
          spy={true}
          smooth={true}
          duration={500}
          className="link"
        >
          <Link href="#" underline="none" color="secondary">
            Articles
          </Link>
        </ScLink>

        <ScLink
          to="aboutme"
          spy={true}
          smooth={true}
          duration={500}
          className="link"
        >
          <Link href="#" underline="none" color="secondary">
            About Me
          </Link>
        </ScLink>
      </Toolbar>
    </AppBar>
  );
}
