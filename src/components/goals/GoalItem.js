import { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import MoreButton from "./MoreButton";
import TimeClock from "../pics/time.svg";
import { editActions } from "../../store/editSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GoalItem = (props) => {
  const dispatch = useDispatch();

  const goals = useSelector((store) => store.goals.goalList);

  const existingItem = goals.filter(
    (item) => item.id === Number(props.item.id)
  );

  const { id, title, description, timeline, color, completed, progress } =
    existingItem[0];

  const navigate = useNavigate();
  const showTasks = useSelector((state) => state.ui.taskIsVisible);

  const [completedTasks, setCompletedTasks] = useState(false);
  const toggleGoalHandler = () => {
    setCompletedTasks(!completedTasks);
    dispatch(uiActions.toggle());
  };

  const buttonStyle = {
    border: `0.1em solid ${color} `,
  };

  const tasks = useSelector((state) => state.tasks.taskList);

  const goalTasks = tasks
    .filter((item) => item.goal?.title === title)
    .sort((a, b) => {
      //sort for not completed and overdue tasks
      return new Date(b.day + "T" + b.time) < new Date() && !b.completed
        ? -1
        : 1;
    })
    .sort((a, b) => {
      return a.completed > !b.completed ? 1 : -1;
    });
  return (
    <>
      <Card>
        <div
          className={
            description.trim() !== "" && timeline
              ? classes.goal
              : classes.noDescription
          }
        >
          {/* <button
            className={classes.themeColorBtn}
            style={{ backgroundColor: color }}
          ></button> */}
          <div>
            <CircularProgressbar
              value={progress}
              maxValue={100}
              text={`${progress}%`}
              styles={buildStyles({
                textColor: "black",
                pathColor: color,
                trailColor: "#caa2a264",
              })}
            />
          </div>
          <span className={classes.headerText}>{title}</span>
          <MoreButton
            className={classes.moreBtn}
            onClick={() => {
              navigate(`/Goals/EditModal/${id}`);
              dispatch(editActions.setTitle("Update goal"));
            }}
            // title="Update goal"
            goal={props}
            key={id}
          />
          {description.trim() !== "" && (
            <div className={classes.description}>
              <span style={{ fontWeight: "bold" }}>Note: </span>
              <span>{description}</span>
            </div>
          )}
          {timeline && (
            <div
              className={
                description.trim() === ""
                  ? classes.timeNoDescription
                  : classes.date
              }
            >
              <img
                className={classes.timeClock}
                src={TimeClock}
                alt="time clock"
              />
              <span className={classes.goalTime}>
                {format(
                  new Date(timeline).setDate(new Date(timeline).getDate() + 1),
                  "MMM dd, yyyy"
                )}
              </span>
            </div>
          )}
          <button
            className={classes.itemButton}
            onClick={toggleGoalHandler}
            style={buttonStyle}
          >
            View Tasks
          </button>
        </div>
      </Card>

      {completedTasks && (
        <div>
          {goalTasks.map((item) => (
            <CompletedTasks
              key={item.id}
              className={classes.items}
              item={item}
              title={"Eat healthy"}
              date={"01/10/2023"}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GoalItem;
