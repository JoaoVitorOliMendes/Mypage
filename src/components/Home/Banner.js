import * as React from "react";
import { createStyles, withStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import IconButton from "@mui/material/IconButton";
import banners from "../../data/bannerImg.json";
import clsx from "clsx";
import "./Banner.css";

const classes = (theme) =>
  createStyles({
    credits: {
      position: "absolute",
      bottom: "2.5%",
      left: "2.5%",
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
      color: "#000",
    },
  });

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      img: "",
      id: 0,
    };
  }

  bannersJson = banners.banners;

  clock() {
    const index = Math.floor(Math.random() * 4);

    const img = this.bannersJson[index];

    this.setState({
      author: img.author,
      img: img.img,
      id: img.id,
    });
  }

  componentDidMount() {
    this.clock();
    this.intervalId = setInterval(this.clock.bind(this), 5000);
  }

  render() {
    const { classes } = this.props;
    const { img } = this.state;
    const { author } = this.state;

    return (
      <>
        <img src={img} className="banner" alt={img} />
        <span className={classes.credits}>
          <IconButton color="secondary">
            <FontAwesomeIcon icon={faRedditAlien} />
          </IconButton>
          <span>{author}</span>
        </span>
      </>
    );
  }
}

export default withStyles(classes)(Banner);
