import { Fragment, useEffect, useState } from "react";
import classes from "./Layout.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const time = new Date().getHours();
  let greeting;
  if (time > 3 && time < 12) {
    greeting = "Good morning";
  } else if (time >= 12 && time < 17) {
    greeting = "Good afternoon";
  } else if (time >= 17 && time < 21) {
    greeting = "Good evening";
  } else {
    greeting = "Hello";
  }

  const active = window.location.pathname;
  // console.log(active === "/Goals");

  return (
    <Fragment>
      <div>
        <header className={classes.header}>
          <span className={classes.headerTitle}>
            {greeting}, {user?.fullName.split(" ")[0]}
          </span>
          <span className={classes.headerDesc}>
            You've got some work for today
          </span>
        </header>

        <div>
          <div className={classes.buttons}>
            <button
              className={
                active === "/Goals" ? classes.goalsActive : classes.button1
              }
              onClick={() => navigate("/Goals")}
            >
              Goals
            </button>
            <button
              className={
                active === "/Tasks" ? classes.tasksActive : classes.button2
              }
              onClick={() => navigate("/Tasks")}
            >
              Tasks
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
