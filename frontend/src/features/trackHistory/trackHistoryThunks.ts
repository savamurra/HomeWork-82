import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { TrackHistoryFields } from "../../types";

export const listenMusic = createAsyncThunk<
  void,
  { track: string },
  { state: RootState }
>("trackHistory/listenMusic", async (trackHistory, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.post("/track_history", trackHistory, {
    headers: { Authorization: token },
  });
});

export const getMusicHistory = createAsyncThunk<
  TrackHistoryFields[],
  void,
  { state: RootState }
>("trackHistory/getMusicHistory", async (_, { getState }) => {
  const token = getState().users.user?.token;
  const response = await axiosApi<TrackHistoryFields[]>("/track_history", {
    headers: { Authorization: token },
  });
  return response.data;
});
