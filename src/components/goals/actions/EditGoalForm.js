import useInput from "../../ui/UseInput";
import classes from "../../ui/EditModule.module.css";
import Modal from "../../ui/Modal";
import EditCard from "./EditCard";
import ColorPicker from "../ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { goalsActions } from "../../../store/goalsSlice";
import { tasksActions } from "../../../store/tasksSlice";
import {
  fetchTasksData,
  fetchTasksDataByUserId,
} from "../../../store/tasks-actions";
import { updateTask, deleteTask } from "../../../store/tasks-actions";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { sendGoalsData, fetchGoalsData } from "../../../store/goals-actions";
import { deleteGoal } from "../../../store/goals-actions";

const EditGoalForm = (props) => {
  const dispatch = useDispatch();
  const editTitle = useSelector((state) => state.edit.title);

  const params = useParams();
  const goals = useSelector((store) => store.goals.goalList);
  const tasks = useSelector((store) => store.tasks.taskList);
  const theUser = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const existingItem = goals.filter((user) => user.id === Number(params.id));

  const { id, title, description, timeline, color, completed, progress, user } =
    existingItem[0];
  // console.log(theUser);

  const [formHasChanged, setFormHasChanged] = useState(false);

  let formIsValid = true;

  const [values, setValues] = useState({
    id,
    title,
    description,
    timeline,
    completed,
    user: theUser,
    color,
    progress,
  });

  if (values.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  const handleEditItem = (event) => {
    event.preventDefault();
    setFormHasChanged(true);
    dispatch(sendGoalsData(values));
    dispatch(
      goalsActions.changeInputs({
        id: values.id,
        title: values.title,
        description: values.description,
        timeline: values.timeline,
        completed: values.completed,
        progress: values.progress,
        user: values.user,
      })
    );
    navigate("/Goals");
  };

  const handleRemoveItem = () => {
    const newTasks = tasks.filter(
      (item) => item.goal && item.goal.title === title
    );
    //can't remove goal item unless task.goal is null
    newTasks.map((item) => {
      return (
        dispatch(
          tasksActions.changeInputs({
            ...item,
            id: item.id,
            goal: null,
            user: null,
          })
        ) &&
        dispatch(
          updateTask({ ...item, id: item.id, goal: null, user: null })
        ) &&
        dispatch(fetchTasksDataByUserId(user.id))
      );
    });

    dispatch(goalsActions.deleteGoal(values.id));
    dispatch(deleteGoal(values));
    navigate("/Goals");
  };

  const changeColorHandler = (colors) => {
    setFormHasChanged(true);
    setValues({
      ...values,
      color: colors,
    });
    dispatch(
      goalsActions.changeColor({
        id: existingItem[0].id,
        color: colors,
      })
    );
  };

  return (
    <Modal onClose={() => navigate("/Goals")}>
      <div className={classes.container}>
        <form onSubmit={handleEditItem}>
          <div className={classes.header}>
            <header>{editTitle}</header>
          </div>

          <div className={classes.control_group}>
            <div className={classes.form}>
              <div className={classes.textInput}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={values.title}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      title: e.target.value,
                    });
                    setFormHasChanged(true);
                  }}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={values.description}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      description: e.target.value,
                    });
                    setFormHasChanged(true);
                  }}
                />
                <label htmlFor="timeline">Timeline</label>
                <input
                  id="datePicker"
                  type="date"
                  value={values.timeline}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      // timeline: format(new Date(e.target.value), "yyyy-MM-dd"),
                      timeline: e.target.value,
                    });
                    setFormHasChanged(true);
                  }}
                />
                <label htmlFor="completion">Completion</label>
                <div className={classes.slidecontainer}>
                  <input
                    type="range"
                    value={values.progress}
                    min={0}
                    max={100}
                    step={5}
                    onChange={(e) => {
                      +e.target.value === 100
                        ? setValues({
                            ...values,
                            progress: +e.target.value,
                            completed: true,
                          })
                        : setValues({
                            ...values,
                            progress: +e.target.value,
                            completed: false,
                          });
                      setFormHasChanged(true);
                    }}
                  />
                  <span>{values.progress + "%"}</span>
                </div>
              </div>

              <ColorPicker goal={values} onChange={changeColorHandler} />
              {/* {titleHasError && (
                <p className="error-text">Please enter a title.</p>
              )} */}
            </div>
          </div>
          <EditCard
            onClick={handleEditItem}
            onDeleteClick={handleRemoveItem}
            valid={formIsValid}
            formChanged={formHasChanged}
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditGoalForm;
