import { Fragment } from "react";
import MoreSvg from "../pics/more.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./MoreButton.module.css";
import Delete from "../pics/delete.svg";
import Edit from "../pics/edit.svg";
import { addActions } from "../../store/addSlice";

const MoreButton = () => {
  // const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const toggleGoalHandler = () => {
    dispatch(addActions.toggle());
  };
  // const handleClick = () => {
  //   setClicked(!clicked);
  // };
  return (
    <Fragment>
      <div className={classes.main}>
        <button className={classes.icon} onClick={toggleGoalHandler}>
          <img src={MoreSvg} alt="more" />
        </button>
        {/* {clicked && (
          <ul className={classes.btn}>
            <li>
              <button className={classes.btn1}>
                <img src={Edit} alt="edit"></img>
              </button>
            </li>
            <li>
              <button className={classes.btn2}>
                <img src={Delete} alt="delete"></img>
              </button>
            </li>
          </ul>
        )} */}
      </div>
    </Fragment>
  );
};

export default MoreButton;
