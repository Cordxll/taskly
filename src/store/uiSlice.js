import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { taskIsVisible: false },
  reducers: {
    toggle(state) {
      state.taskIsVisible = !state.taskIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
