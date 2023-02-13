import Home from "../pics/home.svg";
import Calendar from "../pics/calendar.svg";
import Profile from "../pics/profile.svg";
import AddButton from "../pics/add.svg";
import Stats from "../pics/stats.svg";
import classes from "./Navigation.module.css";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const Navigation = (props) => {
  const navigate = useNavigate();
  const homePage = () => {
    navigate("/HomePage");
  };
  return (
    <Fragment>
      <div className={classes.main}>
        <ul className={classes.button}>
          <li>
            <button className={classes.homeButton} onClick={homePage}>
              <img className={classes.icon} src={Home} alt="homepage" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button className={classes.calendarButton}>
              <img className={classes.icon} src={Calendar} alt="calendar" />
              <span>Calendar</span>
            </button>
          </li>
          <li>
            <button
              className={classes.addButton}
              onClick={props.onShowSaveForm}
            >
              {/* <img className={classes.icon} src={AddButton} alt="add" /> */}
              <div className={classes.circle_plus}>
                <div className={classes.circle}>
                  <div className={classes.horizontal}></div>
                  <div className={classes.vertical}></div>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button className={classes.statsButton}>
              <img className={classes.icon} src={Stats} alt="statistics" />
              <span>Statistics</span>
            </button>
          </li>
          <li>
            <button className={classes.profileButton}>
              <img className={classes.icon} src={Profile} alt="profile" />
              <span>Profile</span>
            </button>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navigation;
