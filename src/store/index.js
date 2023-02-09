import { configureStore } from "@reduxjs/toolkit";
import addSlice from "./addSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, add: addSlice.reducer },
});

export default store;
