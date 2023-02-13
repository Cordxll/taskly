import { createSlice } from "@reduxjs/toolkit";

const goalItemSlice = createSlice({
  name: "goalItem",
  initialState: { title: "Lose weight", color: "grey", changed: false },
  reducers: {
    replaceGoal(state, action) {
      state.color = action.payload.color;
      state.goalItem = action.payload.goalItem;
    },
  },
});

export const goalItemActions = goalItemSlice.actions;

export default goalItemSlice;
