import { Fragment } from "react";
import MoreSvg from "../pics/more.svg";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MoreButton.module.css";
import Delete from "../pics/delete.svg";
import Edit from "../pics/edit.svg";
import { addActions } from "../../store/addSlice";
import { click } from "@testing-library/user-event/dist/click";

const MoreButton = (props) => {
  const dispatch = useDispatch();
  const toggleGoalHandler = () => {
    dispatch(addActions.toggle());
  };

  return (
    <Fragment>
      <div className={classes.main}>
        <button className={classes.icon} onClick={props.onClick}>
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
