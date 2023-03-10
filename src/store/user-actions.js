import { userActions } from "./userSlice";
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
          username,
          password,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/user/login/authenticate",
        request
      );

      if (response.ok) {
        const { token } = await response.json();
        dispatch(setUser(token));
      } else {
        dispatch(userActions.clearError());
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          dispatch(userActions.logError(report[i]));
        }
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(userActions.clearError());
      dispatch(userActions.logError("Password is incorrect"));
    }
  };
};

export const register = (fullName, username, password, email, pictureUrl) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          email,
          pictureUrl,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/user/register/authenticate",
        request
      );

      if (response.ok) {
        const { token } = await response.json();
        dispatch(setUser(token));
      } else {
        dispatch(userActions.clearError());
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          dispatch(userActions.logError(report[i]));
        }
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (dispatch) => {
  dispatch(userActions.clearError());
  userActions.logoutUser();
};

export const updateUser = (username, email, userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const request = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          userId,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/user/update",
        request
      );
      if (!response.ok) {
        dispatch(userActions.clearError());
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          dispatch(userActions.logError(report[i]));
        }
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

function setUser(token) {
  return async (dispatch) => {
    const sendRequest = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${Api}/user/${username}`, init);
      const body = await response.json();
      return body;
    };

    const { sub: username } = jwtDecode(token);

    try {
      const body = await sendRequest();

      const userInfo = {
        fullName: body.fullName,
        username: username,
        id: body.id,
        email: body.email,
        token: token,
        pictureUrl: body.pictureUrl,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      dispatch(userActions.loginUser(userInfo));
    } catch (error) {
      console.log(error);
    }
  };
}

export const updateUserInfo = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/user/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const { token } = await response.json();
        dispatch(setUser(token));
      } else {
        dispatch(userActions.clearError());
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          dispatch(userActions.logError(report[i]));
        }
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("error");
    }
  };
};
