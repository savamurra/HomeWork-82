import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrackResponse} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getTrackThunks = createAsyncThunk<TrackResponse, string>('tracks/getTrackThunks',
    async (id: string) => {
        const trackResponse = await axiosApi<TrackResponse>(`/tracks?album=${id}`);
        const tracks = trackResponse.data;
        return {
            results: tracks.results || [],
            album: tracks.album || {},
            artist: tracks.artist || {},
        };
    }
);
