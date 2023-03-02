import "./App.css";
import { Fragment, useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditCard from "./components/goals/actions/EditCard";
import Login from "./components/login/Login";
import Register from "./components/registration/Register";
import CalendarAndTasks from "./components/calendar/CalendarAndTasks";
import HomePublic from "./components/home/HomePublic";
import "./App.css";
import EditGoalForm from "./components/goals/actions/EditGoalForm";
import Navigation from "./components/layout/Navigation";
import DesktopNav from "./components/layout/DesktopNav";
import Goals from "./components/goals/Goals";
import TasksPage from "./components/tasks/TasksPage";
import classes from "./components/layout/Layout.module.css";
import EditTaskForm from "./components/tasks/EditTaskForm";
import Profile from "./components/profile/Profile";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector((state) => state.auth.user);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
      <Fragment>
        <Router>
          {isDesktop ? (
            <DesktopNav />
          ) : (
            <div className={classes.navbar}>
              <Navigation />
            </div>
          )}
          <Routes>
            <Route exact path="/" element={<HomePublic />} />
            <Route exact path="/Layout" element={user.token ? <Layout /> : <HomePublic/>} />
            <Route exact path="/Goals" element={user.token ? <Goals /> : <HomePublic/>} />
            <Route exact path="/Tasks" element={user.token ? <TasksPage /> : <HomePublic/>} />
            <Route exact path="/Edit" element={user.token ? <EditCard /> : <HomePublic/>} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Cal" element={user.token ? <CalendarAndTasks /> : <HomePublic/>} />
            <Route exact path="/profile" element={user.token ? <Profile/> : <HomePublic/>}/>
            <Route
              exact
              path="/Goals/EditModal/:id"
              element={user.token ? <EditGoalForm /> : <HomePublic/>}
            />
            <Route
              exact
              path="/Tasks/EditModal/:id"
              element={user.token ? <EditTaskForm /> : <HomePublic/>}
            />
          </Routes>
        </Router>
      </Fragment>
  );
}

export default App;
