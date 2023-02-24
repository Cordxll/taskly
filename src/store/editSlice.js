import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: { title: "", editFormIsVisible: false },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    toggle(state, action) {
      state.editFormIsVisible = !state.editFormIsVisible;
    },
  },
});

export const editActions = editSlice.actions;

export default editSlice;
