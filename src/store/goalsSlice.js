import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goals: [
      {
        id: 1,
        title: "Lose weight",
        description: "Getting ready for the wedding",
        timeline: format(new Date(2023, 4, 15), "yyyy-MM-dd"),
        color: { backgroundColor: "pink" },
        completed: false,
      },
      {
        id: 2,
        title: "Learn new language",
        description: "new hobby",
        timeline: format(new Date(2023, 6, 1), "yyyy-MM-dd"),
        color: { backgroundColor: "blue" },
        completed: false,
      },
      {
        id: 3,
        title: "Eat healthy",
        description: "less stomach issues",
        timeline: format(new Date(2023, 9, 15), "yyyy-MM-dd"),
        color: { backgroundColor: "purple" },
        completed: true,
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
      if (existingItem) {
        existingItem.color = newItem.color;
      }
    },
    changeInputs(state, action) {
      const newItem = action.payload;
      const existingItem = state.goals.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.title = newItem.title;
        existingItem.description = newItem.description;
        existingItem.timeline = newItem.timeline;
        existingItem.completed = newItem.completed;
      }
    },
    addGoal(state, action) {
      const newItem = action.payload;
      state.goals.push({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        timeline: newItem.timeline,
        color: newItem.color,
      });
    },
    deleteGoal: (state, action) => {
      const id = action.payload;
      console.log(id);
      const existingItem = state.goals.find((user) => user.id === id);
      if (existingItem) {
        state.goals = state.goals.filter((user) => user.id !== id);
      }
    },
  },
});

export const goalsActions = goalsSlice.actions;

export default goalsSlice;
