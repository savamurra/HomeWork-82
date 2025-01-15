import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {apiUrl} from "../../globalConstants.ts";
import {getAlbumsThunks} from "./albumThunks.ts";
import {selectAlbum} from "./albumSlice.ts";
import {NavLink, useParams} from "react-router-dom";
import {selectLoading} from "./albumSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Artists = () => {
    const dispatch = useAppDispatch();
    const {results: albums, artist} = useAppSelector(selectAlbum);
    const loading = useAppSelector(selectLoading);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(getAlbumsThunks(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {artist && (
                        <Typography variant="h5" component="div" sx={{ textAlign: "center", mb: 5 }}>
                            Artist Name: {artist.name}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                        {Array.isArray(albums) && albums.length > 0 ? (
                            albums.map((item) => {
                                const image = item.image ? apiUrl + '/' + item.image : 'https://mui.com/static/images/cards/contemplative-reptile.jpg';

                                return (
                                    <Card sx={{ maxWidth: 345 }} key={item._id}>
                                        <CardMedia
                                            component="img"
                                            alt={item.title || "Artist Image"}
                                            height="140"
                                            image={image}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                Release: {item.releaseDate}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                Count of tracks: {item.trackCount}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" to={`/tracks/${item._id}`} component={NavLink}>Learn More</Button>
                                        </CardActions>
                                    </Card>
                                );
                            })
                        ) : (
                            <Typography>No albums available.</Typography>
                        )}
                    </Box>
                </>
            )}
        </>
    );
};

export default Artists;