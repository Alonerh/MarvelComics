import { configureStore } from "@reduxjs/toolkit";
import comicReducer from "./reducers/comicReducer";
import themeReducer from "./reducers/themeReducer";

export const store = configureStore({
    reducer: {
        comic: comicReducer,
        theme: themeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;