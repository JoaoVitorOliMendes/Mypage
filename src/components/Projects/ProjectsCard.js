import * as React from "react"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import "./Projects.css"
import lazy from 'react-lazy-named';

export default function ProjectsCard(props) {
    const { project } = props;

    const Icon = lazy(() => import(`../../assets/proxy/react-icons-proxy`), project.img.name)

    const openLink = (link) => {
        window.open(link)
    }

    return(
        <React.Suspense fallback={null}>
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
                    <Box 
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexFlow: "column wrap",
                            justifyContent: "space-between"
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Typography gutterBottom variant="h3" component="div">
                                    { project.name }
                                </Typography>
                                <Icon size="2rem"></Icon>
                            </Box>
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
        </React.Suspense>
    )
}