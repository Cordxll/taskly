import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        errorList: []
    },
    reducers: {
        loginUser(state, action) {
            const user = action.payload;
         
            state.user.username = user.username;
            state.user.email = user.email;
            state.user.userId = user.userId;
            state.user.token = user.token;
        },

        logoutUser(state) {
            state.user = null;
        },

        logError(state, action) {

            let error = action.payload;

            state.errorList.push(error);
        },

        clearError(state) {
            state.errorList = [];
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice;
