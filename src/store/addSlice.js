import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
  name: "add",
  initialState: { title: "", addFormIsVisible: false },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    toggle(state) {
      state.addFormIsVisible = !state.addFormIsVisible;
    },
  },
});

export const addActions = addSlice.actions;

export default addSlice;
