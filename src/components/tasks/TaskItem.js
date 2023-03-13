import classes from "./TaskItem.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editActions } from "../../store/editSlice";
import { format, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { fetchTasksForGoal, fetchGoalsData } from "../../store/goals-actions";

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((store) => store.tasks.taskList);

  const existingItem = tasks.filter(
    (item) => item.id === Number(props.item.id)
  );

  const { id, title, description, time, day, duration, completed, goal } =
    existingItem[0];

  const formatDate = new Date(day + "T" + time);
  const formatEndTime = new Date(day + "T" + time);

  const formatedDay = format(formatDate, "MMM d, yyyy");

  let endTime;
  if (duration === 0 || !duration) {
    endTime = null;
  } else {
    formatEndTime.setMinutes(formatEndTime.getMinutes() + Number(duration));
    endTime =
      " - " +
      new Date(formatEndTime).toLocaleString().split(",")[1].slice(0, 5) +
      new Date(formatEndTime).toLocaleString().split(",")[1].slice(8, 12);
  }
  const theTime =
    new Date(formatDate).toLocaleString().split(",")[1].slice(0, 5) +
    new Date(formatDate).toLocaleString().split(",")[1].slice(8, 12);

  let startTime;
  if (time === "00:00") {
    startTime = null;
  } else {
    startTime = theTime;
  }
  return (
    <div className={classes.taskItem} key={id}>
      <div className={classes.container}>
        <div>
          <div style={{ display: "flex" }}>
            {goal && (
              <div
                className={classes.bubble}
                style={{ backgroundColor: goal.color }}
              >
                {goal.title}
              </div>
            )}
          </div>
          <div className={classes.header}>{title}</div>
          <div className={classes.description}>{description}</div>

          {day && startTime && (
            <div className={classes.time}>{[startTime, endTime]}</div>
          )}
          {/* {day && !startTime && <div className={classes.time}>{day}</div>} */}
        </div>
        <button
          className={classes.btn}
          onClick={() => {
            navigate(`/Tasks/EditModal/${id}`);
            dispatch(editActions.setTitle("Update task"));
          }}
          title="Update task"
          goal={props}
          key={id}
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/small-v17/100/menu_options_points_select_selection_three-512.png"
            width={30}
            alt="more button"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
