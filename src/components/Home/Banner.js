import * as React from "react";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "-1",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
  },
  credits: {
    position: "absolute",
    bottom: "2.5%",
    left: "2.5%",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "#000",
  },
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <>
      <img src="https://i.redd.it/7c3y016opu0z.jpg" className={classes.image} />
      <span className={classes.credits}>
        <IconButton color="secondary">
          <FontAwesomeIcon icon={faRedditAlien} />
        </IconButton>
        <span>r/paintings</span>
      </span>
    </>
  );
}
