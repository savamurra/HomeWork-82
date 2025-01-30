import {Album, Artist, GlobalError} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createAlbumThunks, deleteAlbumThunks, getAlbumsThunks} from "./albumThunks.ts";

interface AlbumSlice {
    albums: {
        results: Album[];
        artist: Artist;
    };
    isLoading: boolean;
    isCreate: boolean;
    error: GlobalError | null;
    isDelete: boolean;
}

const initialState: AlbumSlice = {
    albums: {
        results: [],
        artist: {} as Artist,
    },
    isLoading: false,
    isCreate: false,
    error: null,
    isDelete: false,
};

export const selectAlbum = (state: RootState) => state.albums.albums;
export const selectLoading = (state: RootState) => state.albums.isLoading;
export const selectCreateLoading = (state: RootState) => state.albums.isCreate;
export const selectDelete = (state: RootState) => state.albums.isDelete;

export const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        removeAlbum: (state, action: PayloadAction<string>) => {
            state.albums.results = state.albums.results.filter(album => album._id !== action.payload);
        },
        updateStatus: (state, action: PayloadAction<string>) => {
            state.albums.results = state.albums.results.map(album =>
                album._id === action.payload ? { ...album, isPublished: true } : album
            );
        },
    },
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
            })
            .addCase(createAlbumThunks.pending,(state) => {
                state.isCreate = true;
            })
            .addCase(createAlbumThunks.fulfilled,(state) => {
                state.isCreate = false;
            })
            .addCase(createAlbumThunks.rejected,(state) => {
                state.isCreate = false;
            })
            .addCase(deleteAlbumThunks.pending,(state) => {
                state.isDelete = true;
                state.error = null
            })
            .addCase(deleteAlbumThunks.fulfilled,(state) => {
                state.isDelete = false;
            })
            .addCase(deleteAlbumThunks.rejected,(state,{payload: error}) => {
                state.isDelete = false;
                state.error = error || null
            });
    }
});

export const albumReducer= albumSlice.reducer;
export const {removeAlbum, updateStatus} = albumSlice.actions;