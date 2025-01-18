import {createSlice} from "@reduxjs/toolkit";
import {TrackHistoryFields} from "../../types";
import {listenMusic} from "./trackHistoryThunks.ts";

interface TrackHistoryState {
    trackHistory: TrackHistoryFields[];
    isLoading: boolean;
}

const initialState: TrackHistoryState = {
    trackHistory: [],
    isLoading: false,
}

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listenMusic.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(listenMusic.fulfilled,(state, {payload:  trackHistory}) => {
                state.trackHistory = trackHistory;
                state.isLoading = false
            })
            .addCase(listenMusic.rejected,(state) => {
                state.isLoading = false;
            });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;