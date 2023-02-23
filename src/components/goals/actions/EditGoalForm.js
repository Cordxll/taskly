import useInput from "../../ui/UseInput";
import classes from "./BasicForm.module.css";
import Modal from "../../ui/Modal";
import EditCard from "./EditCard";
import ColorPicker from "../ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { goalsActions } from "../../../store/goalsSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { sendGoalsData } from "../../../store/goals-actions";
import { deleteGoal } from "../../../store/goals-actions";

const isNotEmpty = (value) => value.trim() !== "";
let isInitial = true;

const EditGoalForm = (props) => {
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptioneHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  const dispatch = useDispatch();
  const editTitle = useSelector((state) => state.edit.title);

  const params = useParams();
  const goals = useSelector((store) => store.goals.goalList);
  const changedGoals = useSelector((store) => store.goals);
  const navigate = useNavigate();
  const existingItem = goals.filter((user) => user.id === Number(params.id));

  const { id, title, description, timeline, color, completed, user } =
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
  });

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (formHasChanged) {
      dispatch(sendGoalsData(values));
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
      goalsActions.changeInputs({
        id: values.id,
        title: values.title,
        description: values.description,
        timeline: values.timeline,
        completed: values.completed,
        user: values.user,
      })
    );
    navigate("/Layout");
  };

  const handleRemoveItem = () => {
    console.log(values.id);
    dispatch(goalsActions.deleteGoal(values.id));
    dispatch(deleteGoal(values));

    navigate("/Layout");
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
    <Modal onClose={() => navigate("/Layout")}>
      <div className={classes.container}>
        <form onSubmit={handleEditItem}>
          <div className={classes.header}>
            <header>{editTitle}</header>
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
                  onBlur={descriptionBlurHandler}
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
