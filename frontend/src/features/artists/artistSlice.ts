import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createArtistThunks, getArtistThunks} from "./artistThunks.ts";
import {RootState} from "../../app/store.ts";

interface ArtistSlice {
    artists: Artist[];
    isLoading: boolean;
    isCreate: boolean;
}

const initialState: ArtistSlice = {
    artists: [],
    isLoading: false,
    isCreate: false,
};

export const selectArtist = (state: RootState) => state.artists.artists;
export const selectLoading = (state: RootState) => state.artists.isLoading;
export const selectCreateLoading = (state: RootState) => state.artists.isCreate;
export const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArtistThunks.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getArtistThunks.fulfilled,(state, {payload:  artists}) => {
                state.isLoading = false;
                state.artists = artists
            })
            .addCase(getArtistThunks.rejected,(state) => {
                state.isLoading = false;
            })
            .addCase(createArtistThunks.pending,(state) => {
                state.isCreate = true;
            })
            .addCase(createArtistThunks.fulfilled,(state) => {
                state.isCreate = false;
            })
            .addCase(createArtistThunks.rejected,(state) => {
                state.isCreate = false;
            });
    }
});

export const artistsReducer= artistSlice.reducer;