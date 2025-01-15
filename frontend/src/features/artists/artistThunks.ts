import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getArtistThunks = createAsyncThunk<Artist[], void>('artists/getArtistThunks',
    async () => {
    const artistResponse = await axiosApi<Artist[]>('/artists');
    return artistResponse.data;
})