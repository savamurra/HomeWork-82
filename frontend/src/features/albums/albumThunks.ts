import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumMutation, AlbumResponse, GlobalError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const getAlbumsThunks = createAsyncThunk<AlbumResponse, string>('albums/getAlbumsThunks',
    async (id: string) => {
        const albumResponse = await axiosApi<AlbumResponse>(`/albums?artist=${id}`);
        const albums = albumResponse.data;
        return {
            results: albums.results || [],
            artist: albums.artist || {},
        };
    }
);



export const createAlbumThunks = createAsyncThunk<void, AlbumMutation>(
    "albums/createAlbumThunks",
    async (albumMutation) => {
        const formData = new FormData();

        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

        keys.forEach((key) => {
            const value = albumMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post("/albums", formData);
    },
);

export const deleteAlbumThunks = createAsyncThunk<void,string,{rejectValue: GlobalError}>(
    "albums/deleteAlbumThunks",
    async (id: string, {rejectWithValue}) => {
        try {
            await axiosApi.delete(`albums/${id}`);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const publishAlbumThunks = createAsyncThunk<void,string>(
    "albums/publishAlbumThunks",
    async (id:string) => {
        await axiosApi.patch(`/albums/${id}/togglePublished`)
    }
)