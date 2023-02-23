import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        email: "",
        userId: "",
        token: "",
    },
    reducers: {
        fill(state, action) {
            state.username = action.username;
            state.email = action.email;
            state.userId = action.userId;
            state.token = action.token;
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice;
