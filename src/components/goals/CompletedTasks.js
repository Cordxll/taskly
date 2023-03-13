import { Fragment, useState, useEffect } from "react";
import classes from "./CompletedTasks.module.css";
import TimeClock from "../pics/time.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { updateDate } from "../../store/dateSlice";

const CompletedTasks = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formatDate = new Date(props.item.day + "T" + props.item.time);
  const formatedDay = format(formatDate, "MMM d, yyyy");
  const overdue = formatDate < new Date() && !props.item.completed;

  const [day, setDay] = useState(
    new Date(
      new Date(props.item.day).setDate(new Date(props.item.day).getDate() + 1)
    )
  );

  useEffect(() => {
    dispatch(updateDate(format(day, "yyyy-MM-dd")));
  }, [dispatch, day]);

  const handleClick = () => {
    setDay(new Date(day).setDate(new Date(day).getDate() + 1));
    dispatch(updateDate(format(day, "yyyy-MM-dd")));
    navigate(`/Tasks`);
  };

  return (
    <Fragment>
      <button
        key={props.item.id}
        className={classes.taskBtn}
        onClick={props.item.completed ? null : handleClick}
      >
        <div className={!overdue ? classes.task : classes.overdueTask}>
          <div>{props.item.title}</div>
          <div className={classes.time}>
            <img
              className={classes.timeClock}
              src={TimeClock}
              alt="time clock"
            />
            {!props.item.completed && overdue && (
              <span className={classes.overdue}>overdue</span>
            )}
            {!props.item.completed && !overdue && (
              <span className={classes.active}>active</span>
            )}

            {props.item.completed && (
              <span className={classes.goalTime}>
                completed
                {/* {formatedDay} */}
              </span>
            )}
          </div>
        </div>
      </button>
    </Fragment>
  );
};
export default CompletedTasks;
