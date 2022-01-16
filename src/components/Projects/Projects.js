import { makeStyles } from "@mui/styles";
import * as React from "react";
import Slider from "react-slick";
import { Grid, Container, Paper, Box, Typography } from "@mui/material";
import projects from "../../data/projects.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectsCard from "./ProjectsCard";
import "./Projects.css"

const useClasses = makeStyles((theme) => ({
    main: {
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        maxWidth: "100%",
        padding: "5%",
    },
    mainInner: {
        minWidth: "100%",
        height: "100%"
    },
    slider: {
        width: "100%",
        height: "100%"
    },
    dots: {
        color: theme.palette.secondary.main,
    }
}));

export default function Projects() {
  const classes = useClasses();
  const data = projects.projects

  var settings = {
    className: classes.slider,
    dots: true,
    infinite: true,
    speed: "500",
    slidesToShow: 2,
    slidesToScroll: 1,
    centerPadding: "100px",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  }

  return(
    <div className={classes.main}>
        <Box className={classes.mainInner}>
            <Typography variant="h2" mb="5%" ml="10%" sx={{ fontStyle: "italic" }}>
                Projects
            </Typography>
            <Slider
                {...settings}
            >
                {
                    data.map((item, index) => {
                        return (
                            <ProjectsCard project={item} key={index} />
                        )
                    })
                }
            </Slider>
        </Box>
    </div>
  );
}
