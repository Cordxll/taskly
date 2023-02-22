import { Fragment } from "react";
import classes from "./DesktopNav.module.css";
import Calendar from "../pics/calendar.svg";
import Profile from "../pics/profile.svg";
import Stats from "../pics/stats.svg";
import { useDispatch } from "react-redux";
import { addActions } from "../../store/addSlice";

//https://react-icons.github.io/react-icons to search for icons 
import {BiHome,BiCalendarCheck,BiLogOut} from 'react-icons/bi'
import {MdAddBox,MdPersonOutline,MdOutlineLogout} from 'react-icons/md'
import {VscGraph} from 'react-icons/vsc'
import {TbLogout} from 'react-icons/tb'
import { Link } from "react-router-dom";

const DesktopNav = () => {
  const dispatch = useDispatch();
  const toggleSaveFormHandler = () => {
    console.log("hey");
    dispatch(addActions.toggle());
  };
  return (
    <Fragment>
      <div className={classes.navigation}>
        <div style={{height:'100%',}}>
          <div className={classes.subcontainer}>
            <button className={`${classes.plus} ${classes.link}`} onClick={toggleSaveFormHandler}>
              New Event
            </button>
          </div>
          
          <div className={classes.subcontainer}>
            <Link to="/" className={classes.link}>
              <BiHome className={classes.icon}/>
              <p>Home</p>
            </Link>
            <Link to="/cal" className={classes.link}>
              <BiCalendarCheck className={classes.icon}/>
              <p>Calendar</p>
            </Link>
            <Link to="/statistics" className={classes.link}>
              <VscGraph className={classes.icon}/>
              <p>Statistics</p>
            </Link>
          </div>
        </div>

        <div className={`${classes.subcontainer} ${classes.last}`}>
          <Link to="/profile" className={classes.link}>
            <MdPersonOutline className={classes.icon}/>
            <p>Profile</p>
          </Link>
          <button className={classes.link}>
            <MdOutlineLogout className={classes.icon}/>
            <p>Logout</p>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default DesktopNav;
