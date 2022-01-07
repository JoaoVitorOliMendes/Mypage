import { makeStyles } from "@mui/styles";
import { Typography, Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import FadeIn from "../Utils/FadeIn";
import { animateScroll as scroll } from "react-scroll";
import { useEffect } from "react";

const useClasses = makeStyles((theme) => ({
  main: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
  },
  img: {
    marginTop: "10%",
  },
}));

export default function ArticlePage(props) {
  const classes = useClasses();

  const location = useLocation();
  const post = location.state?.post;

  useEffect(() => {
    scroll.scrollToTop();
  });

  return (
    <FadeIn>
      <div className={classes.main}>
        <Container
          maxWidth="lg"
          sx={{
            padding: "7rem 0",
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            {post.title}
          </Typography>
          <Box
            sx={{
              padding: "5% 10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexFlow: "column",
            }}
          >
            {post.text.length > 1 ? (
              post.text.map((item, index) => {
                return (
                  <Typography variant="body2" key={index}>
                    {item}
                  </Typography>
                );
              })
            ) : (
              <Typography variant="body2">{post.text}</Typography>
            )}
            <img
              src={post.img}
              alt={post.img}
              width="75%"
              height="75%"
              className={classes.img}
            />
          </Box>
        </Container>
      </div>
    </FadeIn>
  );
}
