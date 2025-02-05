import { Button, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import { AlbumMutation } from "../../../types";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../users/userSlice.ts";
import * as React from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { selectArtist } from "../../artists/artistSlice.ts";
import { getArtistThunks } from "../../artists/artistThunks.ts";
import { selectCreateLoading } from "../albumSlice.ts";
import { createAlbumThunks } from "../albumThunks.ts";

const initialState = {
  title: "",
  artist: "",
  image: null as File | null,
  user: "",
  releaseDate: "",
};

const AlbumForm = () => {
  const [form, setForm] = useState<AlbumMutation>(initialState);
  const user = useSelector(selectUser);
  const artist = useAppSelector(selectArtist);
  const loading = useSelector(selectCreateLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtistThunks());
  }, [dispatch]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setForm((prevState) => ({ ...prevState, user: user._id, [name]: value }));
    }
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.releaseDate.trim()) {
      return toast.error("Please enter title and releaseDate");
    } else {
      await dispatch(createAlbumThunks(form)).unwrap();
      setForm(initialState);
      toast.success("Album created successfully.");
      navigate("/");
    }
  };

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
            />
          </Grid>
          <TextField
            sx={{ width: "100%" }}
            required
            id="artist"
            name="artist"
            select
            label="Artist"
            value={form.artist}
            onChange={inputChangeHandler}
          >
            {artist
              .filter(
                (option) =>
                  option.isPublished ||
                  option.user === user?._id ||
                  user?.role === "admin",
              )
              .map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <Grid size={{ xs: 12 }}>
            <TextField
              id="releaseDate"
              name="releaseDate"
              label="Release Date"
              type="string"
              required
              value={form.releaseDate}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid>
            <FileInput
              name="image"
              label="Image"
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

export default AlbumForm;
