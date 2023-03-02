import classes from "../ui/EditModule.module.css";
import Modal from "../ui/Modal";
import SaveCard from "../goals/actions/SaveCard";
import { tasksActions } from "../../store/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { parseISO } from "date-fns";
import { createTask, fetchTasksData } from "../../store/tasks-actions";

const AddTaskForm = (props) => {
  const dispatch = useDispatch();
  const selected = parseISO(useSelector((state) => state.selectedDate.value));
  const newId = Math.random();

  let formIsValid = false;

  const [item, setItem] = useState({
    id: newId,
    title: "",
    description: "",
    time: "00:00",
    day: selected.toISOString().slice(0, 10),
    goal: null,
    duration: "",
  });

  const goalTitles = useSelector((state) =>
    state.goals.goalList.filter((item) => item.completed !== true)
  );

  if (item.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  const handleDuration = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setItem({ ...item, duration: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      createTask({
        title: item.title,
        description: item.description,
        time: item.time,
        day: item.day,
        duration: item.duration,
        completed: false,
        goal: item.goal,
      })
    );

    dispatch(
      tasksActions.addTask({
        id: item.id,
        title: item.title,
        description: item.description,
        time: item.time,
        completed: false,
        day: item.day,
        duration: item.duration,
        goal: item.goal,
      })
    );
    dispatch(fetchTasksData());
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <header className={classes.header}>New Task ToDo</header>
          <div className={classes.control_group}>
            <div className={classes.form}>
              <div className={classes.textInput}>
                <label htmlFor="title">Title</label>
                <input
                  className={classes.titleInput}
                  type="text"
                  id="title"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      title: e.target.value,
                    })
                  }
                  required="required"
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      description: e.target.value,
                    })
                  }
                />

                <label htmlFor="goalSelector">Goal</label>
                <select
                  value={item.goal?.title}
                  onChange={(e) => {
                    setItem({
                      ...item,
                      goal: goalTitles.find(
                        (item) => item.title === e.target.value
                      ),
                    });
                  }}
                >
                  <option value="Select a goal">Select a goal</option>
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
                    value={item.day}
                    className={classes.dateInput}
                    onChange={(e) => {
                      setItem({
                        ...item,
                        day: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="timeline" className={classes.timeLabel}>
                    Time
                  </label>

                  <input
                    id="datePicker"
                    type="time"
                    value={item.time}
                    className={classes.timeInput}
                    onChange={(e) => {
                      setItem({
                        ...item,
                        time: e.target.value,
                      });
                    }}
                  />
                </div>
                {item.time !== "00:00" && (
                  <div className={classes.duration}>
                    <div className={classes.durationLabel}>
                      <label htmlFor="duration">Duration</label>
                    </div>
                    <div className={classes.durationButtons}>
                      <button value="15" onClick={handleDuration}>
                        15m
                      </button>
                      <button value="30" onClick={handleDuration}>
                        30m
                      </button>
                      <button value="45" onClick={handleDuration}>
                        45m
                      </button>
                      <button value="60" onClick={handleDuration}>
                        1hr
                      </button>
                      <button value="90" onClick={handleDuration}>
                        1.5hr
                      </button>
                      <button value="120" onClick={handleDuration}>
                        2hr
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <SaveCard
            onClick={submitHandler}
            item={item}
            valid={formIsValid}
            title={props.title}
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskForm;
