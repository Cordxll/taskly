import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasksSlice";
import classes from "../tasks/TaskPage.module.css";
import TaskItem from "./TaskItem";
import { fetchTasksDataByUserId } from "../../store/tasks-actions";
import AddButton from "../goals/actions/AddButton";
import { addActions } from "../../store/addSlice";
import { editActions } from "../../store/editSlice";
import AddTaskForm from "../tasks/AddTaskForm";
import EditTaskForm from "../tasks/EditTaskForm";
import Layout from "../layout/Layout";
import { parseISO, isSameDay } from "date-fns";
import DateViewer from "../calendar/WeekCalendar";
import { useNavigate } from "react-router-dom";

let initial = true;

const TasksPage = (props) => {
  const tasks = useSelector((state) => state.tasks.taskList);
  const user = useSelector((state) => state.auth.user);
  const taskChanged = useSelector((state) => state.tasks.changed);
  const dispatch = useDispatch();
  const addForm = useSelector((state) => state.add);
  const editForm = useSelector((state) => state.edit);
  const navigate = useNavigate();

  const selected = parseISO(useSelector((state) => state.selectedDate.value));

  let selectedDayTasks = tasks
    ?.filter((task) => isSameDay(parseISO(task.day), selected))
    .sort((a, b) => {
      return a.time > b.time ? 1 : -1;
    });

  useEffect(() => {
    if (!user?.username) {
      navigate("/");
    }
    dispatch(fetchTasksDataByUserId(user.id));
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (taskChanged) {
      dispatch(fetchTasksDataByUserId(user.id));
      dispatch(tasksActions.changeStatus());
    }
  }, [dispatch, taskChanged, user.id]);

  const toggleSaveFormHandler = () => {
    dispatch(addActions.toggle());
  };

  const toggleEditFormHandler = () => {
    dispatch(editActions.toggle());
  };

  return (
    <Fragment>
      <Layout />
      <DateViewer key={Math.random()} className={classes.dateViewer} />

      <div className={classes.container}>
        <div className={classes.containerChild}>
          {selectedDayTasks.length !== 0 ? (
            selectedDayTasks.map(
              (item) =>
                !item.completed && <TaskItem key={item.id} item={item} />
            )
          ) : (
            <div className={classes.noTask}>
              <span>No tasks for this day yet...</span>
            </div>
          )}
        </div>
      </div>

      <AddButton
        onClick={() => {
          toggleSaveFormHandler();
          dispatch(addActions.setTitle("New Task ToDo"));
        }}
      />

      {editForm.editFormIsVisible && (
        <div className={classes.modal}>
          <EditTaskForm
            onClose={toggleEditFormHandler}
            title={editForm.title}
          />
        </div>
      )}
      {addForm.addFormIsVisible && (
        <div className={classes.modal}>
          <AddTaskForm onClose={toggleSaveFormHandler} title={"Add a task"} />
        </div>
      )}
    </Fragment>
  );
};

export default TasksPage;
