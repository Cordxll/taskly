import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    taskList: [],
    changed: false,
  },
  reducers: {
    replaceTask(state, action) {
      state.taskList = action.payload.taskList;
    },
    changeStatus(state) {
      state.changed = false;
    },
    // changeColor(state, action) {
    //   state.changed = true;
    //   const newItem = action.payload;
    //   const existingItem = state.goalList.find(
    //     (item) => item.id === newItem.id
    //   );

    //   if (existingItem) {
    //     existingItem.color = newItem.color;
    //   }
    // },
    changeInputs(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.taskList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.title = newItem.title;
        existingItem.description = newItem.description;
        existingItem.timeline = newItem.timeline;
        existingItem.completed = newItem.completed;
        existingItem.user = newItem.user;
      }
    },
    addTask(state, action) {
      state.changed = true;
      const newItem = action.payload;
      state.taskList.push({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        time: newItem.timeline,
        completed: newItem.completed,
        goal: newItem.goal,
      });
    },
    deleteTask: (state, action) => {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.taskList.find((user) => user.id === id);
      if (existingItem) {
        state.goals = state.taskList.filter((user) => user.id !== id);
      }
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
