import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ArticlesCard(props) {
  const item = props.item;

  return (
    <Card
      variant="outlined"
      sx={{ margin: "5%", backgroundColor: "secondary.main" }}
    >
      <CardActionArea
        sx={{
          "&:hover": {
            "& .title": {
              opacity: 1,
            },
          },
        }}
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
        <CardMedia component="img" image={item.img} alt={item.title} />
      </CardActionArea>
    </Card>
  );
}

/*<CardContent>
  <Typography gutterBottom variant="h5" component="div" color="">
    {item.title}
  </Typography>
</CardContent>*/
