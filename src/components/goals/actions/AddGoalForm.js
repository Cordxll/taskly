import useInput from "../../ui/UseInput";
import classes from "./BasicForm.module.css";
import Modal from "../../ui/Modal";
import SaveCard from "./SaveCard";
import ColorPicker from "../ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { goalsActions } from "../../../store/goalsSlice";

const isNotEmpty = (value) => value.trim() !== "";
const newId = Math.random();

const AddGoalForm = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);

  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptioneHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    // if (!goals.color) {
    //   return;
    // }

    console.log("Submitted!");
    console.log(title);

    resetTitle();
    resetDescription();
    dispatch(
      goalsActions.addGoal({
        id: newId,
        title: title,
      })
    );
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <header>{props.title}</header>
          <div className={classes.control_group}>
            <div className={classes.form}>
              <div className={classes.textInput}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={titleChangeHandler}
                  onBlur={titleBlurHandler}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                />
              </div>
              <ColorPicker id={newId} title={title} />
              {titleHasError && (
                <p className="error-text">Please enter a title.</p>
              )}
            </div>
          </div>
          <SaveCard onClick={submitHandler} />
        </form>
      </div>
    </Modal>
  );
};

export default AddGoalForm;
