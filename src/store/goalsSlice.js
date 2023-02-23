import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goalList: [
      // {
      //   id: 1,
      //   title: "Lose weight",
      //   description: "Getting ready for the wedding",
      //   timeline: format(new Date(2023, 4, 15), "yyyy-MM-dd"),
      //   color: { backgroundColor: "pink" },
      //   completed: false,
      // },
      // {
      //   id: 2,
      //   title: "Learn new language",
      //   description: "new hobby",
      //   timeline: format(new Date(2023, 6, 1), "yyyy-MM-dd"),
      //   color: { backgroundColor: "blue" },
      //   completed: false,
      // },
      // {
      //   id: 3,
      //   title: "Eat healthy",
      //   description: "less stomach issues",
      //   timeline: format(new Date(2023, 9, 15), "yyyy-MM-dd"),
      //   color: { backgroundColor: "purple" },
      //   completed: true,
      // },
    ],
    changed: false,
  },
  reducers: {
    replaceGoal(state, action) {
      state.goalList = action.payload.goalList;
    },
    changeColor(state, action) {
      const newItem = action.payload;
      const existingItem = state.goalList.find(
        (item) => item.id === newItem.id
      );
      state.changed = true;
      if (existingItem) {
        existingItem.color = newItem.color;
      }
    },
    changeInputs(state, action) {
      const newItem = action.payload;
      const existingItem = state.goalList.find(
        (item) => item.id === newItem.id
      );
      state.changed = true;
      if (existingItem) {
        existingItem.title = newItem.title;
        existingItem.description = newItem.description;
        existingItem.timeline = newItem.timeline;
        existingItem.completed = newItem.completed;
        existingItem.user = newItem.user;
      }
    },
    addGoal(state, action) {
      const newItem = action.payload;
      state.changed = true;
      state.goalList.push({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        timeline: newItem.timeline,
        color: newItem.color,
      });
    },
    deleteGoal: (state, action) => {
      const id = action.payload;
      state.changed = true;
      const existingItem = state.goalList.find((user) => user.id === id);
      if (existingItem) {
        state.goals = state.goalList.filter((user) => user.id !== id);
      }
    },
  },
});

export const goalsActions = goalsSlice.actions;

export default goalsSlice;