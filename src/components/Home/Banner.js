import * as React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import IconButton from "@mui/material/IconButton";
import banners from "../../data/bannerImg.json";
import "./Banner.css";
import { motion } from "framer-motion";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";

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

function Banner(props) {
  const { scrollPosition } = props
  const [img, setImg] = React.useState(getRandomImg());
  const [visible, setVisible] = React.useState(true);

  const classes = useClasses();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setVisible(true)
      setTimeout(() => {
        setImg(getRandomImg())
      },300)
    }, 15000);

    return () => clearInterval(timer);
  });
  
  return (
    <>
      <div
        className={visible ? "banner hide" : "banner show"}
      >
        <LazyLoadImage
          onLoad={() => {
            setVisible(false)
          }}
          scrollPosition={scrollPosition}
          src={process.env.PUBLIC_URL + img.img}
          placeholderSrc={process.env.PUBLIC_URL + img.img}
          alt={img.img}
          width="100%"
          height="100%"
        />
      </div>
      
      <span className={classes.credits}>
        <IconButton color="secondary">
          <FontAwesomeIcon icon={faRedditAlien} />
        </IconButton>
        <span>{img.author}</span>
      </span>
    </>
  );
}

export default trackWindowScroll(Banner)