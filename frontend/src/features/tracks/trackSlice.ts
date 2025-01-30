import {Album, Artist, GlobalError, Track, ValidationError} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createTrackThunks, deleteTrackThunks, getTrackThunks} from "./trackThunks.ts";


interface TrackSlice {
    tracks: {
        results: Track[];
        album: Album;
        artist: Artist;
    };
    isLoading: boolean;
    isCreate: boolean;
    error: ValidationError | null;
    deleteError: GlobalError | null;
    isDelete: boolean;
}

const initialState: TrackSlice = {
    tracks: {
        results: [],
        album: {} as Album,
        artist: {} as Artist,
    },
    isLoading: false,
    isCreate: false,
    error: null,
    deleteError: null,
    isDelete: false,
};

export const selectTrack = (state: RootState) => state.tracks.tracks;
export const selectLoading = (state: RootState) => state.tracks.isLoading;
export const selectCreateLoading = (state: RootState) => state.tracks.isCreate;
export const selectError = (state: RootState) => state.tracks.error;
export const selectDelete = (state: RootState) => state.tracks.isDelete;


export const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        removeTrack: (state, action: PayloadAction<string>) => {
            state.tracks.results = state.tracks.results.filter(album => album._id !== action.payload);
        },
        updateStatusByTrack: (state, action: PayloadAction<string>) => {
            state.tracks.results = state.tracks.results.map(album =>
                album._id === action.payload ? { ...album, isPublished: true } : album
            );
        },
    },
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
            })
            .addCase(createTrackThunks.pending,(state) => {
                state.isCreate = true;
                state.error = null
            })
            .addCase(createTrackThunks.fulfilled,(state) => {
                state.isCreate = false
            })
            .addCase(createTrackThunks.rejected,(state,{ payload: error }) => {
                state.isCreate = false;
                state.error = error || null
            })
            .addCase(deleteTrackThunks.pending,(state) => {
                state.isDelete = true;
                state.deleteError = null
            })
            .addCase(deleteTrackThunks.fulfilled,(state) => {
                state.isDelete = false;
            })
            .addCase(deleteTrackThunks.rejected,(state,{payload: error}) => {
                state.isDelete = false;
                state.deleteError = error || null
            });
    }
});

export const trackReducer= trackSlice.reducer;
export const {removeTrack, updateStatusByTrack} = trackSlice.actions;