import {Album, Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {getAlbumsThunks} from "./albumThunks.ts";

interface AlbumSlice {
    albums: {
        results: Album[];
        artist: Artist;
    };
    isLoading: boolean;
}

const initialState: AlbumSlice = {
    albums: {
        results: [],
        artist: {} as Artist,
    },
    isLoading: false,
};

export const selectAlbum = (state: RootState) => state.albums.albums;
export const selectLoading = (state: RootState) => state.albums.isLoading;

export const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAlbumsThunks.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getAlbumsThunks.fulfilled,(state, {payload:  albums}) => {
                state.isLoading = false;
                state.albums = albums;
            })
            .addCase(getAlbumsThunks.rejected,(state) => {
                state.isLoading = false;
            });
    }
});

export const albumReducer= albumSlice.reducer;