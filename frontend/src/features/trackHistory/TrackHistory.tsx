import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectGetLoading, selectTrackHistory} from "./trackHistorySlice.ts";
import {useEffect} from "react";
import {getMusicHistory} from "./trackHistoryThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {apiUrl} from "../../globalConstants.ts";
import {selectUser} from "../users/userSlice.ts";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";


const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectGetLoading);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login')
    }
    console.log(history)

    useEffect(() => {
        dispatch(getMusicHistory())
    }, [dispatch]);
    return (
        <>
            {user ? (
                loading ? (
                    <Spinner/>
                ) : (
                    <Box sx={{display: 'flex', gap: 5, flexWrap: 'wrap'}}>
                        {history.length > 0 ? history.map((item) => {
                            const image = item.artist.photo
                                ? apiUrl + '/' + item.artist.photo
                                : 'https://mui.com/static/images/cards/contemplative-reptile.jpg';

                            return (
                                <Card sx={{maxWidth: 345}} key={crypto.randomUUID()}>
                                    <CardMedia
                                        component="img"
                                        alt={item.artist.name || "Artist Image"}
                                        width="100%"
                                        height="250px"
                                        image={image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.artist.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Title: {item.track.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Date of listening: {dayjs(item.datetime).format('MMM-DD HH:mm:ss')}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        }) : (
                            <Typography variant="h6" sx={{width: '100%', textAlign: 'center'}}>
                                No listening history available.
                            </Typography>
                        )}
                    </Box>
                )
            ) : null}

        </>
    );
};

export default TrackHistory;