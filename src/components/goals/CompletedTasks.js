import { Fragment } from "react";
import classes from "./CompletedTasks.module.css";
import TimeClock from "../pics/time.svg";

const CompletedTasks = (props) => {
  return (
    <Fragment>
      <div className={classes.task}>
        <div>{props.item.title}</div>
        <div className={classes.time}>
          <img className={classes.timeClock} src={TimeClock} alt="time clock" />
          <div className={classes.goalTime}>{props.item.day}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default CompletedTasks;
