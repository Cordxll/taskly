import classes from "../ui/EditModule.module.css";
import Modal from "../ui/Modal";
import EditCard from "../goals/actions/EditCard";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasksSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateTask,
  deleteTask,
  fetchTasksDataByUserId,
} from "../../store/tasks-actions";
import { fetchGoalsDataByUserId } from "../../store/goals-actions";

const EditTaskForm = (props) => {
  const dispatch = useDispatch();
  const editTitle = useSelector((state) => state.edit.title);

  const params = useParams();
  const tasks = useSelector((store) => store.tasks.taskList);
  const theUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const existingItem = tasks.filter((user) => user.id === Number(params.id));

  const { id, title, description, time, day, duration, completed, user, goal } =
    existingItem[0];

  const goalTitles = useSelector((state) =>
    state.goals.goalList.filter((item) => item.completed !== true)
  );

  useEffect(() => {
    dispatch(fetchGoalsDataByUserId(theUser.id));
  }, [dispatch, theUser.id]);

  const [formHasChanged, setFormHasChanged] = useState(false);

  const [theGoal, setTheGoal] = useState(
    goal ? { ...goal, user: theUser } : null
  );

  let formIsValid = true;

  const [values, setValues] = useState({
    id,
    title,
    description,
    completed,
    user: theUser,
    time,
    day,
    duration,
    goal,
  });

  const [active, setActive] = useState(values.duration);

  if (values.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  const handleBtnColorClick = (event) => {
    event.preventDefault();
    setActive(event.target.value);
    setValues({
      ...values,
      duration: event.target.value,
    });
    setFormHasChanged(true);
  };

  const handleEditItem = (event) => {
    event.preventDefault();
    // dispatch(goalsActions.changeInputs({ user: theUser }));
    setFormHasChanged(true);

    // if (theGoal?.title) {
    setTheGoal({
      ...theGoal,
      user: theUser,
    });
    // }
    dispatch(
      updateTask({
        id: values.id,
        title: values.title,
        description: values.description,
        time: values.time,
        day: values.day,
        duration: values.duration,
        completed: values.completed,
        user: values.user,
        goal: theGoal,
      })
    );
    dispatch(
      tasksActions.changeInputs({
        id: values.id,
        title: values.title,
        description: values.description,
        time: values.time,
        day: values.day,
        duration: values.duration,
        completed: values.completed,
        user: values.user,
        goal: theGoal,
      })
    );
    dispatch(fetchTasksDataByUserId(theUser.id));
    navigate("/Tasks");
  };

  const handleRemoveItem = () => {
    dispatch(tasksActions.deleteTask(values.id));
    dispatch(deleteTask(values));
    dispatch(fetchTasksDataByUserId(theUser.id));

    navigate("/Tasks");
  };
  return (
    <Modal onClose={() => navigate("/Tasks")}>
      <div className={classes.container}>
        <form onSubmit={handleEditItem}>
          <div className={classes.header}>
            <header>{editTitle}</header>
          </div>

          <div className={classes.control_group}>
            <div className={classes.form}>
              <div className={classes.textInput}>
                <label htmlFor="title">Title Task</label>
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

                <label htmlFor="goalSelector">Goal</label>
                <select
                  value={theGoal?.title}
                  onChange={(e) => {
                    // setValues({
                    //   ...values,
                    //   goal: goalTitles.find(
                    //     (item) => item.title === e.target.value
                    //   ),
                    // });
                    setTheGoal({
                      ...goalTitles.find(
                        (item) => item.title === e.target.value
                      ),
                      user: theUser,
                    });

                    setFormHasChanged(true);
                  }}
                >
                  <option value="no goal"> No goal</option>
                  {goalTitles.map((item) => (
                    <option key={item.id} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>

                <div className={classes.dateTime}>
                  <label htmlFor="timeline" className={classes.dateLabel}>
                    Date
                  </label>
                  <input
                    id="datePicker"
                    type="date"
                    value={values.day}
                    className={classes.dateInput}
                    onChange={(e) => {
                      setValues({ ...values, day: e.target.value });
                      setFormHasChanged(true);
                    }}
                  />
                  <label htmlFor="timeline" className={classes.timeLabel}>
                    Time
                  </label>

                  <input
                    id="datePicker"
                    type="time"
                    value={values.time}
                    className={classes.timeInput}
                    onChange={(e) => {
                      setValues({ ...values, time: e.target.value });
                      setFormHasChanged(true);
                    }}
                  />
                </div>

                {values.time !== "00:00" && (
                  <div className={classes.duration}>
                    <div className={classes.durationLabel}>
                      <label htmlFor="duration">Duration</label>
                    </div>
                    <div className={classes.durationButtons}>
                      <button
                        value="15"
                        className={
                          active === "15" ? `${classes.active}` : undefined
                        }
                        onClick={handleBtnColorClick}
                      >
                        15m
                      </button>
                      <button
                        value="30"
                        className={
                          active === "30" ? `${classes.active}` : undefined
                        }
                        onClick={handleBtnColorClick}
                      >
                        30m
                      </button>
                      <button
                        value="45"
                        className={
                          active === "45" ? `${classes.active}` : undefined
                        }
                        onClick={handleBtnColorClick}
                      >
                        45m
                      </button>
                      <button
                        value="60"
                        className={
                          active === "60" ? `${classes.active}` : undefined
                        }
                        onClick={handleBtnColorClick}
                      >
                        1hr
                      </button>
                      <button
                        value="90"
                        className={
                          active === "90" ? `${classes.active}` : undefined
                        }
                        onClick={handleBtnColorClick}
                      >
                        1.5hr
                      </button>
                      <button
                        value="120"
                        className={
                          active === "120" ? `${classes.active}` : undefined
                        }
                        onClick={handleBtnColorClick}
                      >
                        2hr
                      </button>
                    </div>
                  </div>
                )}
                <div className={classes.completed}>
                  <label htmlFor="timeline">Completed</label>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setValues({
                        ...values,
                        completed: !values.completed,
                      });
                      // console.log(values.completed);
                      setFormHasChanged(true);
                    }}
                  />
                </div>
              </div>
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

export default EditTaskForm;
