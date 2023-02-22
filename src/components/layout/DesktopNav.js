import { Fragment } from "react";
import classes from "./DesktopNav.module.css";
import Home from "../pics/home.svg";
import Calendar from "../pics/calendar.svg";
import Profile from "../pics/profile.svg";
import Stats from "../pics/stats.svg";
import { useDispatch } from "react-redux";
import { addActions } from "../../store/addSlice";
const DesktopNav = () => {
  const dispatch = useDispatch();
  const toggleSaveFormHandler = () => {
    console.log("hey");
    dispatch(addActions.toggle());
  };
  return (
    <Fragment>
      <div className={classes.navigation}>
        <button className={classes.homeButton}>
          <img className={classes.icon} src={Home} alt="homepage" />
          <span>Home</span>
        </button>
        <button className={classes.calendarButton}>
          <img className={classes.icon} src={Calendar} alt="calendar" />
          <span>Calendar</span>
        </button>
        <button className={classes.addButton} onClick={toggleSaveFormHandler}>
          <div className={classes.circle_plus}>
            <div className={classes.circle}>
              <div className={classes.horizontal}></div>
              <div className={classes.vertical}></div>
            </div>
          </div>
        </button>
        <button className={classes.statsButton}>
          <img className={classes.icon} src={Stats} alt="statistics" />
          <span>Statistics</span>
        </button>
        <button className={classes.profileButton}>
          <img className={classes.icon} src={Profile} alt="profile" />
          <span>Profile</span>
        </button>
      </div>
    </Fragment>
  );
};

export default DesktopNav;
