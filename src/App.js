import "./App.css";
import { Fragment, useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditCard from "./components/goals/actions/EditCard";
import Login from "./components/login/Login";
import Register from "./components/registration/Register";
import jwtDecode from "jwt-decode";
import AuthContext from "./components/context/AuthContext";
import CalendarAndTasks from "./components/calendar/CalendarAndTasks";
import HomePublic from "./components/home/HomePublic";
import "./App.css";
import EditGoalForm from "./components/goals/actions/EditGoalForm";
import Navigation from "./components/layout/Navigation";
import DesktopNav from "./components/layout/DesktopNav";
import classes from "./components/layout/Layout.module.css";

const LOCAL_STORAGE_TOKEN_KEY = "productivePeopleToken";

const unregisteredUser = {
  username: "",
  email: "",
  userId: "",
  token: "",
};

function App() {
  const [user, setUser] = useState(unregisteredUser);

  const login = async (token) => {
    const userInfo = { ...user };

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    const { sub: username } = jwtDecode(token);

    const response = await fetch(`http://localhost:8080/user/${username}`);

    const body = await response.json();

    console.log(body.id);
    console.log(body.email);

    userInfo.username = username;
    userInfo.userId = body.id;
    userInfo.email = body.email;
    userInfo.token = token;

    setUser(userInfo);
    console.log(userInfo);
  };

  const logout = () => {
    setUser(unregisteredUser);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    login,
    logout,
    user,
  };
  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <AuthContext.Provider value={auth}>
      <Fragment>
        {isDesktop ? (
          <DesktopNav />
        ) : (
          <div className={classes.navbar}>
            <Navigation />
          </div>
        )}
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePublic />} />
            <Route exact path="/Layout" element={<Layout />} />
            <Route exact path="/Edit" element={<EditCard />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Cal" element={<CalendarAndTasks />} />
            <Route
              exact
              path="/Layout/EditModal/:id"
              element={<EditGoalForm />}
            />
          </Routes>
        </Router>
      </Fragment>
    </AuthContext.Provider>
  );
}

export default App;
