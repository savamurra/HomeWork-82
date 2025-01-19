import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {selectLoading, selectTrack} from "./trackSlice";
import {getTrackThunks} from "./trackThunks";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {selectUser} from "../users/userSlice.ts";
import {listenMusic} from "../trackHistory/trackHistoryThunks.ts";
import {Modal} from "@mui/material";


const Tracks = () => {
    const [createDisabled, setCreateDisabled] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [youtube, setYouTube] = useState<string | null>(null);
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
        const track = tracks.find((t) => t._id === trackId);

        if (!track) return;
        setCreateDisabled(trackId);
        if (track.youtubeLink) {
            setYouTube(track.youtubeLink);
            setOpenModal(true);
        } else {
            alert("No YouTube link available for this track.");
        }
        await dispatch(listenMusic({track: trackId}));

        setCreateDisabled(null);
    };

    const closeModal = () => {
        setOpenModal(false);
        setYouTube(null);
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
                    <Modal
                        open={openModal}
                        onClose={closeModal}
                        aria-labelledby="youtube-modal-title"
                        aria-describedby="youtube-modal-description"
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 2,
                                maxWidth: 800,
                                width: '90%',
                                outline: 'none',
                            }}
                        >
                            <Typography id="youtube-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                                YouTube Player
                            </Typography>
                            {youtube && (
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={youtube.replace("watch?v=", "embed/")}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                            <Button onClick={closeModal} sx={{mt: 2}}>
                                Close
                            </Button>
                        </Box>
                    </Modal>
                </>
            )}
        </>
    );
};

export default Tracks;
