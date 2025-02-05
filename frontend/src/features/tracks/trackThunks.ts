import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  TrackMutation,
  TrackResponse,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";

export const getTrackThunks = createAsyncThunk<TrackResponse, string>(
  "tracks/getTrackThunks",
  async (id: string) => {
    const trackResponse = await axiosApi<TrackResponse>(`/tracks?album=${id}`);
    const tracks = trackResponse.data;
    return {
      results: tracks.results || [],
      album: tracks.album || {},
      artist: tracks.artist || {},
    };
  },
);

export const createTrackThunks = createAsyncThunk<
  void,
  TrackMutation,
  { rejectValue: ValidationError }
>("tracks/createTrackThunks", async (trackMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post<TrackResponse>(`/tracks`, trackMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const deleteTrackThunks = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("tracks/deleteTrackThunks", async (id: string, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`tracks/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const publishTrackThunks = createAsyncThunk<void, string>(
  "tracks/publishTrackThunks",
  async (id: string) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`);
  },
);
