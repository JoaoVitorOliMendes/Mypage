import * as React from "react";
import { faGithub, faLinkedin, faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { SiLetterboxd, SiTutanota } from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Container, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import quotesJson from "../../data/quotes.json"

function getRandomQuote() {
  const index = Math.floor(Math.random() * 7);
  return quotesJson.quotes[index];
}

export default function Footer() {
  const [phrase, setPhrase] = React.useState(getRandomQuote());

  const openWebsite = (link) => {
    window.open(link);
  };

  const mailToMe = () => {
    window.open("mailto:joaovitordeoliveiramendes@tutanota.com");
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPhrase(getRandomQuote())
    }, 5000);
    return () => clearInterval(timer);
  });

  return (
      <AppBar position="static" color="primary">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Toolbar>
              <List sx={{ width: '100%' }}>
                <ListItem disablePadding>
                <ListItemButton onClick={openWebsite.bind(this,"https://www.linkedin.com/in/jo%C3%A3o-vitor-de-oliveira-mendes-6874b11b3/")}>
                    <ListItemIcon>
                      <FontAwesomeIcon color="#ff751a" icon={faLinkedin} />
                    </ListItemIcon>
                    <ListItemText primary="Linkedin" secondary="João Vitor de Oliveira Mendes" secondaryTypographyProps={{variant: "body1", color: "background.default"}} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={openWebsite.bind(this,"https://github.com/JoaoVitorOliMendes")}>
                    <ListItemIcon>
                      <FontAwesomeIcon color="#ff751a" icon={faGithub} />
                    </ListItemIcon>
                    <ListItemText primary="GitHub" secondary="JoaoVitorOliMendes" secondaryTypographyProps={{variant: "body1", color: "background.default"}} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={openWebsite.bind(this,"https://letterboxd.com/OJoaozao/")}>
                    <ListItemIcon>
                      <SiLetterboxd color="#ff751a" />
                    </ListItemIcon>
                    <ListItemText primary="Letterboxd" secondary="OJoaozao" secondaryTypographyProps={{variant: "body1", color: "background.default"}} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={mailToMe}>
                    <ListItemIcon>
                      <SiTutanota color="#ff751a" />
                    </ListItemIcon>
                    <ListItemText primary="Tutanota" secondary="joaovitordeoliveiramendes@tutanota.com" secondaryTypographyProps={{variant: "body1", color: "background.default"}} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Toolbar>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Paper sx={{ height: "80%", width: "80%", }} elevation={12}>
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%"}}>
                <Typography variant="h5">
                  {phrase.quote}
                </Typography>
              </Box>
            </Paper>
          </Grid> */}
        </Grid>
      </AppBar>
  )
}