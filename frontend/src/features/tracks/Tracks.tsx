import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {selectLoading, selectTrack} from "./trackSlice";
import {getTrackThunks} from "./trackThunks";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {selectUser} from "../users/userSlice.ts";
import {listenMusic} from "../trackHistory/trackHistoryThunks.ts";


const Tracks = () => {
    const [createDisabled, setCreateDisabled] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const {results: tracks, album, artist} = useAppSelector(selectTrack);
    const loading = useAppSelector(selectLoading);
    const {id} = useParams<{ id: string }>();
    const user = useAppSelector(selectUser);


    useEffect(() => {
        if (id) {
            dispatch(getTrackThunks(id));
        }
    }, [dispatch, id]);


    const onClick = async (trackId: string) => {
        setCreateDisabled(trackId);
        await dispatch(listenMusic({track: trackId}))
        setCreateDisabled(null);
    };

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    {album && artist && (
                        <>
                            <Typography variant="h5" component="div" sx={{textAlign: "center", mb: 1}}>
                                Albums Name: {album.title}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{textAlign: "center", mb: 5}}>
                                Artists Name: {artist.name}
                            </Typography>
                        </>
                    )}

                    <Box sx={{display: "flex", gap: 5, justifyContent: "center"}}>
                        {Array.isArray(tracks) && tracks.length > 0 ? (
                            tracks.map((track) => (
                                <Card sx={{maxWidth: 345}} key={track._id}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {track.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: "text.secondary"}}>
                                            <strong>Duration:</strong> {track.duration}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: "text.secondary"}}>
                                            <strong>Number of Tracks:</strong> {track.numberOfTracks}
                                        </Typography>
                                    </CardContent>
                                    {user ? (
                                        <Button
                                            sx={{margin: 'auto', display: 'block'}}
                                            disabled={createDisabled === track._id}
                                            onClick={() => onClick(track._id)}
                                        >
                                            Play
                                        </Button>
                                    ) : null}
                                </Card>
                            ))
                        ) : (
                            <Typography>No tracks available.</Typography>
                        )}
                    </Box>
                </>
            )}
        </>
    );
};

export default Tracks;
