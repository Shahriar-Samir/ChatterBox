import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { chatterBoxApi } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [chatterBoxApi.reducerPath]: chatterBoxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatterBoxApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
