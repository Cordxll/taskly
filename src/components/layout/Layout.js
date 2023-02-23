import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Goals from "../goals/Goals";
import classes from "./Layout.module.css";
import { fetchGoalsData } from "../../store/goals-actions";
import { fetchTasksData } from "../../store/tasks-actions";
import { useState } from "react";
import TasksPage from "../tasks/TasksPage";
import { goalsActions } from "../../store/goalsSlice";
import { tasksActions } from "../../store/tasksSlice";

let isInitial = true;

const Layout = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchGoalsData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (goals.changed) {
      dispatch(fetchGoalsData());
      dispatch(goalsActions.changeStatus());
    }
  }, [goals.changed, dispatch]);

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.changed) {
      dispatch(fetchTasksData());
      dispatch(tasksActions.changeStatus());
    }
  }, [tasks.changed, dispatch]);

  const [goalsBtn, setGoalsBtn] = useState(true);
  const [tasksBtn, setTasksBtn] = useState(false);

  return (
    <Fragment>
      <div>
        <header className={classes.header}>
          <span>My Goals</span>
        </header>

        <div>
          <div className={classes.buttons}>
            <button
              onClick={(e) => {
                setGoalsBtn(true);
                setTasksBtn(false);
              }}
            >
              Goals
            </button>
            <button
              onClick={(e) => {
                setTasksBtn(true);
                setGoalsBtn(false);
              }}
            >
              Tasks
            </button>
          </div>
          {goalsBtn && (
            <div className={classes.content}>{goals.goalList && <Goals />}</div>
          )}
          {tasksBtn && (
            <div className={classes.content}>
              {tasks.taskList && <TasksPage />}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
