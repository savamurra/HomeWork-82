import {Album, Artist, Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {getTrackThunks} from "./trackThunks.ts";

interface TrackSlice {
    tracks: {
        results: Track[];
        album: Album;
        artist: Artist;
    };
    isLoading: boolean;
}

const initialState: TrackSlice = {
    tracks: {
        results: [],
        album: {} as Album,
        artist: {} as Artist,
    },
    isLoading: false,
};

export const selectTrack = (state: RootState) => state.tracks.tracks;
export const selectLoading = (state: RootState) => state.tracks.isLoading;

export const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTrackThunks.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getTrackThunks.fulfilled,(state, {payload:  tracks}) => {
                state.tracks = tracks;
                state.isLoading = false
            })
            .addCase(getTrackThunks.rejected,(state) => {
                state.isLoading = false;
            });
    }
});

export const trackReducer= trackSlice.reducer;