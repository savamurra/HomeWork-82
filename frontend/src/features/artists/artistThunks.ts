import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation, GlobalError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

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

export const deleteArtistThunks = createAsyncThunk<void,string,{rejectValue: GlobalError}>(
    "artists/deleteArtistThunks",
    async (id: string, {rejectWithValue}) => {
        try {
            await axiosApi.delete(`artists/${id}`);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const publishArtistThunks = createAsyncThunk<void,string>(
    "artists/publishArtistThunks",
    async (id:string) => {
        await axiosApi.patch(`/artists/${id}/togglePublished`)
    }
)