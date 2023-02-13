import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goals: [{ id: 1, title: "Lose weight", color: "#FF0000" }],
    changed: false,
  },
  reducers: {
    replaceGoal(state, action) {
      state.goals = action.payload.goals;
    },
    changeColor(state, action) {
      state.color = action.payload.color;
    },
  },
});

export const goalsActions = goalsSlice.actions;

export default goalsSlice;
