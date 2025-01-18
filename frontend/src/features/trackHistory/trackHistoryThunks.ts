import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import {TrackHistoryFields, TrackHistoryWithoutDateTime} from "../../types";

export const listenMusic =  createAsyncThunk<TrackHistoryFields[], TrackHistoryWithoutDateTime, {state: RootState}>('trackHistory/listenMusic',
    async (trackHistory, {getState}, ) => {
        const token = getState().users.user?.token;
        const response = await axiosApi.post('/track_history', {track: trackHistory.track}, {headers: {'Authorization': token}});
        return response.data.trackHistory as TrackHistoryFields[];
    }
);