import { configureStore } from "@reduxjs/toolkit";
import addSlice from "./addSlice";
import uiSlice from "./uiSlice";
import goalsSlice from "./goalsSlice";
import editSlice from "./editSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    add: addSlice.reducer,
    edit: editSlice.reducer,
    goals: goalsSlice.reducer,
    selectedDate: dateSlice.reducer,
  },
});

export default store;
