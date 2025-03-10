import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../features/artists/artistSlice.ts";
import { albumReducer } from "../features/albums/albumSlice.ts";
import { trackReducer } from "../features/tracks/trackSlice.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import { usersReducer } from "../features/users/userSlice.ts";
import { trackHistoryReducer } from "../features/trackHistory/trackHistorySlice.ts";

const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumReducer,
  tracks: trackReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  trackHistory: trackHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
