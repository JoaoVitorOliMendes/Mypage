import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import "./Articles.css";

export default function ArticlesCard(props) {
  const item = props.item;

  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);
  const navigate = useNavigate();

  const readMore = () => {
    navigate("/article", { state: { post: item } });
  };

  const loadingFinished = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <Card
      variant="outlined"
      sx={{ margin: "5%", backgroundColor: "secondary.main" }}
      className={`${pulsing ? "pulse" : ""} loadable`}
    >
      <CardActionArea
        sx={{
          "&:hover": {
            "& .title": {
              opacity: 1,
            },
          },
        }}
        onClick={readMore}
      >
        <Typography
          variant="h5"
          component="div"
          className="title"
          sx={{
            backgroundColor: "primary.main",
            color: "secondary.main",
            width: "100%",
            padding: "1%",
            textAlign: "center",
            display: "block",
            position: "absolute",
            transition: "opacity 500ms ease",
            opacity: "0",
            fontStyle: "italic",
          }}
        >
          {item.title}
        </Typography>
        <motion.img
          alt={item.title}
          initial={{ height: "16rem", opacity: 0 }}
          animate={{
            height: imageLoading ? "16rem" : "auto",
            opacity: imageLoading ? 0 : 1,
          }}
          transition={
            ({ height: { delay: 0, duration: 0.4 } },
            { opacity: { delay: 0.5, duration: 0.4 } })
          }
          onLoad={loadingFinished}
          width="100%"
          src={item.img}
        />
      </CardActionArea>
    </Card>
  );
}

/*<CardContent>
  <Typography gutterBottom variant="h5" component="div" color="">
    {item.title}
  </Typography>
</CardContent>*/
