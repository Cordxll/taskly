import Home from "../pics/home.svg";
import Calendar from "../pics/calendar.svg";
import Profile from "../pics/profile.svg";
import Stats from "../pics/stats.svg";
import classes from "./Navigation.module.css";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addActions } from "../../store/addSlice";
const Navigation = (props) => {
  // const dispatch = useDispatch();
  // const toggleSaveFormHandler = () => {
  //   dispatch(addActions.toggle());
  // };

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  if (user?.username) {
    return (
      <Fragment>
        <div className={classes.main}>
          <ul className={classes.button}>
            <li>
              <button
                className={classes.homeButton}
                onClick={() => {
                  navigate("/Goals");
                }}
              >
                <img className={classes.icon} src={Home} alt="homepage" />
              </button>
            </li>
            <li>
              <button
                className={classes.calendarButton}
                onClick={() => {
                  navigate("/Cal");
                }}
              >
                <img className={classes.icon} src={Calendar} alt="calendar" />
              </button>
            </li>
            {/* <li>
            <button
              className={classes.addButton}
              onClick={toggleSaveFormHandler}
            >
              <div className={classes.circle_plus}>
                <div className={classes.circle}>
                  <div className={classes.horizontal}></div>
                  <div className={classes.vertical}></div>
                </div>
              </div>
            </button>
          </li> */}
            <li>
              <button
                className={classes.statsButton}
                onClick={() => {
                  navigate("/Stats");
                }}
              >
                <img className={classes.icon} src={Stats} alt="statistics" />
              </button>
            </li>
            <li>
              <button
                className={classes.profileButton}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <img className={classes.icon} src={Profile} alt="profile" />
              </button>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default Navigation;
