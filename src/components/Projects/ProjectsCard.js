import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import "./Projects.css"

export default function ProjectsCard(props) {
    const { project } = props;

    const openLink = (link) => {
        window.open(link)
    }

    return(
        <div className="cardMain">
            <Card sx={{ 
                    maxWidth: 600,
                    minHeight: "100%",
                    backgroundColor: "primary.main",
                    border: "solid 5px black",
                    color: "white",
                    display: "flex",
                    alignItems: "stretch",
                    borderRadius: "10px"
                }}>
                <CardMedia
                    component="img"
                    alt={ project.img }
                    image={ process.env.PUBLIC_URL + project.img  }
                    sx={{
                        backgroundColor: "#eee",
                        width: "275px",
                        height: "100%",
                        borderRadius: "10px",
                        alignSelf: "center"
                    }}
                />
                <Box 
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "column wrap",
                        justifyContent: "space-between"
                    }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            { project.name }
                        </Typography>
                        <Typography variant="body2">
                            { project.description }
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end"
                        }}
                    >
                        { project.link.map((item, index) => {
                            return (
                                <Button size="small" variant="contained" color="secondary" onClick={openLink.bind(this,item.link)} key={index}>{ item.name }</Button>
                            )
                        }) }
                    </CardActions>
                </Box>
            </Card>
        </div>
    )
}