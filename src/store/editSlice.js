import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: { title: "Update goal", editFormIsVisible: false },
  reducers: {
    toggle(state, action) {
      state.editFormIsVisible = !state.editFormIsVisible;
    },
  },
});

export const editActions = editSlice.actions;

export default editSlice;
