import classes from "../ui/EditModule.module.css";
import Modal from "../ui/Modal";
import SaveCard from "../goals/actions/SaveCard";
import { tasksActions } from "../../store/tasksSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createTask, fetchTasksData } from "../../store/tasks-actions";

const AddTaskForm = (props) => {
  const dispatch = useDispatch();
  const newId = Math.random();

  let formIsValid = false;

  const [item, setItem] = useState({
    id: newId,
    title: "",
    description: "",
    time: "",
  });

  if (item.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      createTask({
        title: item.title,
        description: item.description,
        time: item.time,
      })
    );

    dispatch(
      tasksActions.addTask({
        id: item.id,
        title: item.title,
        description: item.description,
        time: item.time,
      })
    );
    dispatch(fetchTasksData());
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <header className={classes.header}>{props.title}</header>
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
                <label htmlFor="time">Time</label>
                <input
                  id="datePicker"
                  type="date"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      time: e.target.value,
                    })
                  }
                />
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
