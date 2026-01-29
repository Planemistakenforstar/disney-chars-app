import { configureStore } from "@reduxjs/toolkit";
import disneyReducer from "./disneySlice";

export const store = configureStore({
  reducer: {
    disney: disneyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
