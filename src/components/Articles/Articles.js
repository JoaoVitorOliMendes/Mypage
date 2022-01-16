import { makeStyles } from "@mui/styles";
import * as React from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ArticlesCard from "./ArticlesCard";
import articles from "../../data/articles.json";

const useClasses = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    maxWidth: "100%",
    padding: "5% 15%",
  },
  mainInner: {
    minWidth: "100%",
    height: "100%"
  },
  chip: {
    margin: "0 1% !important",
    fontWeight: "bold",
    opacity: 0.75,
    transition: "500ms ease-in-out !important",
    "&:hover": {
      opacity: 1,
    },
  },
}));

export default function Articles() {
  const data = articles.articles;

  const [subjectArray, setSubjectArray] = React.useState([
    "Philosophy",
    "Logosophy",
  ]);

  const [dataArray, setDataArray] = React.useState(data);

  React.useEffect(() => {
    setDataArray(
      data.filter((item) => {
        return subjectArray.includes(item.subject);
      })
    );
  }, [subjectArray]);

  const classes = useClasses();

  return (
    <div className={classes.main}>
      <div className={classes.mainInner}>
        <Typography variant="h2" mb="5%" sx={{ fontStyle: "italic" }}>
          Articles
        </Typography>
        <Box>
          <Chip
            color={subjectArray.length > 1 ? "secondary" : "primary"}
            label="All"
            component="button"
            onClick={() => {
              setSubjectArray(["Philosophy", "Logosophy"]);
            }}
            className={classes.chip}
            clickable
          />
          <Chip
            color={subjectArray == "Philosophy" ? "secondary" : "primary"}
            label="Philosophy"
            component="button"
            onClick={() => {
              setSubjectArray(["Philosophy"]);
            }}
            className={classes.chip}
            clickable
          />
          <Chip
            color={subjectArray == "Logosophy" ? "secondary" : "primary"}
            label="Logosophy"
            component="button"
            onClick={() => {
              setSubjectArray(["Logosophy"]);
            }}
            className={classes.chip}
            clickable
          />
        </Box>
        <XMasonry>
          {dataArray.map((item, i) => {
            return (
              <XBlock key={i}>
                <ArticlesCard item={item}></ArticlesCard>
              </XBlock>
            );
          })}
        </XMasonry>
      </div>
    </div>
  );
}
