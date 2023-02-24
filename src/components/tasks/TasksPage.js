import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasksSlice";
import classes from "../tasks/TaskPage.module.css";
import TaskItem from "./TaskItem";
import { fetchTasksData } from "../../store/tasks-actions";
import AddButton from "../goals/actions/AddButton";
import { addActions } from "../../store/addSlice";
import { editActions } from "../../store/editSlice";
import AddTaskForm from "../tasks/AddTaskForm";
import EditTaskForm from "../tasks/EditTaskForm";
import Layout from "../layout/Layout";
import { format, parseISO, isSameDay } from "date-fns";
import Back from "../pics/back.svg";
import Forward from "../pics/forward.svg";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

let initial = true;

const TasksPage = (props) => {
  const tasks = useSelector((state) => state.tasks.taskList);
  const taskChanged = useSelector((state) => state.tasks.changed);
  const dispatch = useDispatch();
  const addForm = useSelector((state) => state.add);
  const editForm = useSelector((state) => state.edit);

  const selected = parseISO(useSelector((state) => state.selectedDate.value));

  let selectedDayTasks = tasks?.filter((task) =>
    isSameDay(parseISO(task.startDatetime), selected)
  );

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (taskChanged) {
      dispatch(fetchTasksData());
      dispatch(tasksActions.changeStatus());
    }
  }, [dispatch, taskChanged]);

  const toggleSaveFormHandler = () => {
    dispatch(addActions.toggle());
  };

  const toggleEditFormHandler = () => {
    dispatch(editActions.toggle());
  };

  return (
    <Fragment>
      <Layout />
      <div className={classes.container}>
        <div className={classes.containerChild}>
          <div className={classes.nav}>
            {/* {format(selected, "MMMM dd yyyy")} */}
            <button className={classes.navItem}>
              {/* <img src={Back} alt="back arrow" /> */}
              <AiOutlineArrowLeft />
            </button>
            <button className={classes.navToday}>today</button>
            <button className={classes.navItem}>
              {/* <img scr={Forward} alt="forward arrow" />
               */}
              <AiOutlineArrowRight />
            </button>
          </div>
          {/* <span className={classes.whatsHappening}>What's Happening ...</span> */}
          {tasks.map((item) => (
            // <div key={item.id}>
            <TaskItem key={item.id} item={item} />
            // </div>
          ))}
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
          <AddTaskForm onClose={toggleSaveFormHandler} title={"Create"} />
        </div>
      )}
    </Fragment>
  );
};

export default TasksPage;
