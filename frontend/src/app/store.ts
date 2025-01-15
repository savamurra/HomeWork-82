import { configureStore } from "@reduxjs/toolkit";
import { artistsReducer} from "../features/artists/artistSlice.ts";
import {albumReducer} from "../features/albums/albumSlice.ts";
import {trackReducer} from "../features/tracks/trackSlice.ts";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums:  albumReducer,
    tracks: trackReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
