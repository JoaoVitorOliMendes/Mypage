import { Grid, Container, Paper, Box, Typography } from "@mui/material";
import FadeIn from "../Utils/FadeIn";

export default function AboutMe() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        padding: "5% 0",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <FadeIn leftToRight={1}>
              <Paper elevation={8} sx={{ padding: "10%" }}>
                <Typography
                  component="div"
                  variant="h3"
                  sx={{ textAlign: "center" }}
                >
                  AboutMe
                </Typography>
                <Typography variant="body2">
                  My name is João Vitor de Oliveira Mendes, i'm 18 y/o and i'm
                  from Belo Horizonte - Minas Gerais, Brazil. I'm a high school
                  graduate and I have a technical degree in IT, information
                  technology. Full-stack developer, avid for technology, and
                  prolific programmer in Angular and Java. Software enthusiast,
                  experience with Linux(Gentoo, Mint, Ubuntu), Windows, and
                  MacOs, adherent to open source principles. Idealist and
                  innovative person who loves to learn new things...
                </Typography>
                <Typography variant="body2">
                  This website was created to test my front-end development
                  skills as I practice my English and challenge my technical
                  writing. The content will be based on extracurricular
                  knowledge that I like studying such as Philosophy, Logosophy,
                  and Movie analysis.
                </Typography>
                <Typography variant="body2">
                  This website also may contain bugs, misspelling words, or
                  visual glitches, if you find any of those please contact me by
                  my socials. The website base code is available at my Github,
                  all help and suggestions are always welcome.
                </Typography>
              </Paper>
            </FadeIn>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FadeIn leftToRight={2}>
              <img
                src="https://joaovitorolimendes.github.io/Mypage/imgs/me.jpg"
                alt="me"
                width="100%"
                height="100%"
              />
            </FadeIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
