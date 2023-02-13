import useInput from "./UseInput";
import classes from "./BasicForm.module.css";
import Modal from "./Modal";
import EditCard from "./EditCard";
import SaveCard from "./SaveCard";
import ColorPicker from "../goals/ColorPicker";
// import Delete from "../pics/delete.svg";

const isNotEmpty = (value) => value.trim() !== "";

const BasicForm = (props) => {
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
    console.log(title);

    resetTitle();
    resetDescription();
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
              <ColorPicker />
              {titleHasError && (
                <p className="error-text">Please enter a title.</p>
              )}
            </div>
          </div>
          {props.title === "Update goal" && (
            <EditCard onClick={props.onClose} />
          )}
          {props.title === "Add a goal" && <SaveCard onClick={props.onClose} />}
        </form>
      </div>
    </Modal>
  );
};

export default BasicForm;
