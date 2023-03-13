import Card from "../ui/Card";
import classes from "./StatsItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchTasksDataByUserId } from "../../store/tasks-actions";
import { fetchGoalsDataByUserId } from "../../store/goals-actions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const StatsItem = (props) => {
  const dispatch = useDispatch();

  const goals = useSelector((store) => store.goals.goalList);
  const tasks = useSelector((state) => state.tasks.taskList);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchTasksDataByUserId(user.id));
    dispatch(fetchGoalsDataByUserId(user.id));
  }, [dispatch, user.id]);

  const existingItem = goals.filter(
    (item) => item.id === Number(props.item.id)
  );

  const { id, title, description, timeline, color, completed, progress } =
    existingItem[0];

  const filteredTasks = tasks.filter(
    (item) => item.goal?.title === title && item.completed
  );

  const overdue = goals.filter(
    (item) => !item.completed && new Date(item.timeline) < new Date()
  );
  const isOverdue = overdue.indexOf(existingItem[0]) !== -1;

  return (
    <>
      <Card className={isOverdue ? classes.overdue : classes.goalContainer}>
        <div className={classes.goal}>
          {isOverdue && <span className={classes.overdueHeader}>overdue </span>}
          <CircularProgressbar
            className={classes.progressbar}
            value={progress}
            maxValue={100}
            text={`${progress}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: color,
              trailColor: "#caa2a264",
            })}
          />
          <span className={classes.progressTitle}>{title}</span>

          <div className={classes.completedTasks}>
            <div
              // className={
              //   !completed
              //     ? classes.onlyCompleted
              //     : classes.completedTasksHeader
              // }
              className={classes.onlyCompleted}
            >
              <header>TASKS COMPLETED </header>
              <span>{filteredTasks.length}</span>
            </div>
            {/* {completed && timeline && (
              <div className={classes.completedTasksHeader}>
                <header>COMPLETED ON </header>
                <span className={classes.goalTime}>
                  {format(
                    new Date(timeline).setDate(
                      new Date(timeline).getDate() + 1
                    ),
                    "MMM d, yyyy"
                  )}
                </span>
              </div>
            )} */}
          </div>
        </div>
      </Card>
    </>
  );
};

export default StatsItem;
