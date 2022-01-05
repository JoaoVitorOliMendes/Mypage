import * as React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import IconButton from "@mui/material/IconButton";
import banners from "../../data/bannerImg.json";
import clsx from "clsx";
import "./Banner.css";

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
  const index = Math.floor(Math.random() * 4);
  return bannersJson[index];
}

export default function Banner() {
  const [img, setImg] = React.useState(getRandomImg());
  const [render, setRender] = React.useState(true);

  const classes = useClasses();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setRender(false);

      setTimeout(() => {
        const img = getRandomImg();
        setImg({
          img: img.img,
          id: img.id,
        });

        setRender(true);
        setImg({
          img: img.img,
          id: img.id,
          author: img.author,
        });
      }, 500);
    }, 19500);

    return () => clearInterval(timer);
  });

  return (
    <>
      <img
        src={img.img}
        className={
          render ? "banner bannerAnimationIn" : "banner bannerAnimationOut"
        }
        alt={img.img}
      />
      <span className={classes.credits}>
        <IconButton color="secondary">
          <FontAwesomeIcon icon={faRedditAlien} />
        </IconButton>
        <span>{img.author}</span>
      </span>
    </>
  );
}
