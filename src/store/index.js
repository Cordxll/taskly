import { configureStore } from "@reduxjs/toolkit";
import addSlice from "./addSlice";
import uiSlice from "./uiSlice";
import goalsSlice from "./goalsSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    add: addSlice.reducer,
    goals: goalsSlice.reducer,
  },
});

export default store;
