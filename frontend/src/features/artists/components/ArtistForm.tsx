import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import {ArtistMutation} from "../../../types";
import {ChangeEvent, useState} from "react";
import { useSelector} from "react-redux";
import {selectUser} from "../../users/userSlice.ts";
import {selectCreateLoading} from "../artistSlice.ts";
import * as React from "react";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../../app/hooks.ts";
import {createArtistThunks} from "../artistThunks.ts";
import {useNavigate} from "react-router-dom";

const initialState = {
    name: '',
    photo: null as File | null,
    info: "",
    user: "",
}

const ArtistForm = () => {
    const [form, setForm] = useState<ArtistMutation>(initialState);
    const user = useSelector(selectUser);
    const loading = useSelector(selectCreateLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (user) {
            setForm((prevState) => ({...prevState, user: user._id, [name]: value}));
        }
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            return toast.error("Please enter your name");
        } else {
            await dispatch(createArtistThunks(form)).unwrap();
            setForm(initialState);
            toast.success("Artist created successfully.");
            navigate('/');
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
                Add new Album
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
                            id="name"
                            name="name"
                            label="Name"
                            value={form.name}
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
                        <TextField
                            id="info"
                            name="info"
                            label="Info"
                            value={form.info}
                            onChange={inputChangeHandler}
                            required
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <FileInput
                            name="photo"
                            label="Photo"
                            onGetFile={fileEventChangeHandler}
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

export default ArtistForm;