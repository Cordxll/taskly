import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goals: [
      { id: 1, title: "Lose weight", color: { backgroundColor: "pink" } },
      {
        id: 2,
        title: "Learn new language",
        color: { backgroundColor: "blue" },
      },
      {
        id: 3,
        title: "Eat healthy",
        color: { backgroundColor: "purple" },
      },
    ],
    changed: false,
  },
  reducers: {
    replaceGoal(state, action) {
      state.goals = action.payload.goals;
    },
    changeColor(state, action) {
      const newItem = action.payload;
      const existingItem = state.goals.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.goals.push({
          id: newItem.id,
          title: newItem.title,
          color: newItem.color,
        });
      } else {
        existingItem.color = action.payload.color;
      }
    },
    changeTitle(state, action) {
      const newItem = action.payload;
      const existingItem = state.goals.find((item) => item.id === newItem.id);
      existingItem.title = newItem.title;
    },
    addGoal(state, action) {
      const newItem = action.payload;
      state.goals.push({
        id: newItem.id,
        title: newItem.title,
        color: newItem.color,
      });
    },
    deleteGoal(state, action) {
      const id = action.payload;
      state.changed = true;
      state.goals = state.goals.filter((item) => item.id !== id);
    },
  },
});

export const goalsActions = goalsSlice.actions;

export default goalsSlice;
