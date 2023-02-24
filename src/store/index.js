import { configureStore } from "@reduxjs/toolkit";
import addSlice from "./addSlice";
import uiSlice from "./uiSlice";
import goalsSlice from "./goalsSlice";
import editSlice from "./editSlice";
import dateSlice from "./dateSlice";
import userSlice from "./userSlice";
import tasksSlice from "./tasksSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    add: addSlice.reducer,
    edit: editSlice.reducer,
    goals: goalsSlice.reducer,
    tasks: tasksSlice.reducer,
    selectedDate: dateSlice.reducer,
    auth: userSlice.reducer,
  },
});

export default store;
