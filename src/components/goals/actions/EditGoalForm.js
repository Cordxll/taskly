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

const isNotEmpty = (value) => value.trim() !== "";

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
  const goals = useSelector((store) => store.goals.goals);
  const navigate = useNavigate();
  const existingItem = goals.filter((user) => user.id === Number(params.id));

  const { id, title, description, timeline, color, completed } =
    existingItem[0];

  let formIsValid = true;
  const [formHasChanged, setFormHasChanged] = useState(false);

  const [values, setValues] = useState({
    id,
    title,
    description,
    timeline,
    completed,
  });
  if (values.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  const handleEditItem = (event) => {
    event.preventDefault();

    dispatch(
      goalsActions.changeInputs({
        id: values.id,
        title: values.title,
        description: values.description,
        timeline: values.timeline,
        completed: values.completed,
      })
    );
    navigate("/Layout");
  };

  const handleRemoveItem = () => {
    console.log(values.id);
    dispatch(goalsActions.deleteGoal(values.id));
    navigate("/Layout");
  };

  const changeColorHandler = (colors) => {
    if (values.color !== color) {
      setFormHasChanged(true);
    }
    dispatch(
      goalsActions.changeColor({
        id: existingItem[0].id,

        color: { backgroundColor: colors },
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
                      timeline: format(new Date(e.target.value), "yyyy-MM-dd"),
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
