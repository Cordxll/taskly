import { format, parseISO, isSameDay, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasksDataByUserId } from "../../store/tasks-actions";
import Tasks from "../tasks/Tasks";
import TaskItem from "../tasks/TaskItem";
import classes from "./ViewTasks.module.css";

export default function ViewTasks({ tasks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selected = parseISO(useSelector((state) => state.selectedDate.value));
  const user = useSelector((state) => state.auth.user);

  let selectedDayTasks = tasks?.filter((task) =>
    isSameDay(parseISO(task.day), selected)
  );

  useEffect(() => {
    if (!user?.username) {
      navigate("/");
    }
    dispatch(fetchTasksDataByUserId(user.id));
  }, [dispatch, user.id, navigate, user.username]);

  return (
    <div className={classes.container}>
      <div className={classes.containerChild}>
        {isToday(selected) ? (
          <h1>Today</h1>
        ) : (
          <h1>{format(selected, "MMMM dd yyyy")}</h1>
        )}
        <h2 className={classes.whatsHappening}>What's Happening ...</h2>
      </div>
      {selectedDayTasks?.length > 0 ? (
        selectedDayTasks?.map(
          (task) =>
            // <Tasks task={task} />

            !task.completed && <TaskItem item={task} key={task.id} />
        )
      ) : (
        <h2 className={classes.noTask}>
          No tasks for {format(selected, "eeee")}.
        </h2>
      )}
    </div>
  );
}
