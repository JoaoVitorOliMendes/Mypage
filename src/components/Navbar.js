import * as React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" className={classes.root}>
          <Link to="#home">
            <Button color="secondary">Home</Button>
          </Link>

          <Link to="#articles">
            <Button color="secondary">Articles</Button>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
