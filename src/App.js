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

function App() {
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
            <Route exact path="/Layout" element={<Layout />} />
            <Route exact path="/Goals" element={<Goals />} />
            <Route exact path="/Tasks" element={<TasksPage />} />
            <Route exact path="/Edit" element={<EditCard />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Cal" element={<CalendarAndTasks />} />
            <Route exact path="/profile" element={<Profile/>}/>
            <Route
              exact
              path="/Goals/EditModal/:id"
              element={<EditGoalForm />}
            />
            <Route
              exact
              path="/Tasks/EditModal/:id"
              element={<EditTaskForm />}
            />
          </Routes>
        </Router>
      </Fragment>
  );
}

export default App;
