import useInput from "../../ui/UseInput";
import classes from "../../ui/EditModule.module.css";
import Modal from "../../ui/Modal";
import EditCard from "./EditCard";
import ColorPicker from "../ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { goalsActions } from "../../../store/goalsSlice";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { sendGoalsData } from "../../../store/goals-actions";
import { deleteGoal } from "../../../store/goals-actions";
// import {
//   CircularProgressbar,
//   CircularProgressbarWithChildren,
//   buildStyles,
// } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

const EditGoalForm = (props) => {
  const dispatch = useDispatch();
  const editTitle = useSelector((state) => state.edit.title);

  const params = useParams();
  const goals = useSelector((store) => store.goals.goalList);
  const navigate = useNavigate();
  const existingItem = goals.filter((user) => user.id === Number(params.id));

  const { id, title, description, timeline, color, completed, progress, user } =
    existingItem[0];

  const [formHasChanged, setFormHasChanged] = useState(false);

  let formIsValid = true;

  const [values, setValues] = useState({
    id,
    title,
    description,
    timeline,
    completed,
    user,
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
    console.log(values.id);
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

  const [minVal, setMinVal] = useState(0);

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
                      setValues({
                        ...values,
                        progress: +e.target.value,
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
