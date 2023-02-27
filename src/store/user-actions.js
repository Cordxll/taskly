import { userActions } from "./userSlice"
import { Api } from "../hooks/Api";
import jwtDecode from "jwt-decode";

const LOCAL_STORAGE_TOKEN_KEY = "productivePeopleToken";

export const login = (username, password) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const request = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }

            const response = await fetch("http://localhost:8080/user/login/authenticate", request);

            if (response.ok) {
                const { token } = await response.json();
                dispatch(setUser(token));
            } else {
                const report = await response.json();
                console.log(report);
            }
        }

        try {
            await sendRequest();;
        } catch (error) {
            console.log(error);
        }
    }

}

export const register = (username, password, email) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email
                })
            }

            const response = await fetch("http://localhost:8080/user/register/authenticate", request);

            if (response.ok) {
                const { token } = await response.json();
                dispatch(setUser(token));
            } else {
                const report = await response.json();
                console.log(report);
            }
        }

        try {
            await sendRequest();;
        } catch (error) {
            console.log(error);
        }


    }


}

export function logout(dispatch) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    dispatch(userActions.logoutUser());
}

function setUser(token) {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(`${Api}/user/${username}`);
            const body = await response.json();
            return body;
        }

        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        const { sub: username } = jwtDecode(token);

        let body;

        try {
            body = await sendRequest();
        } catch (error) {
            console.log(error);
        }

        const userInfo = {}

        userInfo.username = username;
        userInfo.userId = body.id;
        userInfo.email = body.email;
        userInfo.token = token;

        console.log(token, username);

        dispatch(userActions.setUser(userInfo));
    }
};