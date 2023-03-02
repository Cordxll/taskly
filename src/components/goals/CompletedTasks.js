import { Fragment } from "react";
import classes from "./CompletedTasks.module.css";
import TimeClock from "../pics/time.svg";
import { format, parseISO } from "date-fns";

const CompletedTasks = (props) => {
  const formatDate = new Date(props.item.day + "T" + props.item.time);
  const formatedDay = format(formatDate, "MMM d, yyyy");
  const overdue = formatDate < new Date() && !props.item.completed;

  return (
    <Fragment>
      <div className={!overdue ? classes.task : classes.overdueTask}>
        <div>{props.item.title}</div>
        <div className={classes.time}>
          <img className={classes.timeClock} src={TimeClock} alt="time clock" />
          {!props.item.completed && overdue && (
            <span className={classes.overdue}>overdue</span>
          )}
          {!props.item.completed && !overdue && (
            <span className={classes.active}>active</span>
          )}

          {props.item.completed && (
            <span className={classes.goalTime}>{formatedDay}</span>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default CompletedTasks;
