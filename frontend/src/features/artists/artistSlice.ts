import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {getArtistThunks} from "./artistThunks.ts";
import {RootState} from "../../app/store.ts";

interface ArtistSlice {
    artists: Artist[];
    error: boolean;
    isLoading: boolean;
}

const initialState: ArtistSlice = {
    artists: [],
    isLoading: false,
    error: false,
};

export const selectArtist = (state: RootState) => state.artists.artists;
export const selectError = (state: RootState) => state.artists.error;
export const selectLoading = (state: RootState) => state.artists.isLoading;

export const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArtistThunks.pending,(state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getArtistThunks.fulfilled,(state, {payload:  artists}) => {
                state.isLoading = true;
                state.artists = artists
                state.error = false;
            })
            .addCase(getArtistThunks.rejected,(state) => {
                state.isLoading = true;
                state.error = false;
            });
    }
});

export const artistsReducer= artistSlice.reducer;