import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumResponse} from "../../types";
import axiosApi from "../../axiosApi.ts";

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
