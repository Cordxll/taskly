import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
  name: "add",
  initialState: { title: "Create a goal", addFormIsVisible: false },
  reducers: {
    toggle(state) {
      state.addFormIsVisible = !state.addFormIsVisible;
    },
  },
});

export const addActions = addSlice.actions;

export default addSlice;
