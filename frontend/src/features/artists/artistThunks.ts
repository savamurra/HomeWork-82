import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getArtistThunks = createAsyncThunk<Artist[], void>('artists/getArtistThunks',
    async () => {
        const artistResponse = await axiosApi<Artist[]>('/artists');
        return artistResponse.data;
    }
);

export const createArtistThunks = createAsyncThunk<void, ArtistMutation>(
    "artists/createArtistThunks",
    async (artistMutation) => {
        const formData = new FormData();

        const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

        keys.forEach((key) => {
            const value = artistMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post("/artists", formData);
    },
);