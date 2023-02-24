import classes from "../ui/EditModule.module.css";
import Modal from "../ui/Modal";
import EditCard from "../goals/actions/EditCard";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasksSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask, deleteTask } from "../../store/tasks-actions";

const isNotEmpty = (value) => value.trim() !== "";
let isInitial = true;

const EditTaskForm = (props) => {
  const dispatch = useDispatch();
  const editTitle = useSelector((state) => state.edit.title);

  const params = useParams();
  const tasks = useSelector((store) => store.tasks.taskList);
  const navigate = useNavigate();
  const existingItem = tasks.filter((user) => user.id === Number(params.id));

  const { id, title, description, time, completed, user } = existingItem[0];

  const [formHasChanged, setFormHasChanged] = useState(false);

  let formIsValid = true;

  const [values, setValues] = useState({
    id,
    title,
    description,
    time,
    completed,
    user,
  });

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (formHasChanged) {
      dispatch(updateTask(values));
      // console.log(goals);
    }
  }, [values, dispatch, formHasChanged]);

  if (values.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  const handleEditItem = (event) => {
    event.preventDefault();
    setFormHasChanged(true);
    dispatch(
      tasksActions.changeInputs({
        id: values.id,
        title: values.title,
        description: values.description,
        time: new Date(values.time),
        completed: values.completed,
        user: values.user,
      })
    );
    navigate("/Tasks");
  };

  const handleRemoveItem = () => {
    console.log(values.id);
    dispatch(tasksActions.deleteTask(values.id));
    dispatch(deleteTask(values));

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

                <div className={classes.dateTime}>
                  <label htmlFor="timeline" className={classes.dateLabel}>
                    Date
                  </label>
                  <input
                    id="datePicker"
                    type="date"
                    value={values.date}
                    className={classes.dateInput}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        // timeline: format(new Date(e.target.value), "yyyy-MM-dd"),
                        date: new Date(e.target.value),
                      });
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
                      setValues({
                        ...values,
                        // timeline: format(new Date(e.target.value), "yyyy-MM-dd"),
                        time: new Date(e.target.value),
                      });
                      setFormHasChanged(true);
                    }}
                  />
                </div>

                <div className={classes.duration}>
                  <div className={classes.durationLabel}>
                    <label htmlFor="duration">Duration</label>
                  </div>
                  <div className={classes.durationButtons}>
                    <button>15m</button>
                    <button>30m</button>
                    <button>45m</button>
                    <button>1hr</button>
                    <button>1.5hr</button>
                    <button>2hr</button>
                  </div>
                </div>
                <div className={classes.completed}>
                  <label htmlFor="timeline">Completed</label>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setValues({
                        ...values,
                        completed: !values.completed,
                      });
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
