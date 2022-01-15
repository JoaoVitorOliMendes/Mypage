import * as React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import IconButton from "@mui/material/IconButton";
import banners from "../../data/bannerImg.json";
import clsx from "clsx";
import "./Banner.css";
import { motion } from "framer-motion";

const useClasses = makeStyles((theme) => ({
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

const bannersJson = banners.banners;

function getRandomImg() {
  const index = Math.floor(Math.random() * 10);
  return bannersJson[index];
}

export default function Banner() {

  const classes = useClasses();

  React.useEffect(() => {
    const timer = setInterval(() => {
    }, 15000);

    return () => clearInterval(timer);
  });

  return (
    <>
      
      <span className={classes.credits}>
        <IconButton color="secondary">
          <FontAwesomeIcon icon={faRedditAlien} />
        </IconButton>
        {/* <span>{img.author}</span> */}
      </span>
    </>
  );
}
