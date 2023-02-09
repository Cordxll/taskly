import Home from "../pics/home.svg";
import Calendar from "../pics/calendar.svg";
import Profile from "../pics/profile.svg";
import AddButton from "../pics/add.svg";
import classes from "./Navigation.module.css";
import { Fragment } from "react";
const Footer = () => {
  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.addButton}>
          <button className={classes.button}>
            <img className={classes.icon} src={AddButton} alt="add" />
          </button>
        </div>

        <div className={classes.navigation}>
          <button className={classes.button}>
            <img className={classes.icon} src={Home} alt="homepage" />
            <span>Home</span>
          </button>
          <button className={classes.button}>
            <img className={classes.icon} src={Calendar} alt="calendar" />
            <span>Calendar</span>
          </button>
          <button className={classes.button}>
            <img className={classes.icon} src={Profile} alt="profile" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
