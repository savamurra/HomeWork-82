import { Artist, GlobalError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createArtistThunks,
  deleteArtistThunks,
  getArtistThunks,
} from "./artistThunks.ts";
import { RootState } from "../../app/store.ts";

interface ArtistSlice {
  artists: Artist[];
  isLoading: boolean;
  isCreate: boolean;
  error: GlobalError | null;
  isDelete: boolean;
}

const initialState: ArtistSlice = {
  artists: [],
  isLoading: false,
  isCreate: false,
  error: null,
  isDelete: false,
};

export const selectArtist = (state: RootState) => state.artists.artists;
export const selectLoading = (state: RootState) => state.artists.isLoading;
export const selectCreateLoading = (state: RootState) => state.artists.isCreate;
export const selectDelete = (state: RootState) => state.artists.isDelete;

export const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtistThunks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtistThunks.fulfilled, (state, { payload: artists }) => {
        state.isLoading = false;
        state.artists = artists;
      })
      .addCase(getArtistThunks.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createArtistThunks.pending, (state) => {
        state.isCreate = true;
      })
      .addCase(createArtistThunks.fulfilled, (state) => {
        state.isCreate = false;
      })
      .addCase(createArtistThunks.rejected, (state) => {
        state.isCreate = false;
      })
      .addCase(deleteArtistThunks.pending, (state) => {
        state.isDelete = true;
        state.error = null;
      })
      .addCase(deleteArtistThunks.fulfilled, (state) => {
        state.isDelete = false;
      })
      .addCase(deleteArtistThunks.rejected, (state, { payload: error }) => {
        state.isDelete = false;
        state.error = error || null;
      });
  },
});

export const artistsReducer = artistSlice.reducer;
