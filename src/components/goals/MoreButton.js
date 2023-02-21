import { Fragment } from "react";
import MoreSvg from "../pics/more.svg";
import classes from "./MoreButton.module.css";

const MoreButton = (props) => {
  return (
    <Fragment>
      <div className={classes.main}>
        <button className={classes.icon} onClick={props.onClick}>
          <img src={MoreSvg} alt="more" />
        </button>
      </div>
    </Fragment>
  );
};

export default MoreButton;
