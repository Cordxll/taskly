import { Fragment } from "react";
import classes from "./DesktopNav.module.css";
import logo from "../../assets/taskly-high-resolution-logo-color-on-transparent-background.png";
import { useDispatch, useSelector } from "react-redux";
import { addActions } from "../../store/addSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/user-actions";

//https://react-icons.github.io/react-icons to search for icons
import { BiHome, BiCalendarCheck, BiLogOut } from "react-icons/bi";
import { MdAddBox, MdPersonOutline, MdOutlineLogout } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { userActions } from "../../store/userSlice";

const DesktopNav = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSaveFormHandler = () => {
    console.log("hey");
    dispatch(addActions.toggle());
  };

  const handleLogOut = () => {
    navigate("/");
    dispatch(userActions.logoutUser());
  };

  function HomeCalendarStats() {
    return (
      <div className={classes.subcontainer}>
        <Link to="/Goals" className={classes.link}>
          <BiHome className={classes.icon} />
          <p>Goals</p>
        </Link>
        <Link to="/cal" className={classes.link}>
          <BiCalendarCheck className={classes.icon} />
          <p>Calendar</p>
        </Link>
        <Link to="/Stats" className={classes.link}>
          <VscGraph className={classes.icon} />
          <p>Statistics</p>
        </Link>
      </div>
    );
  }

  function LoginRegister() {
    return (
      <div className={classes.subcontainer}>
        <Link to="/login" className={classes.link}>
          Sign In
        </Link>
        <Link to="/register" className={classes.link}>
          Register
        </Link>
        <div></div>
      </div>
    );
  }

  function Footer() {
    return (
      <>
        <Link to="/profile" className={classes.link}>
          <MdPersonOutline className={classes.icon} />
          <p>Profile</p>
        </Link>
        <button className={classes.link} onClick={handleLogOut}>
          <MdOutlineLogout className={classes.icon} />
          <p>Logout</p>
        </button>
      </>
    );
  }

  return (
    <Fragment>
      <div className={classes.navigation}>
        <div style={{ height: "100%" }}>
          <div className={classes.subcontainer}>
            <Link to="/" className={classes.link}>
              <img src={logo} style={{ width: "100%" }} />
            </Link>
          </div>
          {user?.username ? HomeCalendarStats():LoginRegister()}
        </div>

        <div className={`${classes.subcontainer} ${classes.last}`}>
          {user?.username ? Footer() : ""}
        </div>
      </div>
    </Fragment>
  );
};

export default DesktopNav;
