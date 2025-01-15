import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtist, selectLoading} from "./artistSlice.ts";
import {useEffect} from "react";
import {getArtistThunks} from "./artistThunks.ts";
import {apiUrl} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(getArtistThunks());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <Box sx={{display: 'flex', gap: 5}}>
                    {artists.map((item) => {
                        const image = item.photo ? apiUrl + '/' + item.photo : 'https://mui.com/static/images/cards/contemplative-reptile.jpg';

                        return (
                            <Card sx={{maxWidth: 345}} key={item._id}>
                                <CardMedia
                                    component="img"
                                    alt={item.name || "Artist Image"}
                                    height="140"
                                    image={image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {item.info}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" to={`/album/${item._id}`} component={NavLink}>Learn
                                        More</Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </Box>)
            }
        </>
    );
};

export default Artists;