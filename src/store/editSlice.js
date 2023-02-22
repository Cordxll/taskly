import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: { title: "Update goal", editFormIsVisible: false },
  reducers: {
    toggle(state, id) {
      state.editFormIsVisible = !state.editFormIsVisible;
    },
  },
});

export const editActions = editSlice.actions;

export default editSlice;