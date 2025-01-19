import {createSlice} from "@reduxjs/toolkit";
import {TrackHistoryFields} from "../../types";
import {getMusicHistory, listenMusic} from "./trackHistoryThunks.ts";
import {RootState} from "../../app/store.ts";

interface TrackHistoryState {
    trackHistory: TrackHistoryFields[];
    createLoading: boolean;
    getLoading: boolean;
}

const initialState: TrackHistoryState = {
    trackHistory: [],
    createLoading: false,
    getLoading: false,
}

export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const selectGetLoading = (state: RootState) => state.trackHistory.getLoading;
export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listenMusic.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(listenMusic.fulfilled, (state) => {
                state.createLoading = false
            })
            .addCase(listenMusic.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(getMusicHistory.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getMusicHistory.fulfilled, (state, {payload: trackHistory}) => {
                state.getLoading = false
                state.trackHistory = trackHistory
            })
            .addCase(getMusicHistory.rejected, (state) => {
                state.getLoading = false;
            });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;