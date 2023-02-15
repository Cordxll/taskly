import useInput from "../../ui/UseInput";
import classes from "./BasicForm.module.css";
import Modal from "../../ui/Modal";
import EditCard from "./EditCard";
import ColorPicker from "../ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { goalsActions } from "../../../store/goalsSlice";
import { useState, useEffect } from "react";

const isNotEmpty = (value) => value.trim() !== "";

const EditGoalForm = (props) => {
  const dispatch = useDispatch();
  const editTitle = useSelector((state) => state.edit.title);

  const goals = useSelector((state) => state.goals.goals);

  const { id, color } = props.goal;
  // console.log(props.goal);

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

    console.log("Submitted!");
    console.log(props.goal);

    // resetTitle();
    resetDescription();
    dispatch(
      goalsActions.changeTitle({
        id,
        title,
      })
    );

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <form
        // onSubmit={submitHandler}
        >
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
              <ColorPicker item={props.goal} />
              {titleHasError && (
                <p className="error-text">Please enter a title.</p>
              )}
            </div>
          </div>
          <EditCard onClick={submitHandler} />
        </form>
      </div>
    </Modal>
  );
};

export default EditGoalForm;
