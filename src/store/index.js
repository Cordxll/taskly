import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addSlice from "./addSlice";
import uiSlice from "./uiSlice";
import goalsSlice from "./goalsSlice";
import editSlice from "./editSlice";
import dateSlice from "./dateSlice";
import userSlice, { userActions } from "./userSlice";
import tasksSlice from "./tasksSlice";
// import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import thunk from 'redux-thunk';

// import rootReducer from './reducers'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const rootReducer = combineReducers({
//   ui: uiSlice.reducer,
//   add: addSlice.reducer,
//   edit: editSlice.reducer,
//   goals: goalsSlice.reducer,
//   tasks: tasksSlice.reducer,
//   selectedDate: dateSlice.reducer,
//   auth: userSlice.reducer,
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: persistedReducer,
  reducer: {
    ui: uiSlice.reducer,
  add: addSlice.reducer,
  edit: editSlice.reducer,
  goals: goalsSlice.reducer,
  tasks: tasksSlice.reducer,
  selectedDate: dateSlice.reducer,
  auth: userSlice.reducer,
  },

  middleware: ((getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.time"],
        // Ignore these paths in the state
        ignoredPaths: ["tasks.taskList.time"],
      },
    }), [thunk])
});

export default store;

// export const persistor = persistStore(store);