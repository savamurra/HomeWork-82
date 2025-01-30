import React, {ChangeEvent, useEffect, useState} from 'react';
import { TrackMutation} from "../../../types";
import {useSelector} from "react-redux";
import {selectUser} from "../../users/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectArtist} from "../../artists/artistSlice.ts";
import {useNavigate} from "react-router-dom";
import {Button, MenuItem, Typography} from "@mui/material";
import {toast} from "react-toastify";
import {getAlbumsThunks} from "../../albums/albumThunks.ts";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import {getArtistThunks} from "../../artists/artistThunks.ts";
import {selectAlbum} from "../../albums/albumSlice.ts";
import {createTrackThunks} from "../trackThunks.ts";
import {selectCreateLoading, selectError} from "../trackSlice.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";

const initialState = {
    title: "",
    album: "",
    artist: "",
    duration: 0,
    youtubeLink: "",
    numberOfTracks: 0,
}

const TrackForm = () => {
    const [form, setForm] = useState<TrackMutation>(initialState);
    const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
    const user = useSelector(selectUser);
    const artist = useAppSelector(selectArtist);
    const album = useAppSelector(selectAlbum);
    const error = useAppSelector(selectError);
    const loading = useSelector(selectCreateLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getArtistThunks())
    }, [dispatch]);

    useEffect(() => {
        if (selectedArtist) {
            dispatch(getAlbumsThunks(selectedArtist))
            setForm((prevState) => ({ ...prevState, album: "" }));
        }
    }, [dispatch, selectedArtist]);



    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (user) {
            setForm((prevState) => ({...prevState, user: user._id, [name]: value}));
            if (name === "artist") {
                setSelectedArtist(value);
            }
        }
    };


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim() || !form.artist.trim() || !form.album.trim()) {
            return toast.error("Please enter title and releaseDate");
        } else {
            try {
                await dispatch(createTrackThunks(form)).unwrap();
                setForm(initialState);
                toast.success("Track created successfully.");
                navigate('/');
            } catch (error) {
                toast.error((error as { error: string }).error);
            }

        }
    }

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    }

    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    mt: 4,
                    textAlign: "center",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    color: "#041f4e",
                }}
            >
                Add new Track
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sx={{
                        maxWidth: 500,
                        margin: "0 auto",
                        mt: 4,
                        padding: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
                    }}
                >
                    <Grid>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            value={form.title}
                            onChange={inputChangeHandler}
                            required
                            fullWidth
                            sx={{
                                borderRadius: "8px",
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                },
                            }}
                            error={Boolean(getFieldError('username'))}
                            helperText={getFieldError('username')}
                        />
                    </Grid>
                    <TextField
                        sx={{width: "100%"}}
                        required
                        id="artist"
                        name="artist"
                        select
                        label="Artist"
                        value={form.artist}
                        onChange={inputChangeHandler}
                    >
                        {artist.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        sx={{width: "100%"}}
                        required
                        id="album"
                        name="album"
                        select
                        label="Album"
                        value={form.album}
                        onChange={inputChangeHandler}
                    >
                        {album.results?.length > 0 ? (
                            album.results.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.title}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled> No albums available </MenuItem>
                        )}
                    </TextField>
                    <Grid>
                        <TextField
                            id="numberOfTracks"
                            name="numberOfTracks"
                            label="Number of track"
                            type="number"
                            required
                            value={form.numberOfTracks}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            id="duration"
                            name="duration"
                            label="Duration"
                            type="number"
                            required
                            value={form.duration}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            id="youtubeLink"
                            name="youtubeLink"
                            label="Youtube"
                            value={form.youtubeLink}
                            onChange={inputChangeHandler}
                            required
                            fullWidth
                            sx={{
                                borderRadius: "8px",
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                },
                            }}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: "linear-gradient(#e66465, #9198e5);",
                                borderRadius: "20px",
                                textTransform: "uppercase",
                                padding: "12px",
                                "&:hover": {
                                    background: "linear-gradient(0.25turn, #e66465, #9198e5);)",
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                },
                            }}
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : "Create"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default TrackForm;